import React from "react";
import { gql, useQuery } from "@apollo/client";
import ProjectCard from "../ProjectCard";
import { Row } from "react-bootstrap";

function Projects() {
  const get_projects_query = gql`
    query {
      projects {
        id
        name
        description
        likeCount
        developer {
          id
          firstName
          lastName
          AvatarImage {
            url
          }
        }
        featuredImage {
          formats
        }
        published_at
      }
    }
  `;
  const { error, data, loading } = useQuery(get_projects_query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <Row xs={1} md={3} className="g-4 py-4">
      {data &&
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project}></ProjectCard>
        ))}
    </Row>
  );
}
export default Projects;
