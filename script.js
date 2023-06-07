class Task {
  constructor(taskName, description, taskDate, assignedTo, taskStatus) {
    this.taskName = taskName;
    this.description = description;
    this.taskDate = taskDate;
    this.assignedTo = assignedTo;
    this.taskStatus = taskStatus;
  }
}

class TaskPlanner {
  constructor() {
    this.tasks = this.loadTasksFromStorage(); // Initialize tasks by loading from storage
  }

  addTask(task) {
    this.tasks.push(task); // Add task to the tasks array
    this.renderTasks(); // Render the updated tasks
    this.saveTasksToStorage(); // Save tasks to storage
  }

  deleteTask(index) {
    this.tasks.splice(index, 1); // Remove task at the specified index from tasks array
    this.renderTasks(); // Render the updated tasks
    this.saveTasksToStorage(); // Save tasks to storage
  }

  renderTasks() {
    const taskContainer = document.getElementById("task-container"); // Get the task container element
    taskContainer.innerHTML = ""; // Clear the existing content of the task container

    this.tasks.forEach((task, index) => {
      const taskCard = document.createElement("div"); // Create a new div for the task card
      taskCard.classList.add("col-md-4"); // Add Bootstrap class for styling
      taskCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${task.taskName}</h5> // Display task name
            <p class="card-text">${task.description}</p> // Display task description
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Due Date:</strong> ${task.taskDate}</li> // Display task due date
              <li class="list-group-item"><strong>Assigned To:</strong> ${task.assignedTo}</li> // Display task assignee
              <li class="list-group-item"><strong>Status:</strong> ${task.taskStatus}</li> // Display task status
            </ul>
            <button class="btn btn-danger" onclick="taskPlanner.deleteTask(${index})">Delete</button> // Delete button with onclick event
          </div>
        </div>
      `;

      taskContainer.appendChild(taskCard); // Append the task card to the task container
    });
  }

  loadTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks"); // Get tasks from local storage
    return storedTasks ? JSON.parse(storedTasks) : []; // Parse and return tasks if present, otherwise return an empty array
  }

  saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save tasks to local storage as a JSON string
  }
}

const taskPlanner = new TaskPlanner(); // Create a new instance of TaskPlanner

function addTask(event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const taskNameInput = document.getElementById("task-name"); // Get the input element for task name
  const descriptionInput = document.getElementById("description"); // Get the input element for task description
  const taskDateInput = document.getElementById("task-date"); // Get the input element for task due date
  const assignedToInput = document.getElementById("assigned-to"); // Get the input element for task assignee
  const taskStatusInput = document.getElementById("task-status"); // Get the input element for task status

  const task = new Task(
    taskNameInput.value,
    descriptionInput.value,
    taskDateInput.value,
    assignedToInput.value,
    taskStatusInput.value
  ); // Create a new Task object using input values

  taskPlanner.addTask(task); // Add the task to the task planner

  taskNameInput.value = ""; // Clear the input value for task name
  descriptionInput.value = ""; // Clear the input value for task description
  taskDateInput.value = ""; // Clear the input value for task due date
  assignedToInput.value = ""; // Clear the input value for task assignee
  taskStatusInput.value = "To do"; // Reset the input value for task status
}

const taskForm = document.getElementById("task-form"); // Get the task form element
taskForm.addEventListener("submit", addTask); // Add submit event listener to the task form
