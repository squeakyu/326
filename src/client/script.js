document.addEventListener('DOMContentLoaded', () => {
    
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
        { y: '2024-01', a: 50},
        { y: '2024-02', a: 65},
        { y: '2024-03', a: 50},
        { y: '2024-04', a: 75},
        { y: '2024-05', a: 80},
        { y: '2024-06', a: 90},
        { y: '2024-07', a: 100},
        { y: '2024-08', a: 115},
        { y: '2024-09', a: 120},
        { y: '2024-10', a: 145},
        { y: '2024-11', a: 160},
        {y: '2024-12', a: 150}
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
      {label: "Push Day", value: 65},
      {label: "Pull Day", value: 50},
      {label: "Cardio", value: 45},
      {label: "Leg Day", value: 10}
    ],
    // resize = true
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






