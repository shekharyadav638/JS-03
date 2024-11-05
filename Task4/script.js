const task = document.getElementById("task");
const list = document.getElementById("list");
const add = document.getElementById("btn");

function onSubmit() {
  const addedTask = task.value;
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerHTML = `${addedTask}`;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "checkbox";
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
    const editTask = prompt("Edit task", addedTask);
    newTask.innerHTML = `${editTask}`;
    newTask.appendChild(input);
    newTask.appendChild(edit);
    newTask.appendChild(remove);
  });

  remove.addEventListener("click", () => {
    newTask.remove();
  });

  list.appendChild(newTask);
  task.value = "";
}
