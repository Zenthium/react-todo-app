import React, { useContext } from "react";
import { Typography, Box, Checkbox } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";

const TodoList = project => {
  const { getCurrentToggledProject, toggleTodoCompletion } = useContext(
    AppContext
  );
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
                    value={todo.completed}
                    onChange={() => {
                      toggleTodoCompletion(getCurrentToggledProject(), todo);
                    }}
                  />
                </div>
                <div className="todoInfo">
                  <Typography variant="h6" fontWeight="fontWeightBold">
                    {todo.name}
                  </Typography>
                  <Typography variant="subtitle1">{todo.dueDate}</Typography>
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
