// Task array to store tasks
let tasks = [];

// Function to save tasks to JSON
function saveTasksToJSON() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from JSON
function retrieveTasksFromJSON() {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON) {
    tasks = JSON.parse(tasksJSON);
  } else {
    tasks = [];
  }
}

// Function to create a task card
function createTaskCard(taskName, description, taskDate, assignedTo, taskStatus) {
  const card = document.createElement("div");
  card.classList.add("col", "col-md-6");

  // ... rest of the code remains the same
}

// Function to add a new task
function addTask() {
  // Get task form inputs
  const taskName = document.getElementById("task-name").value;
  const description = document.getElementById("description").value;
  const taskDate = document.getElementById("task-date").value;
  const assignedTo = document.getElementById("assigned-to").value;
  const taskStatus = document.getElementById("task-status").value;

  // Check if all fields are filled
  if (!taskName || !description || !taskDate || !assignedTo || !taskStatus) {
    alert("Please fill in all fields");
    return;
  }

  // Create new task object
  const task = {
    taskName,
    description,
    taskDate,
    assignedTo,
    taskStatus,
  };

  // Add task to the tasks array
  tasks.push(task);

  // Save tasks to JSON
  saveTasksToJSON();

  // Clear form inputs
  document.getElementById("task-name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("task-date").value = "";
  document.getElementById("assigned-to").value = "";
  document.getElementById("task-status").value = "";

  // Create and append task card
  const taskContainer = document.getElementById("task-container");
  const taskCard = createTaskCard(taskName, description, taskDate, assignedTo, taskStatus);
  taskContainer.prepend(taskCard);
}

// Submit form event listener
const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
});

// Function to initialize existing tasks
function initializeTasks() {
  const taskContainer = document.getElementById("task-container");
  tasks.forEach((task) => {
    const taskCard = createTaskCard(task.taskName, task.description, task.taskDate, task.assignedTo, task.taskStatus);
    taskContainer.appendChild(taskCard);
  });
}

// Initialize existing tasks
initializeTasks();
