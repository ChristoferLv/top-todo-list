//import { addDays } from "./node_modules/date-fns/index.js";
import { addDays, format } from "https://cdn.jsdelivr.net/npm/date-fns@3/+esm";

console.log("script")


class Task {
    constructor(title, description, dueDate, priority, id = crypto.randomUUID(), done = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = done;
        this.priority = priority;
    }

    toggleDone() {
        this.done = !this.done;
    }
}



const DOMManager = (() => {
    const todoTab = document.querySelector(".new-todo-tab");
    const listName = document.querySelector(".list-name");
    const deleteGroupBtn = document.querySelector(".delete-group");
    const groupsList = document.querySelector(".groups-container");
    /**
     * 
     * @param {Object} tasks 
     * @param {Function} handleGroupClick 
     */
    function drawGroups(tasks, handleGroupClick) {
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

    const taskList = document.querySelector(".content-body");
    /**
     * @param {string} currentGroup
     * @param {Object} tasks 
     * @param {Function} handleDoneTaks 
     * @param {Function} handleEditButton 
     * @param {Function} handleDeleteTask 
     * @returns 
     */
    function drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup) {
        taskList.innerText = '';
        listName.innerText = "Vizualisando grupo: " + currentGroup;
        if (!(currentGroup in tasks)) return;
        for (const task of tasks[currentGroup]) {
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("data-id", task['id']);
            //newTask.addEventListener("click", handleExpand);
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
            taskEditBtn.addEventListener("click", (e) => { handleEditButton(e) });
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

    const addTodoBtn = document.querySelector(".add-todo");
    addTodoBtn.addEventListener("click", () => {
        todoTab.classList.toggle("hidden");
    })

    let handleEditButton;

    function initializeHandleEditButton(getTaskById, editTask) {
        const editFormDialog = document.getElementById('edit-task-dialog');
        const closeEditButton = document.getElementById("close-edit-btn");
        const editForm = document.getElementById('editForm');
        /**
         * 
         * @param {event} e 
         */
        handleEditButton = function handleEditButton(e) {
            const id = e.target.parentElement.getAttribute("data-id");
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
            const newTitle = formData.get("title")
            const newDescription = formData.get("description")
            const newDueDate = formData.get("dueDate")
            const newPriority = formData.get("priority")
            const id = editForm.getAttribute("edit-id");
            editForm.reset();
            editTask(id, newTitle, newDescription, newDueDate, newPriority);
        });
    }
    /**
     * @callback addGroupCallback
     * @param {string} name
     */
    /**
     * 
     * @param {addGroupCallback} addGroup 
    */
    function initializeAddGroupForm(addGroup) {
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
    }

    /**
     * @callback addTaskCallback
     * @param {string} title 
     * @param {string} description 
     * @param {string} dueDate 
     * @param {string} priority 
     */
    /**
     * 
     * @param {addTaskCallback} addTask 
     */
    function initializeCreateTask(addTask) {
        const createTodoBtn = document.querySelector(".new-todo-tab > button");
        createTodoBtn.addEventListener("click", (e) => {
            const title = document.querySelector("#title")
            const description = document.querySelector("#description")
            const dueDate = document.querySelector("#dueDate")
            const priority = document.querySelector("#priority")
            addTask(title.value, description.value, dueDate.value, priority.value);
            title.value = '';
            description.value = '';
            dueDate.value = '';
            priority.value = '';
        })
    }

    /**
     * 
     * @param {Function} deleteGroup 
     */
    function initializeDeleGroup(deleteGroup) {
        deleteGroupBtn.addEventListener("click", (e) => {
            deleteGroup();
        })
    }

    return { drawGroups, drawTasks, initializeAddGroupForm, initializeCreateTask, initializeDeleGroup, initializeHandleEditButton };
})();

const TodoList = ((DOMManager) => {
    const LOCALSTORAGE_KEY_NAME = "myTasks";
    let currentGroup = "Tasks";
    let tasks = {
    }
    console.log(tasks);

    const reviver = (key, value) => {
        if (
            value &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            "title" in value &&
            "description" in value &&
            "dueDate" in value
        ) {
            return Object.assign(new Task(), {
                ...value,
                dueDate: new Date(value.dueDate)
            });
        }

        return value;
    };

    const savedTasks = localStorage.getItem("myTasks");
    if (savedTasks) {
        // Usando função reviver
        // const savedTasksParsed = JSON.parse(savedTasks, reviver);
        // tasks = savedTasksParsed;

        const savedTasksParsed = JSON.parse(savedTasks);
        for (const group in savedTasksParsed) {
            tasks[group] = [];
            for (const task of savedTasksParsed[group]) {
                tasks[group].push(Object.assign(new Task, { ...task, dueDate: new Date(task.dueDate) }));
            }
        }
        currentGroup = Object.keys(savedTasksParsed)[0];
    } else {
        tasks[currentGroup] = [];
    }


    DOMManager.drawGroups(tasks, handleGroupClick);
    DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
    DOMManager.initializeAddGroupForm(addGroup);
    DOMManager.initializeCreateTask(addTask);
    DOMManager.initializeDeleGroup(deleteGroup)
    DOMManager.initializeHandleEditButton(getTaskById, editTask);

    function updateLocalStorage() {
        localStorage.setItem(LOCALSTORAGE_KEY_NAME, JSON.stringify(tasks));
    }

    /**
     * @param {string} name 
     */
    function addGroup(name) {
        tasks[name] = [];
        DOMManager.drawGroups(tasks, handleGroupClick);
        updateLocalStorage();
    }

    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {string} dueDate 
     * @param {string} priority 
     */
    function addTask(title, description, dueDate, priority) {
        tasks[currentGroup].push(new Task(title, description, new Date(dueDate), priority))
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
        updateLocalStorage();
    }

    function deleteGroup() {
        if (currentGroup in tasks) {
            delete tasks[currentGroup];
        }
        currentGroup = '';
        if (Object.keys(tasks).length == 0) {
            tasks["Tasks"] = [];
            currentGroup = 'Tasks';

        }
        DOMManager.drawGroups(tasks, handleGroupClick);
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
        updateLocalStorage();
    }

    function editTask(id, newTitle, newDescription, newDueDate, newPriority) {
        const editedTask = getTaskById(id);
        editedTask.title = newTitle;
        editedTask.description = newDescription;
        editedTask.dueDate = new Date(newDueDate);
        editedTask.priority = newPriority;
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
        updateLocalStorage();
    }

    /**
     * @param {event} e 
     */
    function handleGroupClick(e) {
        currentGroup = e.target.innerText;
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
    }

    /**
    * 
    * @param {event} e 
    */
    function handleDoneTaks(e) {
        e.stopPropagation();
        const taskId = e.target.parentElement.getAttribute("data-id");
        for (const task of tasks[currentGroup]) {
            if (task.id == taskId) {
                task.toggleDone();
                break;
            }
        }
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
        updateLocalStorage();
    }

    /**
     * 
     * @param {event} e 
     */
    function handleDeleteTask(e) {
        e.stopPropagation();
        const taskId = e.target.parentElement.getAttribute("data-id");
        const newList = tasks[currentGroup].filter(task => task.id !== taskId);
        tasks[currentGroup] = newList;
        DOMManager.drawTasks(tasks, handleDoneTaks, handleDeleteTask, currentGroup);
        updateLocalStorage();
    }

    function getTaskById(id) {
        for (const task of tasks[currentGroup]) {
            if (task.id == id)
                return task;
        }
        return null;
    }

})(DOMManager);











