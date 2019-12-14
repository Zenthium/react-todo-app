import React, { useContext, useState } from "react";
import "./SideDrawer.css";
import { EuiPanel, EuiButtonToggle, EuiButton } from "@elastic/eui";
import Button from "@material-ui/core/Button";
import { Typography, FormControl, TextField } from "@material-ui/core";
import { AppContext } from "../contexts/AppContext";

const SideDrawer = () => {
  const { projects, changeProjectStatus, addNewProject } = useContext(
    AppContext
  );
  const [formShowing, setFormShowing] = useState(false);
  const [projectName, setProjectName] = useState("");
  const changeFormStatus = () => {
    setFormShowing(true);
  };
  const handleProjectNameChange = e => {
    setProjectName(e.target.value);
  };
  const handleNewProjectSubmission = () => {
    addNewProject(projectName);
    setProjectName("");
    setFormShowing(false);
  };
  return (
    <EuiPanel hasShadow>
      <div className="sidebar">
        <Typography
          variant="h4"
          style={{
            borderBottom: `${1}px solid rgb(50, 50, 50)`,
            marginBottom: `${10}px`,
            paddingTop: `${15}px`,
            paddingBottom: `${10}px`
          }}
        >
          Project List
          <br />
          {!formShowing ? (
            <Button variant="contained" onClick={changeFormStatus}>
              Add New Project
            </Button>
          ) : (
            <FormControl>
              <form
                onSubmit={handleNewProjectSubmission}
                className="newProjectForm"
              >
                <TextField
                  label="Project Name"
                  value={projectName}
                  onChange={handleProjectNameChange}
                  variant="filled"
                  style={{ color: "white", borderColor: "white" }}
                  required
                />
                <Button type="submit" variant="contained">
                  Create New Todo
                </Button>
              </form>
            </FormControl>
          )}
        </Typography>
        {projects.map(project => {
          return (
            <Button
              variant={project.toggled ? "contained" : "outlined"}
              onClick={() => {
                changeProjectStatus(project);
              }}
              color="primary"
              style={{ marginBottom: `${15}px` }}
            >
              {project.name}
            </Button>
          );
          // return (
          //   <EuiButton fill size="s">
          //     {project.name}
          //   </EuiButton>
          // );
        })}
      </div>
    </EuiPanel>
  );
};

export default SideDrawer;
