import React, { Component } from "react";
import './Header.css';
import { Navbar, Nav } from "react-bootstrap";

export default class Header extends Component {

  render() {
    let that = this;

    return (
      <div className="outbox">
        <Navbar>
          <Nav className="nav-container" style={{ width: "100%" }}>
            <span>Employee Registration</span>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
