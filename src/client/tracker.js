document.addEventListener('DOMContentLoaded', () => {

    class WorkoutTracker {
        
        constructor(root) {
            this.root = root;
            this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
            this.entries = [];

            // Initialize PouchDB
            this.db = new PouchDB('workout-tracker');

            // Log PouchDB status
            console.log('PouchDB initialized:', this.db);

            this.loadEntries();
            this.updateView();

            this.root.querySelector(".tracker__add").addEventListener("click", () => {
                const date = new Date();
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");

                this.addEntry({
                    date: `${year}-${month}-${day}`,
                    workout: "walking",
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
            // Fetch all documents from the database
            this.db.get('workout-entries')
                .then(doc => {
                    if (doc.entries) {
                        this.entries = doc.entries;
                        // Update the view after loading entries
                        this.updateView();
                        // Update the chart after loading entries
                        this.updateChart();
                    }
                })
                .catch(error => {
                    console.error('Error loading entries from PouchDB', error);
                });
        }

        saveEntries() {
            // Fetch the latest revision of the document
            return this.db.get('workout-entries')
                .then(doc => {
                    // Update the document with the latest revision
                    return this.db.put({ _id: 'workout-entries', _rev: doc._rev, entries: this.entries });
                })
                .then(() => {
                    console.log('Entries saved to PouchDB:', this.entries);
                    // Update the chart after saving entries
                    this.updateChart();
                })
                .catch(error => {
                    console.error('Error saving entries to PouchDB:', error);
                });
        }

        updateView() {
            const tableBody = this.root.querySelector(".tracker__entries");
            const addRow = data => {
                const template = document.createElement("template");
                let row = null;

                template.innerHTML = WorkoutTracker.rowHtml().trim();
                row = template.content.firstElementChild;

                row.querySelector(".tracker__date").value = data.date;
                row.querySelector(".tracker__workout").value = data.workout;
                row.querySelector(".tracker__duration").value = data.duration;

                row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
                    data.date = target.value;
                    this.saveEntries()
                        .then(() => console.log('Entry updated successfully'))
                        .catch(error => console.error('Error updating entry:', error));
                });

                row.querySelector(".tracker__workout").addEventListener("change", ({ target }) => {
                    data.workout = target.value;
                    this.saveEntries()
                        .then(() => console.log('Entry updated successfully'))
                        .catch(error => console.error('Error updating entry:', error));
                });

                row.querySelector(".tracker__duration").addEventListener("change", ({ target }) => {
                    data.duration = target.value;
                    this.saveEntries()
                        .then(() => console.log('Entry updated successfully'))
                        .catch(error => console.error('Error updating entry:', error));
                });

                row.querySelector(".tracker__delete").addEventListener("click", () => {
                    this.deleteEntry(data);
                });

                tableBody.appendChild(row);
            };

            tableBody.querySelectorAll(".tracker__row").forEach(row => {
                row.remove();
            });

            this.entries.forEach(data => addRow(data));
        }

        addEntry(data) {
            this.entries.push(data);
            this.saveEntries()
                .then(() => {
                    // Update the view to display the newly added entry
                    this.updateView();
                    console.log('Entry added successfully');
                })
                .catch(error => {
                    console.error('Error adding entry:', error);
                });
        }

        deleteEntry(dataToDelete) {
            // Find the index of the entry to delete
            const indexToDelete = this.entries.findIndex(data => data === dataToDelete);
            if (indexToDelete !== -1) {
                // Remove the entry from this.entries
                this.entries.splice(indexToDelete, 1);
                // Save the updated entries to PouchDB
                this.saveEntries()
                    .then(() => {
                        // Update the view to reflect the deletion
                        this.updateView();
                        console.log('Entry deleted successfully');
                    })
                    .catch(error => {
                        console.error('Error deleting entry:', error);
                    });
            } else {
                console.warn('Entry not found in the entries array');
            }
        }

        updateChart() {
            // Get workout durations from entries
            const workoutDurations = this.entries.map(entry => entry.duration);
            
            // Update data of the existing bar chart
            this.chart.data.datasets[0].data = workoutDurations;
            this.chart.data.labels = Array.from({ length: workoutDurations.length }, (_, i) => `Entry ${i + 1}`);
            this.chart.update();
        
            // Update pie chart data
            const workoutTypes = {};
            this.entries.forEach(entry => {
                workoutTypes[entry.workout] = (workoutTypes[entry.workout] || 0) + 1;
            });
        
            this.pieChart.data.labels = Object.keys(workoutTypes);
            this.pieChart.data.datasets[0].data = Object.values(workoutTypes);
            this.pieChart.update();
        }
    }

    const app = document.getElementById("app");

    const wt = new WorkoutTracker(app);

    window.wt = wt;

    const ctx = document.createElement('canvas');
    const chartContainer = document.getElementById('chart');
    chartContainer.appendChild(ctx);

    const workoutDurations = wt.entries.map(entry => entry.duration);

    // Create Chart.js chart
    wt.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: workoutDurations.length }, (_, i) => `Entry ${i + 1}`),
            datasets: [{
                label: 'Workout Durations',
                data: workoutDurations,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    // Create canvas element for pie chart
    const pieCtx = document.createElement('canvas');
    const pieChartContainer = document.getElementById('chart');
    pieChartContainer.appendChild(pieCtx);
    
    // Calculate counts of different workout types
    const workoutTypes = {};
    wt.entries.forEach(entry => {
        workoutTypes[entry.workout] = (workoutTypes[entry.workout] || 0) + 1;
    });
    
    // Create data for pie chart
    const pieData = {
        labels: Object.keys(workoutTypes),
        datasets: [{
            label: 'Workout Types',
            data: Object.values(workoutTypes),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    // Create pie chart
    wt.pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: pieData,
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Workout Types'
            }
        }
    });

});
