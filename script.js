     let todos = JSON.parse(localStorage.getItem('my_unique_todos')) || [];

    const inputEl = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const listEl = document.getElementById('todo-list');
    const errorBox = document.getElementById('error-box');

    
    function saveAndRender() {
       
        localStorage.setItem('my_unique_todos', JSON.stringify(todos));
        render();
    }

function greeter (Name){
    console.log('Hello' + Name)
};

    function addItem() {
        const text = inputEl.value.trim();
        
        // Prevent empty items
        if (!text) return;

        // Requirement: Prevent duplicates (Case-insensitive check)
        const isDuplicate = todos.some(item => 
            item.text.toLowerCase() === text.toLowerCase()
        );

        if (isDuplicate) {
            errorBox.style.display = 'block';
            return;
        }

        errorBox.style.display = 'none';
        
        const newTodo = {
            id: Date.now(), // Unique ID
            text: text,
            done: false
        };

        todos.push(newTodo);
        inputEl.value = '';
        saveAndRender();
    }

    function toggleDone(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        saveAndRender();
    }

    function deleteItem(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }

    
    function render() {
        listEl.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            
            li.innerHTML = `
                <span class="todo-text ${todo.done ? 'done' : ''}" 
                      onclick="toggleDone(${todo.id})">
                    ${escapeHTML(todo.text)}
                </span>
                <div class="actions">
                    <button class="btn-action complete-btn" onclick="toggleDone(${todo.id})">
                        ${todo.done ? 'Undo' : 'Done'}
                    </button>
                    <button class="btn-action delete-btn" onclick="deleteItem(${todo.id})">
                        Delete
                    </button>
                </div>
            `;
            listEl.appendChild(li);
        });
    }
    // Helper to prevent XSS (Always escape user input)
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    
    addBtn.addEventListener('click', addItem);

    // Support "Enter" key
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });

    // Hide error while typing
    inputEl.addEventListener('input', () => {
        errorBox.style.display = 'none';
    });
    render();
