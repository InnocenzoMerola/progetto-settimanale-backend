import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import { Link } from "react-router-dom/dist";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../img/I&M-LOGO.jpg";
import Container from "react-bootstrap/esm/Container";

const Home = function () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?&_embed=1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella chiamata api");
        }
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.log("Errore", error));
  }, []);

  return (
    <>
      <Container fluid className="mb-4 my-cont">
        <div className="mx-3 top-div">
          <h1>Goditi la tua vacanza da sogno</h1>
          <h2>Scopri nuovi orizzonti</h2>
          <p>Ci impegniamo a offrire servizi di viaggio della massima qualità. </p>
        </div>

        <Row className="row-gap-3">
          {posts.map((post) => (
            <Col xs={12} md={3} key={post.id}>
              <Card className="h-card">
                <Card.Img
                  variant="top"
                  className="home-img"
                  src={post._embedded["wp:featuredmedia"] ? post._embedded["wp:featuredmedia"][0].source_url : logo}
                />
                <Card.Body>
                  <Card.Title>{post.title.rendered}</Card.Title>
                  <Link to={`/posts/${post.id}`}>Go somewhere</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
