// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = function () {
  loadTasks();
};

// Add task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  let tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  displayTasks();

  taskInput.value = "";
}

// Display all tasks
function displayTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(task.id));

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTask(task.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", () => deleteTask(task.id));

    btnDiv.append(editBtn, delBtn);
    li.append(span, btnDiv);
    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleComplete(id) {
  let tasks = getTasks();
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  displayTasks();
}

// Edit task
function editTask(id) {
  let tasks = getTasks();
  const taskToEdit = tasks.find((task) => task.id === id);
  const newText = prompt("Edit your task:", taskToEdit.text);

  if (newText !== null && newText.trim() !== "") {
    taskToEdit.text = newText.trim();
    saveTasks(tasks);
    displayTasks();
  }
}

// Delete task
function deleteTask(id) {
  let tasks = getTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
  displayTasks();
}

// Local Storage Functions
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  displayTasks();
}
