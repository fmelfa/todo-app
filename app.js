(() => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const STORAGE_KEY = 'todos:v1';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function save(todos){ localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }

  function render(){
    const todos = load();
    list.innerHTML = '';
    todos.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const left = document.createElement('div');
      left.className = 'left';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'todo-checkbox';
      cb.checked = !!t.completed;
      cb.addEventListener('change', () => {
        const current = load();
        current[i].completed = cb.checked;
        save(current);
        render();
      });

      const p = document.createElement('p');
      p.className = 'todo-text';
      p.textContent = t.text;

      if (t.completed) li.classList.add('completed');

      const btn = document.createElement('button');
      btn.className = 'delete-btn';
      btn.textContent = 'Delete';
      btn.addEventListener('click', () => {
        const remaining = load().filter((_, idx) => idx !== i);
        save(remaining);
        render();
      });

      left.appendChild(cb);
      left.appendChild(p);
      li.appendChild(left);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const todos = load();
    todos.push({ text, completed: false });
    save(todos);
    input.value = '';
    render();
  });

  // initial render
  render();
})();
