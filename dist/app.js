"use strict";
const STORAGE_KEY = "student_tasks";
const THEME_KEY = "student_theme";
// ------------------------------
// Load tasks from localStorage
// ------------------------------
function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) {
        return [];
    }
    try {
        return JSON.parse(savedTasks);
    }
    catch {
        return [];
    }
}
// ------------------------------
// Variables
// ------------------------------
let tasks = loadTasks();
let currentFilter = "all";
// ------------------------------
// HTML Elements
// ------------------------------
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const themeBtn = document.getElementById("themeBtn");
// ------------------------------
// Save tasks
// ------------------------------
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
// ------------------------------
// Add task
// ------------------------------
function addTask() {
    const title = taskInput.value.trim();
    const alertBox = document.getElementById("alertBox");
    if (title === "") {
        alertBox.textContent = "Please enter a task.";
        alertBox.style.display = "block";
        alertBox.style.backgroundColor = "#4e428a";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 2000);
        return;
    }
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    refreshUI();
}
// ------------------------------
// Display tasks
// ------------------------------
function displayTasks() {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter((task) => {
        if (currentFilter === "pending") {
            return !task.completed;
        }
        if (currentFilter === "completed") {
            return task.completed;
        }
        return true;
    });
    filteredTasks.forEach((task) => {
        // Task container
        const taskElement = document.createElement("div");
        // Task title
        const title = document.createElement("span");
        title.textContent = task.title;
        // Complete / Undo button
        const button = document.createElement("button");
        button.textContent = task.completed
            ? "Undo"
            : "Complete";
        button.addEventListener("click", () => {
            toggleTask(task.id);
        });
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });
        // Line-through completed task
        if (task.completed) {
            title.style.textDecoration = "line-through";
        }
        // Add elements to task container
        taskElement.appendChild(title);
        taskElement.appendChild(button);
        taskElement.appendChild(deleteButton);
        // Add task container to task list
        taskList.appendChild(taskElement);
    });
}
// ------------------------------
// Light/Dark Theme
// ------------------------------
function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    if (isDark) {
        themeBtn.textContent = "☀️";
        localStorage.setItem(THEME_KEY, "dark");
    }
    else {
        themeBtn.textContent = "🌙";
        localStorage.setItem(THEME_KEY, "light");
    }
}
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }
}
// ------------------------------
// Complete / Undo task
// ------------------------------
function toggleTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed;
    }
    saveTasks();
    refreshUI();
}
// ------------------------------
// Delete task
// ------------------------------
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    refreshUI();
}
// ------------------------------
// Update statistics
// ------------------------------
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.filter((task) => !task.completed).length;
    totalTasks.textContent =
        total.toString();
    completedTasks.textContent =
        completed.toString();
    pendingTasks.textContent =
        pending.toString();
}
// ------------------------------
// Refresh UI
// ------------------------------
function refreshUI() {
    displayTasks();
    updateStats();
}
// ------------------------------
// Filter buttons
// ------------------------------
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    refreshUI();
});
pendingBtn.addEventListener("click", () => {
    currentFilter = "pending";
    refreshUI();
});
completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    refreshUI();
});
// ------------------------------
// Add task button
// ------------------------------
addTaskBtn.addEventListener("click", addTask);
// ------------------------------
// Add Theme button
// ------------------------------
themeBtn.addEventListener("click", toggleTheme);
// ------------------------------
// Press Enter to add task
// ------------------------------
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
// ------------------------------
// Initial display
// ------------------------------
loadTheme();
refreshUI();
