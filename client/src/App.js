import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Header from './components/Header';
// import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import ClientAddForm from './pages/ClientAdd'
import Landing from './components/Landing';
import TumutRed from './pages/TumutRed';
import TumutBlue from './pages/TumutBlue';
import Gundagai from './pages/Gundagai';
import Batlow from './pages/Batlow';
import Adelong from './pages/Adelong';
import ClientEdit from './pages/ClientEdit';
import Order from './pages/Order';
// import CreateMenu from './pages/CreateMenu';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/me"
                element={<Profile />}
              />
              <Route
                path="/profiles/:username"
                element={<Profile />}
              />
              <Route
                path="/addClient"
                // element={<ClientAdd />}
                element={<ClientAddForm />}
              />
              <Route
                path="/editclient"
                element={<ClientEdit />}
              />
              <Route
                path="/landing"
                element={<Landing />}
              />
              <Route
                path="/tumutred"
                element={<TumutRed />}
              />
              <Route
                path="/tumutblue"
                element={<TumutBlue />}
              />
              <Route
                path="/gundagai"
                element={<Gundagai />}
              />
              <Route
                path="/batlow"
                element={<Batlow />}
              />
              <Route
                path="/adelong"
                element={<Adelong />}
              />
              <Route
                path="/clientorder"
                element={<Order />}
              />
              {/* <Route
                path="/editmenu"
                element={<CreateMenu />}
              /> */}
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
