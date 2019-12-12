import React, { useContext } from "react";
import "./SideDrawer.css";
import { EuiPanel, EuiButtonToggle, EuiButton } from "@elastic/eui";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { AppContext } from "../contexts/AppContext";

const SideDrawer = () => {
  const { projects, changeProjectStatus } = useContext(AppContext);
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
