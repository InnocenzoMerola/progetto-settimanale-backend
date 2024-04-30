import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApiUrl } from "../constants";
import Container from "react-bootstrap/esm/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DetailPage = function () {
  const [post, setPost] = useState(null);
  const [deletes, setDeletes] = useState(0);
  const [edit, setEdit] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}?_embed=1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella chiamata API");
        }
      })
      .then((data) => {
        const itaData = { year: "numeric", month: "long", day: "numeric" };
        const itaFormat = new Intl.DateTimeFormat("it-IT", itaData).format(new Date(data.date));
        data.itaFormat = itaFormat;
        console.log(data);
        setPost(data);
        setEdit(data);
      })
      .catch((error) => console.log("ERRORE", error));
  }, [deletes]);

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

  const editPost = (postId, data) => {
    const authString = btoa("Enzo:synx gWI7 92AI U4FJ 8cnF dIB8");
    fetch(`${baseApiUrl}/posts/${postId}?_embed=1`, {
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error("Errore nella chiamata API");
        } else {
          return response.json();
        }
      })
      .then((response) => {
        const itaData = { year: "numeric", month: "long", day: "numeric" };
        const itaFormat = new Intl.DateTimeFormat("it-IT", itaData).format(new Date(response.date));
        response.itaFormat = itaFormat;

        setPost(response);
        setEdit(null);
        console.log("EDit", edit);
      })
      .catch((error) => console.log("ERRORE", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
    };
    editPost(post.id, data);
  };

  return (
    post && (
      <Container className="my-4">
        <div>
          <h1 className="text-center">{post.title.rendered}</h1>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <h5>Autore: {post._embedded && post._embedded["author"][0].name}</h5>
              <p>Giorno: {post.itaFormat}</p>
            </div>
            <h6>
              {post._embedded && post._embedded["wp:term"] && (
                <div>
                  {post._embedded["wp:term"][0].map((category) => (
                    <Badge bg="secondary" key={category.id}>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}
            </h6>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </div>
        <div className="text-end">
          <Button
            className="del-btn me-2"
            variant="danger"
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Elimina
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setEdit({
                ...post,
              });
            }}
          >
            Modifica
          </Button>
        </div>
        {edit && (
          <Form onSubmit={handleSubmit} className="edit-form">
            <Form.Group controlId="title">
              <Form.Label className="text-white">Titolo</Form.Label>
              <Form.Control
                type="text"
                value={edit.title.rendered}
                onChange={(e) =>
                  setEdit({
                    ...edit,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label className="text-white">Contenuto</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "300px" }}
                value={edit.content.rendered}
                onChange={(e) =>
                  setEdit({
                    ...edit,
                    content: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="text-end">
              <Button type="submit" className="mt-1" variant="primary">
                Aggiorna
              </Button>
            </div>
          </Form>
        )}
      </Container>
    )
  );
};

export default DetailPage;
