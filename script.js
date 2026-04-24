var todos = [];

function add() {
    var input = document.getElementById("input").value.trim();

    if (input === "") {
        alert("Enter something");
        return;
    }

    if (todos.includes(input)) {
        alert("This task already exists!");
        return;
    }

    todos.push(input);
    document.getElementById("input").value = "";
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
