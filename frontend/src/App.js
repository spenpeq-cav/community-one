import './App.css';
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { client } from "./apollo/index";

const get_clients_query = gql`
  query {
    clients {
      id
      firstName
      lastName
    }
  }
`

function ClientList() {
  const {error, data, loading} = useQuery(get_clients_query)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data)
  return <div>
    <h1>Client List</h1>
    {data && <div>
      {data.clients.map(client => <h1 key={client.id}>{client.firstName} {client.lastName}</h1>)}
    </div>}
  </div>
}

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ClientList />
      </div>  
    </ApolloProvider>
  );
}

export default App;
