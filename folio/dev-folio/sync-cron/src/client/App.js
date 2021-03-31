import React, { Component } from "react";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navi from "./components/navbar";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navi />
      </div>
    );
  }
}
