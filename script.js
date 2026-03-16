//import { addDays } from "./node_modules/date-fns/index.js";
import { addDays } from "https://cdn.jsdelivr.net/npm/date-fns@3/+esm";

console.log("script")
const currentGroup = "tasks";
const addTodoBtn = document.querySelector(".add-todo");
const todoTab = document.querySelector(".new-todo-tab");
const createTodoBtn = document.querySelector(".new-todo-tab > button");

createTodoBtn.addEventListener("click", (e) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    console.log(tasks);
    tasks.push({ title: title.value, description: description.value, dueDate: new Date(dueDate.value) })
    drawTasks();
})

addTodoBtn.addEventListener("click", () => {
    todoTab.classList.toggle("hidden");
})
const tasks = {
    "tasks": [
        {
            title: "Tarefa1",
            description: "Tem que fazer a tarefa 1",
            dueDate: addDays(new Date(), 1)
        },
        {
            title: "Tarefa2",
            description: "Tem que fazer a tarefa 2",
            dueDate: addDays(new Date(), 2)
        },
        {
            title: "Tarefa3",
            description: "Tem que fazer a tarefa 3",
            dueDate: addDays(new Date(), 3)
        },
        {
            title: "Tarefa4",
            description: "Tem que fazer a tarefa 4",
            dueDate: addDays(new Date(), 4)
        }, {
            title: "Tarefa5",
            description: "Tem que fazer a tarefa 5",
            dueDate: addDays(new Date(), 5)
        }
    ]
}

function addGroup(groupname){
    tasks[groupname] = [];
    drawGroups();
    console.log(tasks);
}

const taskList = document.querySelector(".content-body");
function drawTasks() {
    taskList.innerText = '';
    for (const task of tasks[currentGroup]) {
        console.log(task)
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        const taskTitle = document.createElement("p");
        taskTitle.innerText = task.title;
        const taskDescription = document.createElement("p");
        taskDescription.innerText = task.description;
        const taskDueDate = document.createElement("p");
        taskDueDate.innerText = task.dueDate.toLocaleDateString();
        newTask.append(taskTitle);
        newTask.append(taskDescription);
        newTask.append(taskDueDate);
        taskList.append(newTask);
    }
}

drawTasks();

const groupsList = document.querySelector(".groups-container");
function drawGroups() {
    groupsList.innerText = '';
     for (const group in tasks) {
        const newGroup = document.createElement("div");
        newGroup.classList.add("group");
        const groupName = document.createElement("p");
        groupName.innerText = group;
        newGroup.append(groupName);
        groupsList.append(newGroup);
    }
}

drawGroups();

const myFormDialog = document.getElementById('add-group-dialog');
const showFormDialogButton = document.getElementById('add-group');
const closeButton = document.getElementById("close-btn");
const myForm = document.getElementById('myForm');


showFormDialogButton.addEventListener('click', () => {
    console.log("click")
    myFormDialog.showModal();
});

closeButton.addEventListener('click', () => {
    myForm.reset();
    myFormDialog.close();
});

myForm.addEventListener('submit', (event) => {
    const formData = new FormData(event.target);
    addGroup(formData.get("groupName"));
    myForm.reset();
});