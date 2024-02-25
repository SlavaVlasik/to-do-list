// Функция для добавления задачи
function addTask() {
    const input = document.getElementById('input');
    const taskText = input.value.trim();
    if (taskText.length > 0 && taskText.length < 24) {
        addTaskToList(taskText);
         // Сохраняем задачу в локальное хранилище при добавлении
    } else {
        alert('Ваша задача либо слишком длинная, либо слишком короткая');
    }
}

// Функция для добавления задачи в список (без сохранения в локальное хранилище)
function addTaskToList(taskText) {
    const ul = document.getElementById('list');

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    const upButton = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        if (checkbox.checked) {
            li.classList.add('checked');
        } else {
            li.classList.remove('checked');
        }
    };

    deleteButton.textContent = '❌';
    deleteButton.onclick = function() {
        ul.removeChild(li);
    };

    upButton.textContent = '↑';
    upButton.onclick = function() {
        ul.insertBefore(li, li.previousSibling);
    };

    li.textContent = taskText;
    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    li.appendChild(upButton);
    ul.appendChild(li);
}

// Функция для сохранения задач в локальное хранилище
function saveTasks() {
    const tasks = [];
    const ul = document.getElementById('list');
    ul.querySelectorAll('li').forEach(function(li) {
        tasks.push(li.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из локального хранилища при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(taskText) {
        addTaskToList(taskText);
    });
});

// Функция для сохранения задач в локальное хранилище при нажатии кнопки "Сохранить"
function saveTasksLocally() {
    saveTasks();
    alert('Список задач сохранен в локальное хранилище!');
}
