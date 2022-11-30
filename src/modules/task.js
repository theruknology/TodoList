import { Project, projectStorage } from './projects.js';

export const Task = (title, dueDate, project) => {
    const basic = Project('basic');
    projectStorage.addProject(basic);
    if (project == '') {
        project = basic;
    }
    let domElement;
    let doneButton;
    return {title, dueDate, project, domElement, doneButton };
}

export const createTaskDOM = task => {
    task.domElement = document.createElement('div');
    task.domElement.classList.add('task-container');
    task.doneButton = document.createElement('div');
    task.domElement.appendChild(task.doneButton);
    task.domElement.innerHTML += 
    `<div class="task-info">
    <p>${task.title}</p>
    <p class="task-date">${task.dueDate}</p>
    </div>`

    task.doneButton.addEventListener('click', () => {
        taskStorage.deleteTask(task);
        taskStorage.updateProjectStorage();
    })
}

export const taskStorage = (() => {

    const allTasks = [];

    const addTask = task => {
        allTasks.push(task);
        createTaskDOM(task);
        updateStorage();
    }
    
    const deleteTask = task => {
        allTasks.splice(allTasks.indexOf(task, 1));
        updateStorage();
    }

    const updateTasksFromStorage = () => {
        let storageItems = JSON.parse(localStorage.getItem('tasks')).list;
        for (let x = 0; x < storageItems.length; x++) {
            allTasks[x] = storageItems[x];
        }
    }

    const updateStorage = () => {
        localStorage.clear();
        let updatedList = allTasks.map((x) => x);
        localStorage.setItem('tasks', JSON.stringify({list:updatedList}))
    }

    const updateProjectStorage = () => {
        for (let i = 0; i < allTasks.length; i++) {
            for (let y = 0; y < projectStorage.allProjects.length; y++) {
                if (allTasks[i].project.name == projectStorage.allProjects[y].name) {
                    projectStorage.addTaskToProject(allTasks[i], projectStorage.allProjects[y]);
                }
            }
        }
    }

    return {addTask, deleteTask, updateStorage, updateTasksFromStorage, updateProjectStorage, allTasks};

})();