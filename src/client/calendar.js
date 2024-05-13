document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendarWorkout');
    let currentDate = new Date();
    const db = new PouchDB('workoutDates'); // Database for storing workout dates

    generateCalendar(calendarEl, currentDate);

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Previous';
    prevBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(calendarEl, currentDate);
    };

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(calendarEl, currentDate);
    };

    calendarEl.before(prevBtn);
    calendarEl.after(nextBtn);

    async function loadSelectedDays(year, month) {
        try {
            const docId = `${year}-${month}`;
            const doc = await db.get(docId);
            return doc.days;
        } catch (error) {
            if (error.name === 'not_found') {
                return [];
            } else {
                console.error('Error fetching data from PouchDB:', error);
            }
        }
    }

    async function saveSelectedDay(year, month, day) {
        const docId = `${year}-${month}`;
        try {
            const doc = await db.get(docId);
            doc.days.push(day);
            await db.put({...doc, _rev: doc._rev});
        } catch (error) {
            if (error.name === 'not_found') {
                await db.put({_id: docId, days: [day]});
            } else {
                console.error('Error updating PouchDB:', error);
            }
        }
    }

    async function removeSelectedDay(year, month, day) {
        const docId = `${year}-${month}`;
        try {
            const doc = await db.get(docId);
            const index = doc.days.indexOf(day);
            if (index > -1) {
                doc.days.splice(index, 1);
                await db.put({...doc, _rev: doc._rev});
            }
        } catch (error) {
            console.error('Error updating PouchDB:', error);
        }
    }

    async function generateCalendar(calendarEl, currentDate) {
        calendarEl.innerHTML = '';  // Clear existing calendar content
        const monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const selectedDays = await loadSelectedDays(currentDate.getFullYear(), currentDate.getMonth());

        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const currentMonthName = monthNames[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();

        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerText = `${currentMonthName} ${currentYear}`;
        calendarEl.appendChild(header);

        let daysHTML = '<div class="calendar-grid">';
        for (let i = 0; i < firstDay; i++) {
            daysHTML += '<div class="calendar-day empty"></div>'; // Empty cells at the start
        }

        for (let day = 1; day <= monthDays; day++) {
            daysHTML += `<div class="calendar-day${selectedDays.includes(day) ? ' selected' : ''}" data-day="${day}">${day}</div>`;
        }
        daysHTML += '</div>';

        calendarEl.innerHTML += daysHTML;   

        // Add click events to days
        document.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
            dayEl.addEventListener('click', function() {
                const day = parseInt(this.getAttribute('data-day'), 10);
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    removeSelectedDay(currentDate.getFullYear(), currentDate.getMonth(), day);
                } else {
                    this.classList.add('selected');
                    saveSelectedDay(currentDate.getFullYear(), currentDate.getMonth(), day);
                }
            });
        });
    }
});
