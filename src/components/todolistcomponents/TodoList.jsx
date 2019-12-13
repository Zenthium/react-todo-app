import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";

const TodoList = project => {
  const { getCurrentToggledProject } = useContext(AppContext);
  // const currentProject = getCurrentToggledProject();
  // return <h1>{getCurrentToggledProject().name}</h1>;
  return (
    <Typography variant="h3" style={{ marginTop: `${2}%` }}>
      {getCurrentToggledProject().name}
    </Typography>
  );
};

export default TodoList;
