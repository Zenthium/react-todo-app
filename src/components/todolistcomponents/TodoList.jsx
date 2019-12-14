import React, { useContext } from "react";
import { Typography, Box, Checkbox } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";

const TodoList = () => {
  const { getCurrentToggledProject, toggleTodoCompletion } = useContext(
    AppContext
  );
  const formatTodoIfCompleted = (todo, part) => {
    if (todo.completed) {
      if (part === "header") {
        return <strike>{todo.name}</strike>;
      }
      if (part === "priority") {
        return (
          <strike>
            {"Priority: "}
            {todo.priority}
          </strike>
        );
      }
      return <strike>{todo.dueDate}</strike>;
    }
    if (part === "header") {
      return todo.name;
    }
    if (part === "priority") {
      return ` Priority: ${todo.priority}`;
    }
    return todo.dueDate;
  };
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
                  <Typography
                    variant="h6"
                    fontWeight="fontWeightBold"
                    align="left"
                  >
                    {formatTodoIfCompleted(todo, "header")}
                  </Typography>
                  <div className="todoDetails">
                    <Typography
                      variant="subtitle2"
                      align="left"
                      style={{ marginRight: `${1}%` }}
                    >
                      {formatTodoIfCompleted(todo, "info")}
                    </Typography>
                    <Typography variant="subtitle2" align="left">
                      {formatTodoIfCompleted(todo, "priority")}
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
