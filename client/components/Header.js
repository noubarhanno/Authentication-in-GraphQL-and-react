import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';
import { Link } from 'react-router';

class Header extends Component{
    onLogoutClick(){
        // in this.props you gonna see mutate function not mutation as it's imported in the very top of this file
        // means even when i import mutation and i call it mutation this.props will contain the mutation function under "mutate"
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }

    renderButtons(){
        const { loading, currentUser } = this.props.data;

        if (loading){
            return <div />;
        }
        if (currentUser){
            return (
            <li>
                <a onClick={this.onLogoutClick.bind(this)}>
                    Logout
                </a>
            </li>
            );
        } 
        else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            );
        }
    }

    render(){
        // when we run the query automatically the data will be included inside this.props.data
        console.log(this.props.data)
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// whenever we wrap the query by graphql helper method automatically when this component get rendered the query will be executed
export default graphql(mutation)(graphql(query)(Header));