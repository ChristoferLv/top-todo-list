//import { addDays } from "./node_modules/date-fns/index.js";
import { addDays, format } from "https://cdn.jsdelivr.net/npm/date-fns@3/+esm";

console.log("script")
let currentGroup = "Tasks";
const addTodoBtn = document.querySelector(".add-todo");
const todoTab = document.querySelector(".new-todo-tab");
const createTodoBtn = document.querySelector(".new-todo-tab > button");
const listName = document.querySelector(".list-name");
const deleteGroupBtn = document.querySelector(".delete-group");

deleteGroupBtn.addEventListener("click", (e) => {
    if (currentGroup in tasks) {
        delete tasks[currentGroup];
    }
    currentGroup = '';
    if (Object.keys(tasks).length == 0) {
        tasks["Tasks"] = [];
        currentGroup = 'Tasks';

    }
    drawGroups();
    drawTasks();
})

createTodoBtn.addEventListener("click", (e) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");
    tasks[currentGroup].push({ id: crypto.randomUUID(), title: title.value, description: description.value, dueDate: new Date(dueDate.value), priority: priority.value })

    drawTasks();
})

/**
 * 
 * @param {event} e 
 */
function handleDeleteTask(e) {
    e.stopPropagation();
    const taskId = e.target.parentElement.getAttribute("data-id");
    const newList = tasks[currentGroup].filter(task => task.id !== taskId);
    tasks[currentGroup] = newList;
    drawTasks();
}

/**
 * 
 * @param {event} e 
 */
function handleDoneTaks(e) {
    e.stopPropagation();
    const taskId = e.target.parentElement.getAttribute("data-id");
    const newList = tasks[currentGroup].map((task) => { if (task.id == taskId) task.done = !task.done; return task });
    tasks[currentGroup] = newList;
    drawTasks();
}

/**
 * 
 * @param {event} e 
 */
function handleExpand(e) {
    e.currentTarget.classList.toggle("expanded");
}

addTodoBtn.addEventListener("click", () => {
    todoTab.classList.toggle("hidden");
})
const tasks = {
    "Tasks": [
        {
            id: crypto.randomUUID(),
            title: "Tarefa1",
            description: "Tem que fazer a tarefa 1",
            dueDate: addDays(new Date(), 1),
            done: false,
            priority: 1
        },
        {
            id: crypto.randomUUID(),
            title: "Tarefa2",
            description: "Tem que fazer a tarefa 2",
            dueDate: addDays(new Date(), 2),
            done: false,
            priority: 2
        },
        {
            id: crypto.randomUUID(),
            title: "Tarefa3",
            description: "Tem que fazer a tarefa 3",
            dueDate: addDays(new Date(), 3),
            done: false,
            priority: 3
        },
        {
            id: crypto.randomUUID(),
            title: "Tarefa4",
            description: "Tem que fazer a tarefa 4",
            dueDate: addDays(new Date(), 4),
            done: false,
            priority: 2
        },
        {
            id: crypto.randomUUID(),
            title: "Tarefa5",
            description: "Tem que fazer a tarefa 5",
            dueDate: addDays(new Date(), 5),
            done: true,
            priority: 3
        }
    ]
}

function addGroup(groupname) {
    tasks[groupname] = [];
    drawGroups();
}

/**
 * 
 * @param {event} e 
 */
function handleGroupClick(e) {
    currentGroup = e.target.innerText;
    drawTasks();
}

const taskList = document.querySelector(".content-body");
function drawTasks() {
    taskList.innerText = '';
    listName.innerText = "Vizualisando grupo: " + currentGroup;
    if (!(currentGroup in tasks)) return;
    for (const task of tasks[currentGroup]) {
        console.log(task["dueDate"].toISOString())
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.setAttribute("data-id", task['id']);
        newTask.addEventListener("click", handleExpand);
        const taskTitle = document.createElement("p");
        taskTitle.innerText = task.title;
        const taskDescription = document.createElement("p");
        taskDescription.innerText = task.description;
        const isDone = document.createElement("div");
        isDone.classList.add("is-done");
        if (task.done) isDone.classList.add("done");
        isDone.addEventListener("click", handleDoneTaks)
        const taskDueDate = document.createElement("p");
        taskDueDate.innerText = task.dueDate.toLocaleDateString();
        const taskPriority = document.createElement("p");
        taskPriority.innerText = task.priority;
        newTask.classList.add("priority-" + task.priority);
        const taskEditBtn = document.createElement("div");
        taskEditBtn.classList.add("edit-btn");
        taskEditBtn.addEventListener("click", (e) => { handleEditButton(e, e.target.parentElement.getAttribute("data-id")) });
        const taskDeleteBtn = document.createElement("div");
        taskDeleteBtn.classList.add("delete-btn");
        taskDeleteBtn.addEventListener("click", handleDeleteTask);
        newTask.append(taskTitle);
        newTask.append(taskDescription);
        newTask.append(isDone);
        newTask.append(taskDueDate);
        newTask.append(taskEditBtn);
        newTask.append(taskDeleteBtn);
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
        newGroup.addEventListener("click", handleGroupClick);
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

const editFormDialog = document.getElementById('edit-task-dialog');
const closeEditButton = document.getElementById("close-edit-btn");
const editForm = document.getElementById('editForm');

function getTaskById(id) {
    for (const task of tasks[currentGroup]) {
        if (task.id == id)
            return task;
    }
    return null;
}

function handleEditButton(e, id) {
    console.log(id)
    e.stopPropagation();
    editFormDialog.showModal();
    editForm.setAttribute("edit-id", id);
    const newTitle = document.getElementById("newTitle");
    const newDescription = document.getElementById("newDescription");
    const newDueDate = document.getElementById("newDueDate");
    const newPriority = document.getElementById("newPriority");
    let task = getTaskById(id);
    newTitle.value = task["title"];
    newDescription.value = task["description"];
    newDueDate.value = format(task["dueDate"], "yyyy-MM-dd'T'hh:mm");
    newPriority.value = task["priority"];
};

closeEditButton.addEventListener('click', () => {
    editForm.reset();
    editFormDialog.close();
});

editForm.addEventListener('submit', (event) => {
    const formData = new FormData(event.target);
    console.log(event.target)
    console.log(Object.fromEntries(formData))
    const newTitle = formData.get("title")
    const newDescription = formData.get("description")
    const newDueDate = formData.get("dueDate")
    const newPriority = formData.get("priority")
    const id = editForm.getAttribute("edit-id");
    const editedTask = getTaskById(id);
    editedTask.title = newTitle;
    editedTask.description = newDescription;
    editedTask.dueDate = new Date(newDueDate);
    editedTask.priority = newPriority;
    console.log(tasks)
    editForm.reset();
    drawTasks();
});

