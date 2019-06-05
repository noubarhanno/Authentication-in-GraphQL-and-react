import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../queries/CurrentUser";
import { hashHistory } from "react-router";

export default WrappedComponent => {
  class RequireAuth extends Component {

    // when we use componentDidMount the component is not getting rerendered when we click logout and we expect to redirect the user to 
    // login page , instead we gonna use componentDidUpdate this will check either the component got updated with the query (getCurrentUser) or not
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.currentUser) {
        hashHistory.push("/login");
      }
    }

    render() {
        return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(query)(RequireAuth);
};

// this a high order component which will be wrapping other components in order to take the role
// of checking weither the user logged in or not and based on the authentication status will decide what to do
// so we gonna apply it on the dashboard component

// check advanced react and redux or online tutorials
