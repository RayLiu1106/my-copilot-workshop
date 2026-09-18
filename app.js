const STORAGE_KEY = "offline-todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
const filterStorageKey = "offline-todo-filter";
let currentFilter = loadFilter();
const themeStorageKey = "offline-todo-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const isDark = savedTheme ? savedTheme === "dark" : systemTheme.matches;
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
}

function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadFilter() {
  const savedFilter = localStorage.getItem(filterStorageKey);
  return ["all", "active", "completed"].includes(savedFilter) ? savedFilter : "all";
}

function updateFilterButtons() {
  filterButtons.forEach((filterButton) => {
    const isActive = filterButton.dataset.filter === currentFilter;
    filterButton.classList.toggle("active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
}

function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function renderTodos() {
  const visibleTodos = getVisibleTodos();
  todoList.replaceChildren();

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦事項：${todo.text}`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦事項：${todo.text}`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  if (todos.length === 0) {
    emptyState.textContent = "還沒有任何待辦事項，新增一個吧!";
  } else if (visibleTodos.length === 0) {
    emptyState.textContent = currentFilter === "active"
      ? "太棒了，目前沒有未完成事項!"
      : "目前沒有已完成的事項，項目仍保留在清單中。";
  }
  emptyState.hidden = visibleTodos.length > 0;
  remainingCount.textContent = `未完成:${todos.filter((todo) => !todo.completed).length} 項`;
}

function addTodo(text) {
  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  addTodo(text);
  todoForm.reset();
  todoInput.focus();
});

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  localStorage.setItem(themeStorageKey, isDark ? "light" : "dark");
  applyTheme();
});

systemTheme.addEventListener("change", () => {
  if (!localStorage.getItem(themeStorageKey)) {
    applyTheme();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    localStorage.setItem(filterStorageKey, currentFilter);
    updateFilterButtons();
    renderTodos();
  });
});

applyTheme();
updateFilterButtons();
renderTodos();
