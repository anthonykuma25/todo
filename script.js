var todos = [];

function add() {
    var input = document.getElementById("input").value;

    if(input == "") {
        alert("enter something");
    } else {
        todos.push(input);
        document.getElementById("input").value = "";
        show();
    }
}

function show() {
    var list = document.getElementById("list");
    list.innerHTML = "";

    for(var i = 0; i < todos.length; i++) {
        list.innerHTML += "<li>" + todos[i] + 
        " <button onclick='remove(" + i + ")'>x</button></li>";
    }
}

function remove(i) {
    todos.splice(i, 1);
    show();
}
