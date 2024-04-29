import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApiUrl } from "../constants";
import Container from "react-bootstrap/esm/Container";
import Badge from "react-bootstrap/Badge";

const DetailPage = function () {
  const [post, setPost] = useState(null);

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
        console.log(data);
        setPost(data);
      })
      .catch((error) => console.log("ERRORE", error));
  }, []);

  return (
    post && (
      <Container className="my-4">
        <div>
          <h1>{post.title.rendered}</h1>
          <h4>
            {post._embedded["wp:term"] && (
              <div>
                {post._embedded["wp:term"][0].map((category) => (
                  <Badge bg="secondary">{category.name}</Badge>
                ))}
              </div>
            )}
          </h4>
          <h4>{post._embedded["author"][0].name}</h4>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </div>
      </Container>
    )
  );
};

export default DetailPage;
