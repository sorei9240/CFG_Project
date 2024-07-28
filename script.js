"use strict";

/*
1. Get user input
2. Make changes to the HTML and CSS using JavaScript
3. Use an event to triger a change to a web page

BONUS:
1. Add HTML elements to a web page using DOM
2. Remove HTML elements from a web page using DOM
3. Research and use other DOM events such as onmouseover
4. Use arrays, loops and/or conditional logic in JavaScript
*/

const addButton = document.querySelector(".SubmitBtn");
const taskForm = document.getElementById("taskForm");
const userInput = document.getElementById("ToDoItem");
const taskList = document.getElementById("ToDoList");

let tasks = [];

function addTask(e) {
  e.preventDefault();

  const userInputValue = userInput.value.trim(); // Ensure that empty items are not added

  if (userInputValue) {
    tasks.push(userInputValue);
    renderTasks();
    userInput.value = "";

    // const li = document.createElement("li");
    // console.log(li);
    // const node = document.createTextNode(itemValue);
    // li.appendChild(node);
    // console.log(node);

    // const element = document.getElementById("ToDoList");
    // element.appendChild(li);
    // console.log(element);

    // document.getElementById("ToDoItem").value = "";
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.classList.add("task-item");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "btn-danger", "ms-2");
    removeButton.addEventListener("click", () => removeTask(index));

    li.appendChild(removeButton);
    taskList.appendChild(li);

    li.addEventListener("mouseover", () => {
      li.style.backgroundColor = "#f0f0f0";
    });
    li.addEventListener("mouseout", () => {
      li.style.backgroundColor = "";
    });
  });
}

taskForm.addEventListener("submit", addTask);
