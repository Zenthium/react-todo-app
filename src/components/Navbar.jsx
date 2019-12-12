import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <AppBar position="static" id="Appbar">
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            style={{ padding: `${0}px ${10}px` }}
          >
            Todoer v2
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
