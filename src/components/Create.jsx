import { useEffect, useState } from "react";
import { baseApiUrl } from "../constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Create = function () {
  const [newPost, setNewPost] = useState({});
  const navigate = useNavigate();
  const createPost = (e) => {
    e.preventDefault();

    if (!newPost.title || !newPost.content) {
      alert("Inserisci il titolo e il contenuto");
      return;
    }

    console.log("newPost.title", newPost.title);
    console.log("newPost.content", newPost.content);

    const authString = btoa("Enzo:synx gWI7 92AI U4FJ 8cnF dIB8");
    fetch(`${baseApiUrl}/posts`, {
      body: JSON.stringify({
        title: newPost.title,
        status: "publish",
        content: newPost.content,
      }),
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERRORE nella chiamata API");
        }
      })
      .then((post) => {
        alert("Il post è stato aggiunto con successo");
        setNewPost({});
        navigate("/blog");
      })
      .catch((error) => console.log("ERRORE", error));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Form onSubmit={createPost}>
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Aggiungi il titolo"
                value={newPost.title || ""}
                onChange={(e) => {
                  setNewPost({
                    ...newPost,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "300px" }}
                value={newPost.content || ""}
                onChange={(e) => {
                  setNewPost({
                    ...newPost,
                    content: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Aggiungi post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
