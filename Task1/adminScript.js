const fieldForm = document.getElementById("fieldForm");
const selectOptionsContainer = document.getElementById(
  "selectOptionsContainer"
);
const addfield = document.getElementById("addfield");
const fieldClose = document.getElementById("fieldClose");
const save = document.getElementById("save");
const fieldValue = document.getElementById("fieldValue");

addfield.addEventListener("click", () => {
  document.getElementById("fieldValue").value = "";
  document.getElementById("fieldVisibility").checked = false;
  document.getElementById("fieldModal").style.display = "flex";
  document.getElementById("admin").style.opacity = "0.5";
});

fieldClose.addEventListener("click", () => {
  document.getElementById("fieldModal").style.display = "none";
  document.getElementById("admin").style.opacity = "1";
});

fieldType.addEventListener("change", () => {
  const selectedOption = fieldType.value;
  if (selectedOption === "select") {
    selectOptionsContainer.style.display = "block";
    document.getElementById("fieldValue").placeholder = "";
  } else {
    selectOptionsContainer.style.display = "none";
  }
});

save.addEventListener("click", () => {
  const newField = {
    type: fieldType.value,
    labelValue: fieldValue.value,
    visibility: fieldVisibility.checked,
  };

  if (newField.type === "select") {
    const options = document.getElementById("selectOptions").value.split(",");
    newField.options = options.map((option) => option.trim());
  }

  let formFields = JSON.parse(localStorage.getItem("formFields")) || [];
  formFields.push(newField);
  localStorage.setItem("formFields", JSON.stringify(formFields));

  addFieldToForm(newField);
  fieldClose.click();
});

function addFieldToForm(field) {
  const newField = document.createElement("div");
  const fieldLabel = document.createElement("label");
  fieldLabel.textContent = field.labelValue + ":";
  newField.appendChild(fieldLabel);

  const fieldContainer = document.createElement("div");
  fieldContainer.classList.add("d-flex", "w-100");

  if (field.type === "select") {
    const select = document.createElement("select");
    select.className = "w-75";
    field.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
    fieldContainer.appendChild(select);
  } else {
    const input = document.createElement("input");
    input.className = "w-75";
    input.type = field.type;
    fieldContainer.appendChild(input);
  }

  const editButton = document.createElement("button");
  editButton.className = "mx-2";
  editButton.textContent = "Edit";
  editButton.type = "button";
  editButton.id = "editBtn";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.type = "button";
  deleteButton.id = "deleteBtn";

  fieldContainer.appendChild(editButton);
  fieldContainer.appendChild(deleteButton);
  newField.appendChild(fieldContainer);
  console.log(newField);
  document.getElementById("register").appendChild(newField);
}

window.addEventListener("load", () => {
  const savedFields = JSON.parse(localStorage.getItem("formFields")) || [];
  savedFields.forEach(addFieldToForm);
});
