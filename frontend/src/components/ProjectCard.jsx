import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, Card, Image, Button } from "react-bootstrap";

function ProjectCard({ project }) {
  const get_likes_by_project_id = gql`
    query GetLikesByPortfolioId($projectID: ID!) {
      likes(where: { project: { id: $projectID } }) {
        id
      }
    }
  `;
  const { firstName, lastName } = project.developer;

  function handleLike() {
    // TODO
  }

  const { error, data, loading } = useQuery(get_likes_by_project_id, {
    variables: { projectID: project.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Col key={project.id}>
      <Card className="grow-shadow">
        <Card.Img
          variant="top"
          src={
            "http://localhost:1337" + project.featuredImage.formats.large.url
          }
        />
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
        </Card.Body>
        <footer className="p-3 d-flex justify-content-between">
          <div>
            <Image
              className="avatar"
              src={"http://localhost:1337" + project.developer.AvatarImage.url}
              roundedCircle
            />
            <p>{`${firstName} ${lastName}`}</p>
            <Button variant="primary" type="submit" className="py-2">
              Details
            </Button>
          </div>
          <div>
            <span>Likes: {data.likes.length}</span>
            <button onClick={handleLike}>Like</button>
          </div>
        </footer>
      </Card>
    </Col>
  );
}

export default ProjectCard;
