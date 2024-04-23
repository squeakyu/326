document.addEventListener("DOMContentLoaded", () => {
    function navigate(viewId) {
      // Hide all views
      document.querySelectorAll(".view").forEach((view) => {
        view.style.display = "none";
      });
  
      // Show the requested view
      document.getElementById(viewId).style.display = "block";
    }
  
    document
      .getElementById("home")
      .addEventListener("click", () => navigate("homeView"));
    document
      .getElementById("profile")
      .addEventListener("click", () => navigate("profileView"));
    document
      .getElementById("about")
      .addEventListener("click", () => navigate("aboutView"));
    document.getElementById("createWorkoutBtn").addEventListener("click", () => navigate("createWorkoutView"));
    // Initialize with the home view
    navigate("homeView");
    
    document.getElementById("workoutForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const workoutName = document.getElementById("workoutName").value;
        const workoutType = document.getElementById("workoutType").value;
        saveWorkout(workoutName, workoutType);
        alert("Workout Saved!");
        navigate("homeView"); // Return to home after saving
    });
    // Assuming your images are within a container with the class
    // 'image-container'
    document.querySelectorAll(".image-container img").forEach((img) => {
      img.addEventListener("click", function () {
        const parent = this.parentNode;
        parent.insertBefore(this, parent.firstChild); // Move the clicked image to the beginning
      });
    });
  });
  

function saveWorkout(name, type) {
    // Here you can integrate PouchDB for actual data storage
    console.log("Saving workout:", name, type);
    // Mocking a save operation
}