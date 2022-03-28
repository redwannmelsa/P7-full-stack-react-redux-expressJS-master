import React from "react";
import { useState, useEffect } from "react";
import PostList from './PostList';
import Login from "./Login";
import Navbar from "./navbar";
import UserPrompt from './UserPrompt'
import 'bootstrap/dist/css/bootstrap.min.css';

import { loggedIn, storeUserId } from "../actions";

import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionEmail: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/content/user/email', {credentials: 'include'})
            .then(res => res.text())
            .then(text => this.setState({
                sessionEmail: text
            }))
    }

    render() {
        return (
            <div className="home">
                <Navbar />
                { this.state.sessionEmail !== '' && this.state.sessionEmail !== 'no email in session' ? 
                    <h2>Welcome, {this.state.sessionEmail.split('@')[0]}</h2>
                    : <h2>Welcome, please log in or sign up</h2> }
                {/* { this.props.userId.userId.userEmail !== '' ? <h2>email isn't empty string</h2> : null } */}
                <h2>{}</h2>
                { this.props.isLogged ? <UserPrompt /> : null }
                <PostList  />
            </div>
            
        );
    }
}

//this maps the redux store to the class component's props
const mapStateToProps = (state) => {
    return {
      isLogged: state.isLogged,
      userId: state.initUser
    }
  };

const mapDispatchToProps = (dispatch) => {
    return {
        loggingIn: () => { dispatch(loggedIn()) },
        userInit: (data) => { dispatch(storeUserId(data)) }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Home);