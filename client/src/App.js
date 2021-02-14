import React from "react";
import Header from "./components/Header";
import NewUrl from "./components/NewUrl";
import Links from "./components/Links";
import UrlState from "./context/Urlstate";
import "./App.css";

const App = () => {
  return (
    <UrlState>
      <div className="App">
        <Header />
        <NewUrl />
        <Links />
      </div>
    </UrlState>
  );
};

export default App;
