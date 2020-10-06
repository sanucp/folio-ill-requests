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
      genre: "",
      tit: "",
      aut: "",
      isbn: "",
      issn: "",
      doi: "",
      date: "",
      uri: "",
      coment: "",
      respo: "",
      atit: "",
      volume: "",
      issue: "",
      spage: "",
      pages: "",
      genre: "",
    };
  }
  componentWillMount() {
    this.setState({
      tit: this.state.url.get("title"),
      atit: this.state.url.get("atitle"),
      aut: this.state.url.get("aulast"),
      isbn: this.state.url.get("ISBN"),
      issn: this.state.url.get("issn"),
      genre: this.state.url.get("genre"),
      volume: this.state.url.get("volume"),
      issue: this.state.url.get("issue"),
      spage: this.state.url.get("spage"),
      pages: this.state.url.get("pages"),
      doi: this.state.url.get("doi"),
      date: this.state.url.get("date"),
      uri: this.state.url.get("uri"),
    });
  }

  myChangeHandle = (event) => {
    this.setState({ coment: event.target.value });
  };

  submitHandle = (event) => {
    event.preventDefault();
    const i = this.state.isbn;
    const u = sessionStorage.getItem("user");
    const us = JSON.parse(u);
    const a = this.state.aut;
    const bib = this.state.atit;
    //const bib = JSON.stringify(biblos);
    //console.log(bib);
    //console.log(us);

    fetch("./api/request/" + i + "&" + a + "&" + us + "&" + bib)
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
                    <FormattedMessage
                      id="bib.genre"
                      defaultMessage="Tipo de publicacion"
                    />
                    :
                  </Form.Label>
                  <Form.Control defaultValue={this.state.genre}></Form.Control>
                  <Form.Label>
                    <FormattedMessage
                      id="bib.atittle"
                      defaultMessage="Titulo del articulo"
                    />
                    :
                  </Form.Label>
                  <Form.Control defaultValue={this.state.atit}></Form.Control>
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
                  <Form.Control defaultValue={this.state.isbn}></Form.Control>
                  <Form.Label>ISSN: </Form.Label>
                  <Form.Control defaultValue={this.state.issn}></Form.Control>
                  <Form.Label>DOI: </Form.Label>
                  <Form.Control defaultValue={this.state.doi}></Form.Control>
                  <Form.Label>
                    <FormattedMessage id="bib.date" defaultMessage="Fecha" />:{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.date}></Form.Control>
                  <Form.Label>
                    <FormattedMessage
                      id="bib.volume"
                      defaultMessage="Volumen"
                    />
                    :{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.volume}></Form.Control>
                  <Form.Label>
                    <FormattedMessage id="bib.issue" defaultMessage="Numero" />:{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.issue}></Form.Control>
                  <Form.Label>
                    <FormattedMessage
                      id="bib.spage"
                      defaultMessage="Pagina de inicio"
                    />
                    :{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.spage}></Form.Control>
                  <Form.Label>
                    <FormattedMessage id="bib.pages" defaultMessage="Paginas" />
                    :{" "}
                  </Form.Label>
                  <Form.Control defaultValue={this.state.pages}></Form.Control>
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
