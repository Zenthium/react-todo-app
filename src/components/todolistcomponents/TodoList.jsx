import React, { useContext, useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  Button,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";

const TodoList = () => {
  const {
    getCurrentToggledProject,
    toggleTodoCompletion,
    formatTodoDates
  } = useContext(AppContext);
  const [formShowing, setFormShowing] = useState(false);
  formatTodoDates();
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
  const onNewTodoButtonClick = e => {
    e.preventDefault();
    setFormShowing(true);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    alert("Form submitted.");
    setFormShowing(false);
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
      <div className="newTodoDiv">
        <Button
          onClick={onNewTodoButtonClick}
          variant="outlined"
          style={{ marginTop: `${1}%`, marginBottom: `${1}%` }}
        >
          Add New Todo
        </Button>
        {formShowing && (
          <FormControl>
            <form onSubmit={handleFormSubmit} className="newTodoForm">
              <TextField
                variant="standard"
                label="Todo Name"
                style={{ marginBottom: `${1}%` }}
                required
              />
              <Button type="submit" variant="outlined">
                Create New Todo
              </Button>
            </form>
          </FormControl>
        )}
      </div>
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
