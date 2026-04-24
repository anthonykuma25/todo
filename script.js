// get saved todos or empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let input = document.getElementById("input");
let list = document.getElementById("list");

// show todos when page loads
showTodos();

function addTodo() {
  let value = input.value;

  // prevent empty input
  if (value === "") {
    alert("Enter something");
    return;
  }

  // prevent duplicates
  if (todos.includes(value)) {
    alert("Already exists");
    return;
  }

  todos.push(value);
  saveTodos();
  showTodos();

  input.value = "";
}

function showTodos() {
  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {

    let li = document.createElement("li");
    li.innerText = todos[i];

    // mark as done
    li.onclick = function () {
      li.style.textDecoration = "line-through";
    };

    // delete button
    let btn = document.createElement("button");
    btn.innerText = "X";

    btn.onclick = function () {
      removeTodo(i);
    };

    li.appendChild(btn);
    list.appendChild(li);
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  showTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
