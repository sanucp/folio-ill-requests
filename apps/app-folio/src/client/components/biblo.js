import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormattedMessage } from "react-intl";

class Biblo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URLSearchParams(window.location.search),
      tit: "",
      aut: "",
      isbd: "",
      issn: "",
      doi: "",
      pubtype: "",
      uri: "",
      coment: "",
      respo: "",
    };
  }
  componentWillMount() {
    this.setState({
      tit: this.state.url.get("Title"),
      aut: this.state.url.get("author"),
      isbd: this.state.url.get("isbd"),
      issn: this.state.url.get("issn"),
      doi: this.state.url.get("doi"),
      pubtype: this.state.url.get("pubtype"),
      uri: this.state.url.get("uri"),
    });
  }

  myChangeHandle = (event) => {
    this.setState({ coment: event.target.value });
  };

  submitHandle = (event) => {
    event.preventDefault();
    const i = this.state.isbd;
    const u = sessionStorage.getItem("user");
    const us = JSON.parse(u);

    //console.log(i);
    //console.log(us);

    fetch("./api/request/" + i + "&" + us)
      .then((res) => res.json())
      .then((r) => this.setState({ respo: r.re }))
      .then(() => console.log(this.state.respo));
  };

  render() {
    return (
      <Container>
        <Card border="dark">
          <Card.Header as="h5">
            <FormattedMessage
              id="bib.header"
              defaultMessage="Datos bibliograficos"
            />
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={this.submitHandle}>
                <Form.Group>
                  <Form.Label>
                    <FormattedMessage id="bib.tittle" defaultMessage="Titulo" />
                    :
                  </Form.Label>
                  <Form.Control defaultValue={this.state.tit}></Form.Control>
                  <Form.Label>
                    <FormattedMessage id="bib.aut" defaultMessage="Autor" />:{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.aut}></Form.Control>
                  <Form.Label>ISBN: </Form.Label>
                  <Form.Control defaultValue={this.state.isbd}></Form.Control>
                  <Form.Label>ISSN: </Form.Label>
                  <Form.Control defaultValue={this.state.issn}></Form.Control>
                  <Form.Label>DOI: </Form.Label>
                  <Form.Control defaultValue={this.state.doi}></Form.Control>
                  <Form.Label>
                    <FormattedMessage
                      id="bib.pub"
                      defaultMessage="Tipo de Publicación"
                    />
                    :{" "}
                  </Form.Label>
                  <Form.Control
                    defaultValue={this.state.pubtype}
                  ></Form.Control>
                  <Form.Label>URL: </Form.Label>
                  <Form.Control defaultValue={this.state.uri}></Form.Control>
                  <Form.Label>
                    <FormattedMessage
                      id="bib.comments"
                      defaultMessage="Comentario"
                    />
                    :{" "}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    onChange={this.myChangeHandle}
                  />
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="mt-2"
                    type="submit"
                    block
                  >
                    Enviar
                  </Button>
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Biblo;
