import './App.css';
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { client } from "./apollo/index";

const get_projects_query = gql`
  query {
    projects {
      id
      name
      description
      developer {
        id
        firstName
        lastName
      }
      githubURL
      livesiteURL
      likeCount
      published_at
    }
  }
`
const get_likes_by_project_id= gql`
query GetLikesByPortfolioId($projectID: ID!) {
  likes(where: { project: { id: $projectID } }) {
    id
  }
}
`

function ProjectList() {
  const {error, data, loading} = useQuery(get_projects_query)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data)
  return (
    <div>
      <h1>Projects List</h1>
      { data && 
        <div>
          { data.projects.map((project) => 
            <Card key={project.id} project={project}></Card>
          )}
        </div>
      }
    </div>
  )
}

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ProjectList />
      </div>  
    </ApolloProvider>
  );
}

function Card({project}) {
  
  const { firstName, lastName } = project.developer

  function handleLike (){
    console.log("Liked")
  }

  const {error, data, loading} = useQuery(get_likes_by_project_id, {
    variables: { projectID: project.id}
  })
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data)
  return (
    <div key={project.id}>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>{`${firstName} ${lastName}`}</p>
      <span>Likes: {data.likes.length}</span>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}

export default App;
