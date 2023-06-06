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
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.renderTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.renderTasks();
  }

  renderTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("col-md-4");
      taskCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${task.taskName}</h5>
            <p class="card-text">${task.description}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Due Date:</strong> ${task.taskDate}</li>
              <li class="list-group-item"><strong>Assigned To:</strong> ${task.assignedTo}</li>
              <li class="list-group-item"><strong>Status:</strong> ${task.taskStatus}</li>
            </ul>
            <button class="btn btn-danger" onclick="taskPlanner.deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;

      taskContainer.appendChild(taskCard);
    });
  }
}

const taskPlanner = new TaskPlanner();

function addTask(event) {
  event.preventDefault();

  const taskNameInput = document.getElementById("task-name");
  const descriptionInput = document.getElementById("description");
  const taskDateInput = document.getElementById("task-date");
  const assignedToInput = document.getElementById("assigned-to");
  const taskStatusInput = document.getElementById("task-status");

  const task = new Task(
    taskNameInput.value,
    descriptionInput.value,
    taskDateInput.value,
    assignedToInput.value,
    taskStatusInput.value
  );

  taskPlanner.addTask(task);

  taskNameInput.value = "";
  descriptionInput.value = "";
  taskDateInput.value = "";
  assignedToInput.value = "";
  taskStatusInput.value = "To do";
}

const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", addTask);
