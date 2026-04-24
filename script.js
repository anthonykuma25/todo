   let todos = JSON.parse(localStorage.getItem('my_unique_todos')) || [];

    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const list = document.getElementById('todo-list');
    const errorBox = document.getElementById('error-box');

    function saveAndRender() {
      localStorage.setItem('my_unique_todos', JSON.stringify(todos));
      render();
    }
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
    function toggleDone(id) {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      saveAndRender();
    }
    function deleteTodo(id) {
      todos = todos.filter(todo => todo.id !== id);
      saveAndRender();
    }
    function render() {
      list.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="todo-text ${todo.done ? 'done' : ''}">
            ${todo.text}
          </span>
          <button class="complete-btn">${todo.done ? 'Undo' : 'Done'}</button>
          <button class="delete-btn">Delete</button>
        `;
        li.querySelector('.todo-text').onclick = () => toggleDone(todo.id);
        li.querySelector('.complete-btn').onclick = () => toggleDone(todo.id);
        li.querySelector('.delete-btn').onclick = () => deleteTodo(todo.id);
        list.appendChild(li);
      });
    }
    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') addTodo();
    });
    input.addEventListener('input', () => {
      errorBox.style.display = 'none';
    });

    render(); // Initial render
