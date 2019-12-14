import React, { useContext, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  Typography,
  Box,
  Checkbox,
  Button,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AppContext } from "../../contexts/AppContext";
import "./TodoList.css";
import { format } from "date-fns";

const TodoList = () => {
  const {
    getCurrentToggledProject,
    toggleTodoCompletion,
    formatTodoDates,
    addNewTodo,
    toggleFormatted
  } = useContext(AppContext);
  const [formShowing, setFormShowing] = useState(false);
  const [formTodoName, setFormTodoName] = useState("");
  const [formTodoPriority, setFormTodoPriority] = useState(0);
  const [todoDate, setTodoDate] = useState(new Date());

  // format todos on load
  formatTodoDates();

  // strikethrough if completed
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

  // handles clicking new todo button
  const onNewTodoButtonClick = e => {
    e.preventDefault();
    setFormShowing(true);
  };

  // handles todo name change
  const handleTodoNameChange = e => {
    setFormTodoName(e.target.value);
  };

  // handles todo priority change
  const handleTodoPriorityChange = e => {
    setFormTodoPriority(e.target.value);
  };

  // handles form submission
  const handleFormSubmit = e => {
    e.preventDefault();
    const formattedDate = format(todoDate, "MM/dd/yyyy");
    toggleFormatted();
    addNewTodo(
      getCurrentToggledProject(),
      formTodoName,
      formattedDate,
      formTodoPriority
    );
    setFormTodoPriority(0);
    setFormTodoName("");
    setTodoDate(new Date());
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
                value={formTodoName}
                onChange={handleTodoNameChange}
                required
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  value={todoDate}
                  onChange={setTodoDate}
                  style={{ marginBottom: `${1}%` }}
                  format="MM/dd/yyyy"
                  label="Due Date (mm/dd/yyyy)"
                  showTodayButton
                />
              </MuiPickersUtilsProvider>
              <TextField
                variant="standard"
                label="Priority"
                style={{ marginBottom: `${1}%` }}
                type="number"
                value={formTodoPriority}
                onChange={handleTodoPriorityChange}
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
