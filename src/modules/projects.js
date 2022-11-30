export const Project = (name) => {
    const projectTasks = [];
    return {name, projectTasks};
}


export const projectStorage = (() => {

    const allProjects = [];
    let projectNamesList = []

    const addProject = project => {
        allProjects.push(project);
    }

    const projectNames = () => {
        projectNamesList = [];
        for (let f = 0; f < allProjects.length; f++) {
            projectNamesList.push(allProjects[f].name);
        }
        return projectNamesList;
    }

    const removeProject = project => {
        allProjects.splice(allProjects.indexOf(project, 1));
    }

    const addTaskToProject = (task, project) => {
        project.projectTasks.push(task);
    }

    const removeTaskFromProject = (task, project) => {
        project.projectTasks.splice(projectTasks.indexOf(task, 1));
    }

    return {addProject, removeProject, addTaskToProject, removeTaskFromProject, projectNames, allProjects};

})();