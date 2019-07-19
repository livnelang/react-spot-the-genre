import React, { PureComponent } from "react";
import './header.css';


export default class Header extends PureComponent {

  render() {
    return (
      <div className="topPanel flexColumnCenter">
        <h1>Spot the genre!</h1>
        <p>   Welcome aboard! try to guess which genre this artist is playing!    </p>
      </div>
    );
  }

}