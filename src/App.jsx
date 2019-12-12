import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <header>
          <Navbar />
        </header>
      </AppContextProvider>
    </div>
  );
}

export default App;
