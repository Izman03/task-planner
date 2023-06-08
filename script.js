// Task class representing a task with various properties
class Task {
  constructor(taskName, description, taskDate, assignedTo, taskStatus) {
    this.taskName = taskName;
    this.description = description;
    this.taskDate = taskDate;
    this.assignedTo = assignedTo;
    this.taskStatus = taskStatus;
  }
}

// TaskPlanner class managing the tasks and rendering them
class TaskPlanner {
  constructor() {
    // Load tasks from local storage when creating a new TaskPlanner instance
    this.tasks = this.loadTasksFromStorage();
    // Render the tasks on initialization
    this.renderTasks();
  }

  // Add a new task
  addTask(task) {
    this.tasks.push(task);
    // Render the updated tasks
    this.renderTasks();
    // Save the tasks to local storage
    this.saveTasksToStorage();
  }

  // Delete a task based on its index
  deleteTask(index) {
    this.tasks.splice(index, 1);
    // Render the updated tasks
    this.renderTasks();
    // Save the tasks to local storage
    this.saveTasksToStorage();
  }

  // Toggle the completion status of a task
  toggleTaskComplete(index) {
    const task = this.tasks[index];
    task.isComplete = !task.isComplete;
    task.taskStatus = task.isComplete ? 'Done' : 'in-progress';
    // Render the updated tasks
    this.renderTasks();
    // Save the tasks to local storage
    this.saveTasksToStorage();
  }

  // Render the tasks on the page
  renderTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("col-md-4");
      taskCard.style.outline = "none";
      taskCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${task.taskName}</h5>
            <hr>
            <p class="card-text"><strong>Description:</strong> ${task.description}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Due Date:</strong> ${task.taskDate}</li>
              <li class="list-group-item"><strong>Assigned To:</strong> ${task.assignedTo}</li>
              <li class="list-group-item"><strong>Status:</strong> ${task.taskStatus}</li>
            </ul>
            <button class="btn btn-danger" onclick="taskPlanner.deleteTask(${index})">Delete Task</button>
            ${task.taskStatus !== 'Done' ? `<button class="btn btn-success task-complete-button" onclick="taskPlanner.toggleTaskComplete(${index})" style="outline: none;">Task Done</button>` : ''}
          </div>
        </div>
      `;

      taskContainer.appendChild(taskCard);
    });
  }

  // Load tasks from local storage
  loadTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  // Save tasks to local storage
  saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}

// Create a new TaskPlanner instance
const taskPlanner = new TaskPlanner();

// Function to handle adding a new task
function addTask(event) {
  event.preventDefault();

  const taskNameInput = document.getElementById("task-name");
  const descriptionInput = document.getElementById("description");
  const taskDateInput = document.getElementById("task-date");
  const assignedToInput = document.getElementById("assigned-to");
  const taskStatusInput = document.getElementById("task-status");

  // Create a new Task instance with input values
  const task = new Task(
    taskNameInput.value,
    descriptionInput.value,
    taskDateInput.value,
    assignedToInput.value,
    taskStatusInput.value
  );

  // Add the task to the TaskPlanner
  taskPlanner.addTask(task);

  // Reset the input fields
  taskNameInput.value = "";
  descriptionInput.value = "";
  taskDateInput.value = "";
  assignedToInput.value = "";
  taskStatusInput.value = "To do";
}

// Add event listener to the task form submit button
const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", addTask);

