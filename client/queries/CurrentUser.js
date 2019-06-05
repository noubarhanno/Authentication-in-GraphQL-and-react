import gql from "graphql-tag";

export default gql`
  {
    currentUser {
      id
      email
    }
  }
`;

// whenever we associate this query or any query with one or more components and we decided to re run the query from one component automatically,

// all the components will be updated with the updated result of the query

// it means whenever we re run this query from LoginForm automatically all the other components that are associated with this query will be updated with the result 
// of running this query (the component will be re rendered)
// associate query with component means (not by refetching queries when we use this.props.mutate) but to use graphql helper method from react-apollo library 
// graphql(query)(ComponentName)
