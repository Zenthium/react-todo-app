import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = { 
    drawerShowing: false,
    projects: [
      {
        name: "Default Project",
        toggled: true,
        todos: [
          {
            name: "Default Todo",
            dueDate: "12-11-2019",
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
            name: "Default Todo",
            dueDate: "12-11-2019",
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
  render() { 
    return ( 
      <AppContext.Provider value={{...this.state, addNewProject: this.addNewProject, changeProjectStatus:this.changeProjectStatus, getCurrentToggledProject:this.getCurrentToggledProject}}>
        {this.props.children}
      </AppContext.Provider>
     );
  }
}
 
export default AppContextProvider;