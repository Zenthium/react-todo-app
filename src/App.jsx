import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AppContextProvider, { AppContext } from "./contexts/AppContext";
import SideDrawer from "./components/SideDrawer";
import TodoList from "./components/todolistcomponents/TodoList";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <SideDrawer />
        <div className="todoContent">
          <header>
            <Navbar />
          </header>
          {/* <div>
            <TodoList />
          </div> */}
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
