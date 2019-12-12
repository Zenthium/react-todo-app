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
          variant="h3"
          style={{
            borderBottom: `${1}px solid rgb(50, 50, 50)`,
            marginBottom: `${20}px`
          }}
        >
          Project List
        </Typography>
        {projects.map(project => {
          return (
            <Button
              variant={project.toggled ? "contained" : ""}
              onClick={project => {
                changeProjectStatus(project);
              }}
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
      {/* <div className="sidebar">{projects.map(project => {
        return {<EuiButtonToggle label={project.name}>
        </EuiButtonToggle>}
      })}</div> */}
    </EuiPanel>
  );
};

export default SideDrawer;
