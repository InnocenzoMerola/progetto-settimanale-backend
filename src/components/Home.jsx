import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import { Link } from "react-router-dom/dist";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../img/I&M-LOGO.jpg";
import Container from "react-bootstrap/esm/Container";
import BackHome from "./BackHome";

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
        <BackHome />
        <div className="top-div">
          <h1>Il mio viaggio</h1>
          <h2 className="text-white">Alla scoperta di nuovi orizzonti</h2>
        </div>
        <Container className="dist-cont">
          <div className="text-center">
            <h2>Le migliori tappe visitate nell'ultimo anno</h2>
            <p>Ecco alcuni dei migliori posti che ho visitato negli scorsi mesi</p>
          </div>
          <Row className="row-gap-3">
            {posts.slice(0, 3).map((post) => (
              <Col xs={12} md={4} key={post.id} className="mb-5">
                <Card className="home-h-card">
                  <Card.Img
                    variant="top"
                    className="home-img"
                    src={post._embedded["wp:featuredmedia"] ? post._embedded["wp:featuredmedia"][0].source_url : logo}
                  />
                  <Card.Body>
                    <Card.Title>{post.title.rendered}</Card.Title>

                    <div className="d-flex gap-2">
                      <Link to={`/posts/${post.id}`} className="btn btn-info ms-auto">
                        Vedi
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
