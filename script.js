let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
    let input = document.getElementById("input");
    let value = input.value.trim();

    if (value === "") {
        alert("Enter something");
        return;
    }
    if (todos.includes(value)) {
        alert("Already exists");
        return;
    }

    todos.push(value);
    input.value = "";

    saveData();
    showTodos();
}
function showTodos() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        list.innerHTML += `
            <li>
                <span onclick="markDone(this)">${todos[i]}</span>
                <button onclick="deleteTodo(${i})">X</button>
            </li>
        `;
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveData();
    showTodos();
}
function markDone(element) {
    element.style.textDecoration = "line-through";
}
function saveData() {
    localStorage.setItem("todos", JSON.stringify(todos));
}  showTodos();
document.getElementById("input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTodo();
    }
});
