# Todo List

Task management application developed as part of the JavaScript path of [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript), with a focus on **modular architecture**, **DOM manipulation**, **using external libraries**, and **data persistence with LocalStorage**.

## Project Objective

The main objective was to practice:
- Code organization with Module Pattern
- Separation of responsibilities between logic and interface
- Creating, editing, and removing tasks
- Managing task groups/projects
- Persisting data in the browser with LocalStorage
- Working with dates and formatting using date-fns
- Advanced interactions with forms and dialogs

## What is it?

A fully functional todo list application containing:
- Creation of groups to organize tasks by context
- Task creation with title, description, date, and priority
- Marking tasks as completed
- Editing and deleting tasks
- Deleting groups
- Dynamic interface with real-time updates
- Automatic data saving in the browser

## How to use

1. Open the `index.html` file in your browser
2. Create a group by clicking the add icon in the "Groups" section
3. Select the group where you want to organize your tasks
4. Click the add task icon to open the form
5. Fill in the title, description, date, and priority, then click "Add"
6. Use the list icons to edit, delete, or mark tasks as completed

## Features

- **Task Groups**: Creation and removal of groups/projects for better organization
- **Task CRUD**: Full create, read, update, and delete support
- **Visual Priorities**: Task differentiation by priority level
- **Completion Status**: Mark tasks as completed with visual feedback
- **Local Persistence**: Data saved in LocalStorage, keeping information between sessions
- **Editing with Dialog**: Dedicated modal window for editing existing tasks
- **Due Dates**: Deadline control with date and time fields
- **Reactive Interface**: Immediate DOM updates after each action

## Code Patterns

- **Module Pattern**: Encapsulation of the UI layer and business logic
- **Task class**: Modeling tasks with their own behavior
- **Separation of Concerns**: Responsibilities split between rendering and application rules
- **Object serialization/reconstruction**: Converting saved data back into domain objects when loading the app
- **Dependency Injection**: Event handling and logic functions are injected into the UI module (DOMManager), promoting decoupling between UI and business rules
- **Event-driven Callbacks**: Using callbacks to respond dynamically to DOM events

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+) - Module Pattern, Classes, LocalStorage API
- date-fns (date formatting and manipulation)

## Visualization

<img width="1920" height="919" alt="top-todo-list_screenshot" src="https://github.com/user-attachments/assets/8572be64-4010-4668-b80a-8872e95e0c89" />

---

Project developed following: [The Odin Project - Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)

📍 **Main repository with all projects**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)
