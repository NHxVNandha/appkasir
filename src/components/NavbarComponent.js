import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="glass-nav" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="brand-title">
          <span className="brand-dot" />
          <strong>Kasir</strong> App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Kasir</Nav.Link>
            <Nav.Link href="/sukses">Riwayat</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
