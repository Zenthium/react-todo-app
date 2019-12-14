import React, { useContext } from "react";
import { Typography, Box, Checkbox } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";

const TodoList = project => {
  const { getCurrentToggledProject, toggleTodoCompletion } = useContext(
    AppContext
  );

  const formatTodoIfCompleted = (todo, part) => {
    if (todo.completed) {
      if (part === "header") {
        return <strike>{todo.name}</strike>;
      }
      return <strike>{todo.dueDate}</strike>;
    }
    if (part === "header") {
      return todo.name;
    }
    return todo.dueDate;
  };
  // const currentProject = getCurrentToggledProject();
  // return <h1>{getCurrentToggledProject().name}</h1>;
  return (
    <div>
      <Typography
        variant="h3"
        style={{
          paddingTop: `${2}%`,
          paddingBottom: `${2}%`,
          backgroundColor: `rgb(230, 230, 230)`
        }}
      >
        {getCurrentToggledProject().name}
      </Typography>
      <div>
        {getCurrentToggledProject().todos.map(todo => {
          return (
            <Box
              boxShadow={3}
              style={{
                margin: `${2}%`,
                paddingTop: `${1.5}%`,
                paddingBottom: `${1.5}%`
              }}
            >
              <div className="todoBoxes">
                <div className="todoCheckbox">
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => {
                      toggleTodoCompletion(getCurrentToggledProject(), todo);
                    }}
                  />
                </div>
                <div className="todoInfo">
                  <Typography variant="h6" fontWeight="fontWeightBold">
                    {formatTodoIfCompleted(todo, "header")}
                  </Typography>
                  <Typography variant="subtitle1" align="left">
                    {formatTodoIfCompleted(todo, "info")}
                  </Typography>
                </div>
              </div>
            </Box>
          );
        })}
      </div>
    </div>

    // {getCurrentToggledProject().todos.map(todo => {
    //   return (
    //     <Box shadow>
    //       <Typography variant="body1">{todo.name}</Typography>
    //     </Box>
    //   );
    // })}
  );
};

export default TodoList;
