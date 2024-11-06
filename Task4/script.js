const task = document.getElementById("task");
const list = document.getElementById("list");
const add = document.getElementById("btn");

add.addEventListener("click", () => {
  const addedTask = task.value;
  if (addedTask.trim() === "") return;

  const taskObj = { text: addedTask, checked: false };
  addTaskToDOM(taskObj);
  saveTask(taskObj);
  task.value = "";
});

function addTaskToDOM(taskObj) {
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerHTML = `${taskObj.text}`;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "checkbox";
  input.checked = taskObj.checked;
  newTask.appendChild(input);

  const edit = document.createElement("button");
  edit.innerHTML = "Edit";
  edit.className = "edit";
  newTask.appendChild(edit);

  const remove = document.createElement("button");
  remove.innerHTML = "Remove";
  remove.className = "remove";
  newTask.appendChild(remove);

  edit.addEventListener("click", () => {
    const editTask = prompt("Edit task", taskObj.text);
    if (editTask !== null && editTask.trim() !== "") {
      taskObj.text = editTask;
      newTask.innerHTML = `${editTask}`;
      newTask.appendChild(input);
      newTask.appendChild(edit);
      newTask.appendChild(remove);
      updateTasksInStorage();
    }
  });

  remove.addEventListener("click", () => {
    newTask.remove();
    removeTask(taskObj);
  });

  input.addEventListener("change", () => {
    taskObj.checked = input.checked;
    updateTasksInStorage();
  });

  list.appendChild(newTask);
}

function saveTask(taskObj) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskObj) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskObj.text);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function updateTasksInStorage() {
  const tasks = [];
  list.querySelectorAll(".task").forEach((taskElement) => {
    const text = taskElement.childNodes[0].textContent;
    const checked = taskElement.querySelector(".checkbox").checked;
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

document.addEventListener("DOMContentLoaded", loadTasks);
