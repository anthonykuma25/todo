var todos = [];

function add() {
    var input = document.getElementById("input");
    var value = input.value.trim();

    if (value === "") {
        alert("Enter something");
        return;
    }

    // prevent duplicate (case-insensitive)
    var lowerValue = value.toLowerCase();

    for (var i = 0; i < todos.length; i++) {
        if (todos[i].toLowerCase() === lowerValue) {
            alert("This task already exists!");
            return;
        }
    }

    todos.push(value);
    input.value = "";
    show();
}

function show() {
    var list = document.getElementById("list");
    list.innerHTML = "";

    for (var i = 0; i < todos.length; i++) {
        list.innerHTML += `
            <li>
                ${todos[i]}
                <button onclick="remove(${i})">x</button>
            </li>
        `;
    }
}
function remove(i) {
    todos.splice(i, 1);
    show();
}
window.onload = function () {
    var inputBox = document.getElementById("input");

    inputBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            add();
        }
    });
};
