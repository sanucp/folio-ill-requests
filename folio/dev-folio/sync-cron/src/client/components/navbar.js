import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default function Navi(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
      </Navbar>
    </div>
  );
}
