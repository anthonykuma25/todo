var todos = JSON.parse(localStorage.getItem('my_unique_todos')) || [];

var input = document.getElementById('todo-input');
var addBtn = document.getElementById('add-btn');
var list = document.getElementById('todo-list');
var errorBox = document.getElementById('error-box');

function save() {
  localStorage.setItem('my_unique_todos', JSON.stringify(todos));
  render();
}
function addTodo() {
  var text = input.value.trim();
  if (!text) return;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text.toLowerCase() === text.toLowerCase()) {
      errorBox.style.display = 'block';
      return;
    }
  }
  errorBox.style.display = 'none';
  todos.push({ id: Date.now(), text: text, done: false });
  input.value = '';
  save();
}
function toggleDone(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = !todos[i].done;
      break;
    }
  }
  save();
}
function deleteTodo(id) {
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });
  save();
}
function render() {
  list.innerHTML = '';
  for (var i = 0; i < todos.length; i++) {
    var t = todos[i];
    var li = document.createElement('li');

    li.innerHTML =
      '<span class="todo-text ' + (t.done ? 'done' : '') + '">' + t.text + '</span>' +
      '<button onclick="toggleDone(' + t.id + ')">' + (t.done ? 'Undo' : 'Done') + '</button>' +
      '<button onclick="deleteTodo(' + t.id + ')">Delete</button>';

    list.appendChild(li);
  }
}
addBtn.onclick = addTodo;
input.onkeypress = function(e) {
  if (e.key === 'Enter') addTodo();
};
input.oninput = function() {
  errorBox.style.display = 'none';
};
render();
