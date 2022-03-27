import Login from './Login';
import Signup from './Signup';
import React from 'react';

import { connect } from 'react-redux';
import { toggleLogin, toggleSignup, logOff } from '../actions';

class Navbar extends React.Component {

    // disconnect button handler - destroys the current section in the back
    handleDisconnect = () => {
        this.props.logOff();
        fetch('http://localhost:8080/api/auth/logoff', {credentials: 'include'})
            .then(res => res.json)
            .then(window.location.reload())
    }

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onSignupClick = this.onSignupClick.bind(this);
    }

    // handler for login link - shows/hides login component on every click
    onLoginClick() {
        if (this.props.showSignup === true) {
            this.props.onSignUpClick()
        }
        this.props.onLoginClick()
    };

    // handler for signup link - shows/hides signup component on each click
    onSignupClick() {
        if (this.props.showLogin === true) {
            this.props.onLoginClick()
        }
        this.props.onSignUpClick()
    }

    render() {
        return (
            <>
            <nav className='navbar'>
                <img src='/icon-left-font-monochrome-black.png' alt="" />
                <div className='links'>
                    { this.props.isLogged ? 
                    <button className='btn btn-secondary' onClick={this.handleDisconnect}>Log out</button>
                    : <>
                    <a href='#login' onClick={this.onLoginClick}>Login</a>
                    <a href='#signup' onClick={this.onSignupClick}>Signup</a>
                    </>
                    }
                </div>
            </nav>
            {this.props.showLogin ? <Login /> : null}
            {this.props.showSignup ? <Signup /> : null}
            </>
            
        );
    }
}

//this maps the redux store to the class component's props - here, it will set the isLoggedIn props to false as default
const mapStateToProps = (state) => {
    return {
      showLogin: state.toggleLogin,
      showSignup: state.toggleSignup,
      isLogged: state.isLogged,
    }
  };
  
  //allows this component to dipatch to redux store => when user logs in, the store updates to isLoggedIn = true
  const mapDispatchToProps = (dispatch) => {
    return {
      onSignUpClick: () => { dispatch(toggleSignup()) },
      onLoginClick: () => { dispatch(toggleLogin()) },
      logOff: () => { dispatch(logOff()) }
    }
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);