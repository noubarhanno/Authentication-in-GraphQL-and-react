import React, {Component} from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import loginMutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = { errors : [] };
    }

    componentWillUpdate(nextProps){
        //this.props // is the old set of props
        //nextProps // is the next set of props when the component rerendered
        if (!this.props.data.currentUser && nextProps.data.currentUser){
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => { 
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }
    // .catch to handle errors

    render(){
        return (
            <div>
                <h3>Login</h3>
                <hr />
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}

export default graphql(query)(
graphql(loginMutation)(LoginForm)
);