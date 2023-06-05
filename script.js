// Task array to store tasks
const tasks = [];

// Function to create a task card
function createTaskCard(taskName, description, taskDate, assignedTo, taskStatus) {
  const card = document.createElement("div");
  card.classList.add("col", "col-md-6");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card");
  cardInner.style.width = "100%";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = taskName;

  const subtitle1 = document.createElement("p");
  subtitle1.classList.add("card-text", "text-muted");
  subtitle1.textContent = "Description: " + description;

  const subtitle2 = document.createElement("p");
  subtitle2.classList.add("card-text", "text-muted");
  subtitle2.textContent = "Assigned to: " + assignedTo;

  const subtitle3 = document.createElement("p");
  subtitle3.classList.add("card-text", "text-muted");
  subtitle3.textContent = "Due date: " + taskDate;

  const subtitle4 = document.createElement("p");
  subtitle4.classList.add("card-text", "text-muted");
  subtitle4.textContent = "Status: " + taskStatus;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    // Remove the task card from the DOM
    card.remove();

    // Remove the task from the tasks array
    const index = tasks.findIndex((task) => task.taskName === taskName);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
  });

  cardBody.appendChild(title);
  cardBody.appendChild(subtitle1);
  cardBody.appendChild(subtitle2);
  cardBody.appendChild(subtitle3);
  cardBody.appendChild(subtitle4);
  cardBody.appendChild(deleteButton);

  cardInner.appendChild(cardBody);
  card.appendChild(cardInner);

  return card;
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
