import React, { useContext } from "react";
import { Typography, Box } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";

const TodoList = project => {
  const { getCurrentToggledProject } = useContext(AppContext);
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
                paddingTop: `${2}%`,
                paddingBottom: `${2}%`
              }}
            >
              <Typography variant="body1">{todo.name}</Typography>
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
