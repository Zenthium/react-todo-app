import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const TodoList = project => {
  const { getCurrentToggledProject } = useContext(AppContext);
  const currentProject = getCurrentToggledProject();
  return <h1>{currentProject}</h1>;
};

export default TodoList;
