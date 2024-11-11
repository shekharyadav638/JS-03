const fieldForm = document.getElementById("fieldForm");
const selectOptionsContainer = document.getElementById(
  "selectOptionsContainer"
);
const addfield = document.getElementById("addfield");
const fieldClose = document.getElementById("fieldClose");
const save = document.getElementById("save");
const fieldType = document.getElementById("fieldType");
const fieldValue = document.getElementById("fieldValue");
const savechanges = document.getElementById("savechanges");
let editingFieldIndex = null;
let tempFormFields = JSON.parse(localStorage.getItem("formFields")) || []; // to store fields temporarily and will update in localstorage when I click on save changes button

addfield.addEventListener("click", () => {
  resetModal();
  editingFieldIndex = null;
  document.getElementById("fieldModal").style.display = "flex";
  document.getElementById("admin").style.opacity = "0.5";
});

fieldClose.addEventListener("click", () => {
  document.getElementById("fieldModal").style.display = "none";
  document.getElementById("admin").style.opacity = "1";
});

fieldType.addEventListener("change", () => {
  const selectedOption = fieldType.value;
  if (selectedOption === "select" || selectedOption === "radio") {
    selectOptionsContainer.style.display = "block";
    fieldValue.placeholder = "";
  } else {
    selectOptionsContainer.style.display = "none";
  }
});

save.addEventListener("click", () => {
  const newField = {
    type: fieldType.value,
    labelValue: fieldValue.value,
    visibility: document.getElementById("fieldVisibility").checked,
    required: document.getElementById("fieldRequired").checked,
  };

  if (newField.type === "select" || newField.type === "radio") {
    const options = document.getElementById("selectOptions").value.split(",");
    newField.options = options.map((option) => option.trim());
  }

  if (editingFieldIndex !== null) tempFormFields[editingFieldIndex] = newField;
  else tempFormFields.push(newField);

  renderFields();
  fieldClose.click();
});

function renderFields() {
  const formContainer = document.getElementById("register");
  formContainer.innerHTML = "";
  tempFormFields.forEach((field, index) => {
    addFieldToForm(field, index);
  });
}

function addFieldToForm(field, index) {
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
  } else if (field.type === "radio") {
    const radioGroup = document.createElement("div");
    radioGroup.className = "w-75";
    field.options.forEach((option) => {
      const radioContainer = document.createElement("div");
      radioContainer.className = "d-flex gap-2";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = field.labelValue;
      radio.value = option;
      radioContainer.appendChild(radio);
      const radioLabel = document.createElement("label");
      radioLabel.textContent = option;
      radioContainer.appendChild(radioLabel);
      radioGroup.appendChild(radioContainer);
      fieldContainer.appendChild(radioGroup);
    });
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
  editButton.addEventListener("click", () => openEditModal(field, index));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.type = "button";
  deleteButton.id = "deleteBtn";
  deleteButton.addEventListener("click", () => deleteField(index));

  fieldContainer.appendChild(editButton);
  if (!field.required) fieldContainer.appendChild(deleteButton);
  newField.appendChild(fieldContainer);
  document.getElementById("register").appendChild(newField);
}

function openEditModal(field, index) {
  editingFieldIndex = index;
  document.getElementById("fieldModal").style.display = "flex";
  document.getElementById("admin").style.opacity = "0.5";

  fieldType.value = field.type;
  fieldValue.value = field.labelValue;
  document.getElementById("fieldVisibility").checked = field.visibility;

  if (field.type === "select" || field.type === "radio") {
    selectOptionsContainer.style.display = "block";
    document.getElementById("selectOptions").value = field.options.join(", ");
  } else {
    selectOptionsContainer.style.display = "none";
  }
}

function resetModal() {
  fieldType.value = "text";
  fieldValue.value = "";
  document.getElementById("fieldVisibility").checked = false;
  document.getElementById("selectOptions").value = "";
  selectOptionsContainer.style.display = "none";
  editingFieldIndex = null;
}

function deleteField(index) {
  let formFields = JSON.parse(localStorage.getItem("formFields")) || [];
  formFields.splice(index, 1);
  localStorage.setItem("formFields", JSON.stringify(formFields));
  renderFields();
}

savechanges.addEventListener("click", () => {
  localStorage.setItem("formFields", JSON.stringify(tempFormFields));
  alert("Form fields updated successfully!");
});

window.addEventListener("load", renderFields);
