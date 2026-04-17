    
    // Simple variables
    let todos = JSON.parse(localStorage.getItem('my_unique_todos')) || [];
    
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    const errorBox = document.getElementById('error-box');

    // Save to localStorage and re-render
    function saveAndRender() {
        localStorage.setItem('my_unique_todos', JSON.stringify(todos));
        render();
    }
    
    // Add new todo
    function addTodo() {
        const text = input.value.trim();
        if (!text) return;

        // Check for duplicate
        if (todos.some(todo => todo.text.toLowerCase() === text.toLowerCase())) {
            errorBox.style.display = 'block';
            return;
        }

        errorBox.style.display = 'none';

        todos.push({
            id: Date.now(),
            text: text,
            done: false
        });

        input.value = '';
        saveAndRender();
    }

    // Toggle done/undone
    function toggleDone(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        saveAndRender();
    }

    // Delete todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }

    // Render the list
    function render() {
        list.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');

            li.innerHTML = `
                <span class="todo-text ${todo.done ? 'done' : ''}">
                    ${todo.text}
                </span>
                <div class="actions">
                    <button class="complete-btn">${todo.done ? 'Undo' : 'Done'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            // Event listeners
            li.querySelector('.complete-btn').onclick = () => toggleDone(todo.id);
            li.querySelector('.delete-btn').onclick = () => deleteTodo(todo.id);
            li.querySelector('.todo-text').onclick = () => toggleDone(todo.id);

            list.appendChild(li);
        });
    }

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    input.addEventListener('input', () => {
        errorBox.style.display = 'none';
    });

    // Initial render
    render();
