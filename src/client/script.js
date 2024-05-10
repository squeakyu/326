document.addEventListener('DOMContentLoaded', () => {
    
  function navigate(viewId) {
      // Hide all views
      document.querySelectorAll('.view').forEach((view) => {
          view.style.display = 'none';
      });

      // Show the requested view
      document.getElementById(viewId).style.display = 'block';
  }
  async function getAllWorkouts() {
    return db.allDocs({include_docs: true}).then(result => 
        result.rows.map(row => row.doc)
    );
}
  async function updateCalendarEvents() {
    const workouts = await getAllWorkouts(); 
    calendar.removeAllEvents(); 
    workouts.forEach(workout => {
        calendar.addEvent({
            title: `${workout.type} for ${workout.duration} min`,
            start: workout.date,
            allDay: true
        });
    });
}
  document
      .getElementById('home')
      .addEventListener('click', () => navigate('homeView'));
  document
      .getElementById('calendar')
      .addEventListener('click', () => navigate('calendarView'));
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
        viewWorkout.render();
  
        });
        var calendarEl = document.getElementById('calendarWorkout');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid'], // Include necessary plugins
            initialView: 'dayGridMonth', // Set the initial view to show the month
            events: [
               
                { title: 'Workout Session', start: new Date().toISOString().slice(0,10) } // Current date
            ]
        });
        calendar.render();
        window.calendar = calendar;
        updateCalendarEvents(); 


  navigate('homeView');

 
  

  // Assuming your images are within a container with the class
  // 'image-container'
  document.querySelectorAll('.image-container img').forEach((img) => {
      img.addEventListener('click', function () {
          const parent = this.parentNode;
          parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
      });
  });


  
  window.wt = wt;

  class ViewWorkouts {
      constructor(workouts) {
        this.workouts = workouts;
        this.container = document.getElementById('workoutTableContainer');
      }
    
      render() {
        this.clearContainer();
          console.log('begin render')
        const table = document.createElement('table');
        table.classList.add('workout-table');
    
        const headerRow = document.createElement('tr');
        const headers = ['Workout Name', 'View', 'Edit'];
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        this.workouts.forEach(workout => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          nameCell.textContent = workout.name;
    
          const viewButtonCell = document.createElement('td');
          const viewButton = document.createElement('button');
          viewButton.textContent = 'View';
          viewButton.addEventListener('click', () => {
          });
          viewButtonCell.appendChild(viewButton);
    
          const editButtonCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => {
          });
          editButtonCell.appendChild(editButton);
    
          row.appendChild(nameCell);
          row.appendChild(viewButtonCell);
          row.appendChild(editButtonCell);
    
          table.appendChild(row);
          console.log('end render')
        });
    
        this.container.appendChild(table);
      }
    
      clearContainer() {
        this.container.innerHTML = '';
      }
    }
    

    
});







