import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";

export default function Cform() {
  return (
    <div>
      <Container>
        <Card border="dark">
          <Card.Header as="h5">Create a config file</Card.Header>
          <Card.body>
            <Card.text>
              <Form>
                <Form.Group>
                  <Form.Label>Id:</Form.Label>
                  <Form.Control></Form.Control>
                  <Form.Label>Folio URL:</Form.Label>
                  <Form.Control></Form.Control>
                  <Form.Label>Tenant ID:</Form.Label>
                  <Form.Control></Form.Control>
                  <Form.Label>Folio admin User:</Form.Label>
                  <Form.Control></Form.Control>
                  <Form.Label>Folio admin Pass:</Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
              </Form>
            </Card.text>
          </Card.body>
        </Card>
      </Container>
    </div>
  );
}
