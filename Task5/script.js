const sidebar = document.getElementById("sidebar");
const newFileButton = document.getElementById("new-file");
const newFolderButton = document.getElementById("new-folder");
let latestExpandedFolder = sidebar;

const toggleSidebarButton = document.getElementById("toggle-sidebar");
toggleSidebarButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");

  const icon = toggleSidebarButton.querySelector("i");
  icon.classList.toggle("fa-angle-bottom");
  icon.classList.toggle("fa-angle-up");
});

const collapseAllButton = document.getElementById("collapse-all");
collapseAllButton.addEventListener("click", () => {
  const subFolders = document.querySelectorAll(".sub-folder");
  subFolders.forEach((folder) => {
    folder.style.display = "none";
  });
});

function createInputBox(placeholder, onEnter) {
  const existingInput = sidebar.querySelector(".name-input");
  if (existingInput) {
    existingInput.remove();
    return;
  }
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = placeholder;
  nameInput.className = "name-input";
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      onEnter(nameInput.value);
      nameInput.remove();
    }
  });
  latestExpandedFolder.prepend(nameInput);
}

newFileButton.addEventListener("click", () => {
  createInputBox("Enter the name of the file", (fileName) => {
    addFile({ name: fileName, type: "file" }, latestExpandedFolder);
  });
});

newFolderButton.addEventListener("click", () => {
  createInputBox("Enter the name of the folder", (folderName) => {
    addFolder(
      { name: folderName, type: "folder", items: [] },
      latestExpandedFolder
    );
  });
});

function addFolder(folder, parent) {
  const newFolder = document.createElement("div");
  newFolder.className = "folder";

  const folderTitle = document.createElement("div");
  folderTitle.className = "folder-header";
  folderTitle.innerHTML = `<img src="./icons/folder.png" class="icon" /><span>${folder.name}</span>`;
  newFolder.appendChild(folderTitle);

  const subFolderContainer = document.createElement("div");
  subFolderContainer.className = "sub-folder";
  subFolderContainer.style.display = "none";
  newFolder.appendChild(subFolderContainer);

  folder.items.forEach((item) => {
    if (item.type === "folder") addFolder(item, subFolderContainer);
    else addFile(item, subFolderContainer);
  });

  folderTitle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = subFolderContainer.style.display === "none";
    subFolderContainer.style.display = isExpanded ? "block" : "none";
    if (isExpanded) {
      latestExpandedFolder = subFolderContainer;
    }
  });

  parent.appendChild(newFolder);
}

function addFile(file, parent) {
  const newFile = document.createElement("div");
  newFile.className = "file";
  const fileExtension = file.name.split(".").pop();
  const iconSrc = `./icons/${fileExtension}.png`;
  newFile.innerHTML = `<img src="${iconSrc}" class="icon"  onerror="this.onerror=null; this.src='./icons/txt.png';"/><span>${file.name}</span>`;
  parent.appendChild(newFile);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.root.forEach((item) => {
        if (item.type === "folder") addFolder(item, sidebar);
        else addFile(item, sidebar);
      });
    });
});
