import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      phone
      website
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return (
    <div className="App">
      {data.users.map((user) => {
        return (
          <div>
            <p>id: {user.id}</p>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
            <p>phone: {user.phone}</p>
            <p>website: {user.website}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
