import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginForm from './components/LoginForm';


// the code below is for 
const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: 'same-origin'
  }
});

// it is ApolloClient that is making actual request to the backend server
// we can make how the request should be made to the backend by setuping up another option called networkInterface
// we did this because when we call query to get the current user the graphql was recognizing that the user is authenticated but the front end was not 
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
