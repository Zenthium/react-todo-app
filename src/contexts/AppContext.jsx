import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = { 
    projects: [
      {
        name: "Default Project",
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
      <AppContext.Provider value={{...this.state, addNewProject: this.addNewProject}}>
        {this.props.children}
      </AppContext.Provider>
     );
  }
}
 
export default AppContextProvider;