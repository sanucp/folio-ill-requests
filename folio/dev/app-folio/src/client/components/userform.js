import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Conteiner from "react-bootstrap/Container";
import { FormattedMessage } from "react-intl";
const queryString = require("query-string");

class UsrForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: "",
      pass: "",
      data: "",
    };
  }

  myChangeHandle = (event) => {
    this.setState({
      usr: event.target.value,
    });
  };

  mySetPassword = (event) => {
    this.setState({ pass: event.target.value });
    //console.log(this.state.pass);
  };

  submitHandle = (event) => {
    event.preventDefault();
    const usr = this.state.usr;
    const pass = this.state.pass;
    //console.log(userName);
    fetch("./api/getUser/" + usr + "&" + pass)
      .then((res) => res.json())
      .then((token) => this.setState({ data: token.info }))
      .then(() =>
        sessionStorage.setItem("user", JSON.stringify(this.state.data["id"]))
      );
  };

  async componentDidMount() {
    const params = queryString.parse(location.search);
    //console.log(params);
    if (params.cid) {
      const id = params.cid;
      sessionStorage.setItem("cid", id);
      //console.log(id);
      fetch("./api/id/" + id);
    }
  }

  render() {
    var apitkn = this.state.data.personal;

    return (
      <Conteiner className="mt-2">
        <Card border="dark">
          <Card.Header as="h5">
            <FormattedMessage
              id="app.header"
              defaultMessage="Datos del Usuario"
            />
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.submitHandle}>
              <Form.Group>
                <Form.Control
                  as="input"
                  type="text"
                  onChange={this.myChangeHandle}
                  placeholder="Usuario"
                />
                <Form.Control
                  as="input"
                  type="password"
                  onChange={this.mySetPassword}
                  placeholder="password"
                  className="mt-2"
                />
                <Button
                  type="submit"
                  variant="outline-success"
                  size="sm"
                  className="mt-2"
                  block
                >
                  <FormattedMessage id="app.button" defaultMessage="Ingreso" />
                </Button>
              </Form.Group>
            </Form>
            <Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FormattedMessage id="app.usr" defaultMessage="Usuario" />
                  <span>: {this.state.usr}</span>
                </ListGroup.Item>
                {apitkn ? (
                  <ListGroup.Item>
                    <FormattedMessage id="app.name" defaultMessage="Nombre" />:{" "}
                    {apitkn["firstName"]}
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <FormattedMessage id="app.name" defaultMessage="Nombre" />:
                    --
                  </ListGroup.Item>
                )}
                {apitkn ? (
                  <ListGroup.Item>
                    <FormattedMessage
                      id="app.lastname"
                      defaultMessage="Apellido"
                    />
                    : {apitkn["lastName"]}
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <FormattedMessage
                      id="app.lastname"
                      defaultMessage="Apellido"
                    />
                    : --
                  </ListGroup.Item>
                )}
                {apitkn ? (
                  <ListGroup.Item>
                    <FormattedMessage id="app.Email" defaultMessage="Email" />:{" "}
                    {apitkn["email"]}
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <FormattedMessage id="app.Email" defaultMessage="Email" />:
                    --
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </Conteiner>
    );
  }
}

export default UsrForm;
