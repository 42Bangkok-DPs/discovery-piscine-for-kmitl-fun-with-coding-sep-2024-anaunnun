document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('new-todo');

    loadTasks();

    newButton.addEventListener('click', () => {
        const taskText = prompt('กรุณาใส่งานใหม่:');
        if (taskText && taskText.trim() !== '') {
            addTask(taskText);
        }
    });

    function addTask(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'todo-item';
        taskElement.textContent = text;
        taskElement.addEventListener('click', () => {
            const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้?');
            if (confirmDelete) {
                taskElement.remove();
                saveTasks();
            }
        });
        listContainer.insertBefore(taskElement, listContainer.firstChild);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(listContainer.children).map(child => child.textContent);
        document.cookie = `tasks=${JSON.stringify(tasks)};path=/`;
    }


    function loadTasks() {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('tasks='));
        if (cookies) {
            const tasks = JSON.parse(cookies.split('=')[1]);
            tasks.forEach(task => addTask(task));
        }
    }
});