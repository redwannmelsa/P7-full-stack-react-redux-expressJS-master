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
        }
    }

    render() {
        return (
            <div className="home">
                <Navbar />
                {/* { userEmail } */}
                {/* { this.props.userId.userId.userEmail !== '' ? <h2>email isn't empty string</h2> : null } */}
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