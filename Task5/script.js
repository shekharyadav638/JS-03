const sidebar = document.getElementById("sidebar");

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
    subFolderContainer.style.display =
      subFolderContainer.style.display === "none" ? "block" : "none";
  });

  parent.appendChild(newFolder);
}

function addFile(file, parent) {
  const newFile = document.createElement("div");
  newFile.className = "file";
  newFile.innerHTML = `<img src = "./icons/html.png" class="icon" /><span>${file.name}</span>`;
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
