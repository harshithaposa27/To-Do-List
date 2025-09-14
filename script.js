const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText, false);
  saveTask(taskText, false);
  taskInput.value = '';
}

function createTaskElement(text, completed) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTaskStatus(text, li.classList.contains('completed'));
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(text);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function deleteTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const filteredTasks = tasks.filter(task => task.text !== text);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}