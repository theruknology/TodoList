import { Task, taskStorage } from "./task.js";
import { Project, projectStorage } from "./projects.js";

export default class UI {

    static loadHTML() {
        this.loadFromLocalStorage();
        this.loadInitialButtons();
        this.loadProjectMenu();
        this.updateTaskContainer(taskStorage.allTasks);
        this.loadNewTask();
    }

    static loadFromLocalStorage() {
        
        if (localStorage.getItem('tasks') != null) {
            taskStorage.updateTasksFromStorage();
        }
    }

    static loadInitialButtons() {

        const newTaskForm = document.querySelector('.new-task-input')
        const newTaskToggle = document.querySelector('.new-task-button');

        newTaskToggle.addEventListener('click', () => {
            newTaskForm.style.display = 'grid';
        })

        const newProjectToggle = document.querySelector('.add-project');
        const newProjectForm = document.querySelector('.add-project-input');

        newProjectToggle.addEventListener('click', () => {
            newProjectForm.style.display = 'flex';
        })

        this.loadNewProject();

        const selectProjectToggle = document.querySelector('.select-project-button');
        const projectDropDown = document.querySelector('.project-dropdown');
        selectProjectToggle.addEventListener('click', () => {
            projectDropDown.style.display = 'block';
        })

    }


    static loadProjectMenu () {

        document.querySelector('.project-menu').innerHTML = '';

        for (let p = 0; p < projectStorage.allProjects.length; p++) {
            projectStorage.allProjects[p].domElement = document.createElement('p');
            projectStorage.allProjects[p].domElement.classList.add('project-name');
            projectStorage.allProjects[p].domElement.innerHTML = projectStorage.allProjects[p].name;

            document.querySelector('.project-menu').appendChild(projectStorage.allProjects[p].domElement);
            console.log('project added');
            console.log(projectStorage.allProjects[p].domElement)
            console.log(document.querySelector('.project-menu').innerHTML);
            
            projectStorage.allProjects[p].domElement.addEventListener('click', () => {
                this.updateTaskContainer(projectStorage.allProjects[p])
                return false;
            })
        }

    }

    static updateTaskContainer (list) {

        document.querySelector('.all-tasks').innerHTML = '';

        for (let n = 0; n < list.length; n++) {

            document.querySelector('.all-tasks').appendChild(list[n].domElement);     

        }

    } 

    static loadNewProject() {

        const addProjectButton = document.querySelector('.add-project-button');

        addProjectButton.addEventListener('click', () => {

            if (document.querySelector('#project-title-input').value == '') {
                alert('Please enter project name')
            } else {
                
                if (projectStorage.projectNames().includes(document.querySelector('#project-title-input').value)) {
                    alert('Project alread exists.');
                    console.log('alreadyexists');
                } else {
                    projectStorage.addProject(Project(document.querySelector('#project-title-input').value));
                    this.loadProjectMenu();
                    console.log('new project added!');
                    console.log(document.querySelector('#project-title-input').value)
                }
                
            }

        })

    }

    static loadNewTask() {

        
        const addTaskButton = document.querySelector('.add-task-button');

        addTaskButton.addEventListener('click', () => {

            let givenTitle = document.querySelector('#task-title-input').value;
            let givenDate = document.querySelector('#task-date-input').value;
            let givenProject = document.querySelector('.selected-project').innerHTML;

            if (givenTitle == '' || givenDate == '') {
                alert('Please enter all details to add a task!')
            } else {

                let selectedProject;
                if (givenProject == 'Select Project') {
                    selectedProject = '';
                    console.log('setting basic');
                }
                for (let z = 0; z < projectStorage.allProjects.length; z++) {
                    if (givenProject == projectStorage.allProjects[z].name) {
                        selectedProject = projectStorage.allProjects[z];
                    }
                }
                taskStorage.addTask(Task(givenTitle, givenDate, selectedProject));
                taskStorage.allTasks
                taskStorage.updateProjectStorage();
                this.updateTaskContainer(taskStorage.allTasks);
            }
            
            return false;


        })

    }

}
