import React, { PureComponent } from "react";
import './App.css';
import Header from "../components/header/header"
import Main from "../components/main/main"

export default class App extends PureComponent {
 

  render() {
    return (
      <div className="wrapper flexColumnCenter">
        <Header />
        <Main />
      </div>
    );
  }
}