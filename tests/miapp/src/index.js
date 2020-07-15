import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nombre: "" };
  }
  mySubmitHandler = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}`,
      headers: { "content-type": "application/json" },
      data: this.state
    });
  };
  myChangeHandler = event => {
    this.setState({ nombre: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.nombre}</h1>
        <p>Enter your name:</p>
        <input type="text" onChange={this.myChangeHandler} />
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById("root"));
