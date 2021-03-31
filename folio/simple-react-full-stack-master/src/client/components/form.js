import React, { Component } from "react";

class Form extends Component {
  state = { usr: "" };

  mySubmitHandler = (event) => {
    event.preventDefault();
    fetch("/api/test").then(console.log("yay"));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
          <input />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
