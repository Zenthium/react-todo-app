import React, { Component, createContext } from 'react';
import { format } from 'date-fns';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = { 
    formatted: false,
    drawerShowing: false,
    projects: [
      {
        name: "Default Project",
        toggled: true,
        todos: [
          {
            name: "Default Todo",
            dueDate: "12/11/2019",
            priority: 1,
            completed: true
          },
          {
            name: "Default Todo Two",
            dueDate: "12/11/2019",
            priority: 1,
            completed: false
          }
        ]
      },
      {
        name: "Default Project Two",
        toggled: false,
        todos: [
          {
            name: "Default Todo Two",
            dueDate: "12/11/2019",
            priority: 1,
            completed: false
          }
        ]
      }
    ]
  }

  changeProjectStatus = project => {
    const currentProjects = [...this.state.projects];
    for (let i = 0; i < currentProjects.length; i++){
      if (currentProjects[i].toggled && currentProjects[i] !== project){
        currentProjects[i].toggled = false;
      }
    }
    const projectIndex = currentProjects.indexOf(project);
    if (!currentProjects[projectIndex].toggled){
      currentProjects[projectIndex].toggled = !currentProjects[projectIndex].toggled;
    }
    this.setState({
      projects: currentProjects
    })
  }

  formatTodoDates = () => {
    const currentProjects = [...this.state.projects];
    const project = this.getCurrentToggledProject();
    const currentProjectIndex = currentProjects.indexOf(project);
    let selectedProject = currentProjects[currentProjectIndex];
    let todoArray = [...selectedProject.todos];
    todoArray.forEach(todo => {
      let todoDateArray = todo.dueDate.split("/");
      todo.comparisonDate = format(new Date(todoDateArray[2], todoDateArray[0] - 1, todoDateArray[1]), 'yyyy-MM-dd');
    });
    todoArray.sort(function(value1, value2){
      if (value1.comparisonDate < value2.comparisonDate) return -1;
      if (value1.comparisonDate > value2.comparisonDate) return 1;

      if (parseInt(value1.priority) < parseInt(value2.priority)) return -1;
      if (parseInt(value1.priority) > parseInt(value2.priority)) return 1;
    })
    if (!this.state.formatted){
      selectedProject.todos = todoArray;
      currentProjects[currentProjectIndex] = selectedProject;
      this.toggleFormatted();
      this.setState({
        projects: currentProjects
      })
    }
  }

  toggleFormatted = () => {
    this.setState(prevState => {
      return {formatted: !prevState.formatted}
    })
  }

  handleDrawerChange = () => {
    this.setState(prevState => {
      return {drawerShowing: !prevState.drawerShowing}
    })
  }

  getCurrentToggledProject = () => {
    for (let i = 0; i < this.state.projects.length; i++){
      if (this.state.projects[i].toggled){
        return this.state.projects[i]
      }
    }
  }

  addNewProject = projectName => {
    const newProject = {name: projectName, todos: []}
    this.setState(prevState => {
      return ({
        projects: {...prevState.projects, newProject}
      })
    })
  }

  toggleTodoCompletion = (project, todo) => {
    const currentProjects = [...this.state.projects]
    const selectedProjectIndex = currentProjects.indexOf(project);
    const selectedProject = currentProjects[selectedProjectIndex];
    const selectedTodoIndex = selectedProject.todos.indexOf(todo);
    selectedProject.todos[selectedTodoIndex].completed = !selectedProject.todos[selectedTodoIndex].completed;
    this.setState({
      projects: currentProjects
    })
  }
  render() { 
    return ( 
      <AppContext.Provider value={{...this.state, 
        addNewProject: this.addNewProject, 
        changeProjectStatus:this.changeProjectStatus, 
        getCurrentToggledProject:this.getCurrentToggledProject, 
        toggleTodoCompletion: this.toggleTodoCompletion,
        formatTodoDates: this.formatTodoDates,
        toggleFormatted: this.toggleFormatted}}
      >
        {this.props.children}
      </AppContext.Provider>
     );
  }
}
 
export default AppContextProvider;