import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MyNav = function () {
  useEffect(() => {
    const navbar = document.getElementById("navbar");

    const scroll = () => {
      const scrollPos = window.scrollX || document.documentElement.scrollTop;
      if (scrollPos > 0) {
        navbar.style.opacity = 0.9;
      } else {
        navbar.style.opacity = 1;
      }
    };

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <div className="div-nav">
      <Navbar collapseOnSelect expand="lg" id="navbar" className="bg-body-tertiary fix-nav">
        <Container>
          <Link to="/" className="navbar-brand">
            I&M
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
              <Link className="nav-link" to="/create">
                Aggiungi
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNav;
