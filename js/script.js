//"use strict";

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions

//addTodo
function addTodo(event) {
  //Prevents form from submitting
  event.preventDefault();

  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");
  if (todoInput.value === "") {
    alert("You must add your task!");
  } else {
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // Append to child
    todoDiv.appendChild(newTodo);

    // Adding to local storage;
    savelocal(todoInput.value);

    // Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    // Append to child
    todoDiv.appendChild(checkButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    // Append to child
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    // Clear the input
    todoInput.value = "";
  }
}

function deleteCheck(event) {
  const item = event.target;
  // Delete
  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.contains("fall");

    //removing local todos;
    removeLocalTodos(item.parentElement);

    item.parentElement.remove();
  }

  // Check
  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

// Saving to local storage:
function savelocal(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // toDo DIV;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");

    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // check btn;
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    // delete btn;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);

    // Append to list;
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check: if item/s are there;
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  // console.log(todoIndex);
  todos.splice(todoIndex, 1);
  // console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}
