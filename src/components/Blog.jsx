import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import { Link } from "react-router-dom/dist";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../img/I&M-LOGO.jpg";
import Container from "react-bootstrap/esm/Container";

const Blog = function () {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?&_embed=1`)
      .then((response) => {
        if (response.ok) {
          setLastPage(parseInt(response.headers.get("X-WP-TotalPages")));
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
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const genPagination = function () {
    let pagination = [];
    for (let i = 1; i <= lastPage; i++) {
      pagination.push({
        n: i,
        active: currentPage === i,
      });
    }
    return pagination;
  };

  return (
    <>
      <Container className="my-4">
        <h1 className="text-center">I nostri itinerari</h1>
        <Row className="row-gap-3 mt-3">
          {posts.map((post) => (
            <Col xs={12} md={3} key={post.id}>
              <Card className="h-card">
                <Card.Img
                  variant="top"
                  className="home-img"
                  src={post._embedded["wp:featuredmedia"] ? post._embedded["wp:featuredmedia"][0].source_url : logo}
                />
                <Card.Body className="my-cb">
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

export default Blog;
