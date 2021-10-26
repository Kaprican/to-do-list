
let allDeleteButtons = document.querySelectorAll(".delete-btn");
for (let delButton of allDeleteButtons) {
    addDeleteEventListenerToButton(delButton);
}
updateTaskList();
// localStorage.setItem("tasks", JSON.stringify(["Call mom", "Email Alex", "Clear the dishes"]);

document.getElementById("add-task-button")
.addEventListener("click", createTaskList);

function createTaskList () {
const taskName = document.getElementById("input-task");
if (!taskName.value) {
    return;
}

let ul = document.getElementById("task-list");
let li = createTaskForList(taskName.value);
ul.appendChild(li);
saveTaskListInLocalStorage();
// updateTaskList();
taskName.value = "";
}

function createTaskForList (taskName) {
let checkbox = document.createElement("input");
checkbox.setAttribute("type", "checkbox");

let delButton = document.createElement("button");
delButton.setAttribute("class", "delete-btn");
delButton.appendChild(document.createTextNode("x"));
addDeleteEventListenerToButton(delButton);

let task = document.createElement("span");
task.setAttribute("class", "task");
task.appendChild(document.createTextNode(taskName));

let li = document.createElement("li");
li.append(checkbox, task, delButton);

// saveTaskListInLocalStorage();
return li;
}

function addDeleteEventListenerToButton (delButton) {
delButton.addEventListener("click", function () {
    delButton.parentNode.remove();
    saveTaskListInLocalStorage();
});
};

function saveTaskListInLocalStorage () {
const taskList = document.querySelectorAll(".task");
const resultTaskList = [];
for (let task of taskList) {
    resultTaskList.push(task.innerHTML);
}
localStorage.setItem("tasks", JSON.stringify(resultTaskList));
}

function updateTaskList() {
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

if (taskList) {
    let ul = document.getElementById("task-list");
    for (let taskName of taskList) {
        const li = createTaskForList(taskName);
        ul.appendChild(li);
    }
}
}