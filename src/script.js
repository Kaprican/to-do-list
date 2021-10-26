const localStorageTaskList = "tasks";

let allDeleteButtons = document.querySelectorAll(".delete-btn");
for (let delButton of allDeleteButtons) {
    delButton.addEventListener("click", deleteTask);
}
updateTaskList();

document.getElementById("add-task-button")
    .addEventListener("click", createTaskList);

function createTaskList () {
    const taskName = document.getElementById("input-task");
    if (!taskName?.value) {
        return;
    }

    appendListItemNode(taskName.value);
    saveTaskListInLocalStorage();
    taskName.value = "";
}

function updateTaskList() {
    let taskList = JSON.parse(localStorage.getItem(localStorageTaskList)) || [];

    for (let taskName of taskList) {
        appendListItemNode(taskName);
    }
}

function appendListItemNode (taskName) {
    const ul = document.getElementById("task-list");
    const li = createTaskForList(taskName);
    ul.appendChild(li);
}

function createTaskForList (taskName, isChecked = false) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = isChecked;

    let delButton = document.createElement("button");
    delButton.setAttribute("class", "delete-btn");
    delButton.appendChild(document.createTextNode("x"));
    delButton.addEventListener("click", deleteTask);

    let task = document.createElement("span");
    task.setAttribute("class", "task");
    task.appendChild(document.createTextNode(taskName));

    let li = document.createElement("li");
    li.append(checkbox, task, delButton);
    return li;
}

function deleteTask() {
    this.parentNode.remove();
    saveTaskListInLocalStorage();
}

function saveTaskListInLocalStorage () {
    const taskList = document.querySelectorAll(".task");
    const resultTaskList = [];
    for (let task of taskList) {
        resultTaskList.push(task.innerHTML);
    }
    localStorage.setItem(localStorageTaskList, JSON.stringify(resultTaskList));
}
