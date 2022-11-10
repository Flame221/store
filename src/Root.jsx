import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/",
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet></Outlet>
    </ApolloProvider>
  );
}

export default Root;
