import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import { Link } from "react-router-dom/dist";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../img/I&M-LOGO.jpg";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

const Blog = function () {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletes, setDeletes] = useState(0);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}&_embed=1`)
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
  }, [currentPage, deletes]);

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

  const deletePost = (postId) => {
    const authString = btoa("Enzo:synx gWI7 92AI U4FJ 8cnF dIB8");
    fetch(`${baseApiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setDeletes(deletes + 1);
      }
    });
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
                  <div className="d-flex gap-2">
                    <Link to={`/posts/${post.id}`} className="btn btn-info ms-auto">
                      Vedi
                    </Link>
                    <Button className="del-btn" variant="danger" onClick={() => deletePost(post.id)}>
                      Elimina
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Pagination>
            <Pagination.Prev
              onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
              className={currentPage === 1 && "disabled"}
            />
            {genPagination().map((page) => (
              <Pagination.Item key={page.n} className={`${page.active && "active"}`} onClick={() => changePage(page.n)}>
                {page.n}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => currentPage !== 1 && changePage(currentPage + 1)}
              className={currentPage === "lastPage" && "disabled"}
            />
          </Pagination>
        </Row>
      </Container>
    </>
  );
};

export default Blog;
