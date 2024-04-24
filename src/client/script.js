document.addEventListener('DOMContentLoaded', () => {

    // document.getElementById('loginForm').addEventListener('submit', function(event) {
    //     event.preventDefault(); 
    
        
    //     window.location.href = 'index.html';
    // });

    function navigate(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach((view) => {
            view.style.display = 'none';
        });

        // Show the requested view
        document.getElementById(viewId).style.display = 'block';
    }
    
    document
        .getElementById('home')
        .addEventListener('click', () => navigate('homeView'));
    document
        .getElementById('profile')
        .addEventListener('click', () => navigate('profileView'));
    document
        .getElementById('about')
        .addEventListener('click', () => navigate('aboutView'));
    document
        .getElementById('workout')
        .addEventListener('click', () => navigate('workoutView'));

    document.getElementById('viewWorkoutBtn').addEventListener('click', ()=> {
        const workouts = [
            { id: 1, name: 'Workout 1' },
            { id: 2, name: 'Workout 2' },
            { id: 3, name: 'Workout 3' }
          ];
          navigate('viewWorkoutView')
          const viewWorkout = new ViewWorkouts(workouts);
          console.log(viewWorkout.workouts)
          viewWorkout.render();
     });

    // Initialize with the home view
    navigate('homeView');

    // Assuming your images are within a container with the class
    // 'image-container'
    document.querySelectorAll('.image-container img').forEach((img) => {
        img.addEventListener('click', function () {
            const parent = this.parentNode;
            parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
        });
    });
    class WorkoutTracker {
        static LOCAL_STORAGE_DATA_KEY = 'workout-tracker-entries';
    
        constructor(root) {
            this.root = root;
            this.root.insertAdjacentHTML('afterbegin', WorkoutTracker.html());
            this.entries = [];
    
            this.loadEntries();
            this.updateView();
    
            this.root
                .querySelector('.tracker__add')
                .addEventListener('click', () => {
                    const date = new Date();
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDay().toString().padStart(2, '0');
    
                    this.addEntry({
                        date: `${year}-${month}-${day}`,
                        workout: 'walking',
                        duration: 30
                    });
                });
        }
    
        static html() {
            return `
                <table class="tracker">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workout</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="tracker__entries"></tbody>
                    <tbody>
                        <tr class="tracker__row tracker__row--add">
                            <td colspan="4">
                                <span class="tracker__add">Add Entry &plus;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
        }
    
        static rowHtml() {
            return `
                <tr class="tracker__row">
                    <td>
                        <input type="date" class="tracker__date">
                    </td>
                    <td>
                        <select class="tracker__workout">
                            <option value="walking">Walking</option>
                            <option value="running">Running</option>
                            <option value="outdoor-cycling">Outdoor Cycling</option>
                            <option value="indoor-cycling">Indoor Cycling</option>
                            <option value="swimming">Swimming</option>
                            <option value="yoga">Yoga</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" class="tracker__duration">
                        <span class="tracker__text">minutes</span>
                    </td>
                    <td>
                        <button type="button" class="tracker__button tracker__delete">&times;</button>
                    </td>
                </tr>
            `;
        }
    
        loadEntries() {
            this.entries = JSON.parse(
                localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || '[]'
            );
        }
    
        saveEntries() {
            localStorage.setItem(
                WorkoutTracker.LOCAL_STORAGE_DATA_KEY,
                JSON.stringify(this.entries)
            );
        }
    
        updateView() {
            const tableBody = this.root.querySelector('.tracker__entries');
            const addRow = (data) => {
                const template = document.createElement('template');
                let row = null;
    
                template.innerHTML = WorkoutTracker.rowHtml().trim();
                row = template.content.firstElementChild;
    
                row.querySelector('.tracker__date').value = data.date;
                row.querySelector('.tracker__workout').value = data.workout;
                row.querySelector('.tracker__duration').value = data.duration;
    
                row.querySelector('.tracker__date').addEventListener(
                    'change',
                    ({ target }) => {
                        data.date = target.value;
                        this.saveEntries();
                    }
                );
    
                row.querySelector('.tracker__workout').addEventListener(
                    'change',
                    ({ target }) => {
                        data.workout = target.value;
                        this.saveEntries();
                    }
                );
    
                row.querySelector('.tracker__duration').addEventListener(
                    'change',
                    ({ target }) => {
                        data.duration = target.value;
                        this.saveEntries();
                    }
                );
    
                row.querySelector('.tracker__delete').addEventListener(
                    'click',
                    () => {
                        this.deleteEntry(data);
                    }
                );
    
                tableBody.appendChild(row);
            };
    
            tableBody.querySelectorAll('.tracker__row').forEach((row) => {
                row.remove();
            });
    
            this.entries.forEach((data) => addRow(data));
        }
    
        addEntry(data) {
            this.entries.push(data);
            this.saveEntries();
            this.updateView();
        }
    
        deleteEntry(dataToDelete) {
            this.entries = this.entries.filter((data) => data !== dataToDelete);
            this.saveEntries();
            this.updateView();
        }
    }
    
    const app = document.getElementById('app');
    
    const wt = new WorkoutTracker(app);


    //charts page
    // var data = [
    //     { y: '2014', a: 50, b: 90},
    //     { y: '2015', a: 65,  b: 75},
    //     { y: '2016', a: 50,  b: 50},
    //     { y: '2017', a: 75,  b: 60},
    //     { y: '2018', a: 80,  b: 65},
    //     { y: '2019', a: 90,  b: 70},
    //     { y: '2020', a: 100, b: 75},
    //     { y: '2021', a: 115, b: 75},
    //     { y: '2022', a: 120, b: 85},
    //     { y: '2023', a: 145, b: 85},
    //     { y: '2024', a: 160, b: 95}
    //   ],
    var data = [
        { y: '2014', a: 50},
        { y: '2015', a: 65},
        { y: '2016', a: 50},
        { y: '2017', a: 75},
        { y: '2018', a: 80},
        { y: '2019', a: 90},
        { y: '2020', a: 100},
        { y: '2021', a: 115},
        { y: '2022', a: 120},
        { y: '2023', a: 145},
        { y: '2024', a: 160}
      ],
      config = {
        data: data,
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Body Weight', 'Total Outcome'],
        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        pointFillColors:['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors:['gray','red']
    };
    config.element = 'area-chart';
    Morris.Area(config);
    config.element = 'line-chart';
    Morris.Line(config);
    // config.element = 'bar-chart';
    // Morris.Bar(config);
    // config.element = 'stacked';
    // config.stacked = true;
    // Morris.Bar(config);
    Morris.Donut({
    element: 'pie-chart',
    data: [
      {label: "Push Day", value: 30},
      {label: "Pull Day", value: 15},
      {label: "Cardio", value: 45},
      {label: "Leg Day", value: 10}
    ]
    });
    
    window.wt = wt;

    class ViewWorkouts {
        constructor(workouts) {
          this.workouts = workouts;
          this.container = document.getElementById('workoutTableContainer');
        }
      
        render() {
          // Clear container before rendering
          this.clearContainer();
            console.log('begin render')
          // Create table element
          const table = document.createElement('table');
          table.classList.add('workout-table');
      
          // Create table header
          const headerRow = document.createElement('tr');
          const headers = ['Workout Name', 'View', 'Edit'];
          headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
          });
          table.appendChild(headerRow);
      
          // Create table rows
          this.workouts.forEach(workout => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = workout.name;
      
            const viewButtonCell = document.createElement('td');
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.addEventListener('click', () => {
              // Handle view button click
            });
            viewButtonCell.appendChild(viewButton);
      
            const editButtonCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
              // Handle edit button click
            });
            editButtonCell.appendChild(editButton);
      
            row.appendChild(nameCell);
            row.appendChild(viewButtonCell);
            row.appendChild(editButtonCell);
      
            table.appendChild(row);
            console.log('end render')
          });
      
          // Append table to container
          this.container.appendChild(table);
        }
      
        clearContainer() {
          this.container.innerHTML = '';
        }
      }
});





