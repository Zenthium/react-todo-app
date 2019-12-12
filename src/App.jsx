import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppContextProvider from "./contexts/AppContext";
import SideDrawer from "./components/SideDrawer";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <SideDrawer />
        <div className="todoContent">
          <header>
            <Navbar />
          </header>
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
