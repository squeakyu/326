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

     let viewWorkout;
    document.getElementById('viewWorkoutBtn').addEventListener('click', ()=> {
            navigate('viewWorkoutView')
            
            const storedWorkouts = localStorage.getItem('workouts');

            if (storedWorkouts && storedWorkouts !== 'undefined'&& storedWorkouts !== null) {
                viewWorkout = new ViewWorkouts(JSON.parse(storedWorkouts));
            } else {
                viewWorkout = new ViewWorkouts([]);
            }

            viewWorkout.render();
        });

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('workouts', JSON.stringify(viewWorkout.workouts));
        });
    
        document.getElementById('createWorkoutBtn').addEventListener('click', () =>{
            navigate('createWorkoutView');
        });

        let workout;
    document.getElementById('saveExerciseBtn').addEventListener('click', () =>{
        let exerciseTable;
        const name = document.getElementById('wor').value;
        const exName = document.getElementById('exe').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('re').value;
        const weight = document.getElementById('weight').value;

        if(!workout){
            workout = new Workout();
        }
        workout.name = name;
        workout.addExercise(exName,sets, weight, reps)
        exerciseTable = new ExerciseTable(workout.exercise)
        exerciseTable.render()
    })

    document.getElementById('saveWorkoutBtn').addEventListener('click', ()=>{
        
        document.getElementById('exerciseTableContainer').innerHTML = '';
        viewWorkout.addWorkout(workout)
        localStorage.setItem('workouts', JSON.stringify(viewWorkout.workouts));
        workout = null
        navigate('viewWorkoutView')
        viewWorkout.render()
    })


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
        addWorkout(workout){
            this.workouts.push(workout)
        }
      
        render() {
          this.clearContainer();


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
          });
      
          this.container.appendChild(table);
        }
      
        clearContainer() {
          this.container.innerHTML = '';
        }
      }

      class Exercise {
        constructor(name, sets, weight, reps) {
          this.name = name;
          this.sets = sets;
          this.weight = weight;
          this.reps = reps;
        }
      }
      
      class Workout {
        constructor(name) {
          this.name = name;
          this.exercises = [];
        }
      
        addExercise(name, sets, weight, reps) {
          const exercise = new Exercise(name, sets, weight, reps);
          this.exercises.push(exercise);
        }
      
        getWorkout() {
          return {
            name: this.name,
            exercises: this.exercises.map(exercise => ({
              name: exercise.name,
              sets: exercise.sets,
              weight: exercise.weight,
              reps: exercise.reps
            }))
          };
        }
      }
      
      class ExerciseTable {
          constructor(workouts) {
              this.workouts = workouts;
              this.container = document.getElementById('exerciseTableContainer');
          }
      
          render() {
            this.clearContainer();
            const table = document.createElement('table');
            table.classList.add('exercise-table');
        
            const headerRow = document.createElement('tr');
            const headers = ['Workout Name', 'Exercise Name', 'Sets', 'Reps' ,'Weight', '']; // Removed 'Reps' header
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
        
            
                workout.exercises.forEach(exercise => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    nameCell.textContent = workout.name;
        
                    const exNameCell = document.createElement('td');
                    exNameCell.textContent = exercise.name;
        
                    const setsCell = document.createElement('td');
                    setsCell.textContent = exercise.sets;
        
                    const weightCell = document.createElement('td');
                    weightCell.textContent = exercise.weight;

                    const repsCell = document.createElement('td');
                    repsCell.textContent = exercise.reps;
        
                    const actionsCell = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        this.deleteExercise(workout, exercise);
                        this.render();
                    });
                    actionsCell.appendChild(deleteButton);
        
                    row.appendChild(nameCell);
                    row.appendChild(exNameCell);
                    row.appendChild(setsCell);
                    row.appendChild(weightCell);
                    row.appendChild(repsCell)
                    row.appendChild(actionsCell);
                    table.appendChild(row);
                });
            
            this.container.appendChild(table);
        }
      
          clearContainer() {
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
          }
      
          deleteExercise(workout, exercise) {
              const index = workout.exercises.indexOf(exercise);
              if (index !== -1) {
                  workout.exercises.splice(index, 1);
              }
          }
      }
      

      
});






