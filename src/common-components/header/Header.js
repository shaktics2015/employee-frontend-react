import React, { Component } from "react";
import './Header.css';
import { Navbar, Nav } from "react-bootstrap";

export default class Header extends Component {

  render() {
    let that = this;

    return (
      <div className="outbox">
        <Navbar expand="lg">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            Header
          </Nav>
        </Navbar>
      </div>
    );
  }
}
