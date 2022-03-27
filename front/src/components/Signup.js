import React from "react";
import { Navigate } from 'react-router';
import { connect } from "react-redux";
import { loggedIn, toggleSignup } from "../actions"

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        isLoggedIn: 'false'
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setAlertMessage = this.setAlertMessage.bind(this);
    }
  
    // Whenever an input changes value, change the corresponding state variable
    handleInputChange(event) {
      event.preventDefault();
      const target = event.target;
      this.setState({
        [target.name]: target.value,
      });
    }
  
    // handles the form submission
    handleSubmit(event) {
        event.preventDefault();
        this.setAlertMessage();
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(this.state)
        }
        fetch('http://localhost:8080/api/auth/signup', requestOptions)
          .then(res => res.json())
          .then(data => data)
          .then(this.props.loggingIn()) // updates redux store login value on successful signup
          .then(this.props.toggleSignup()) // hides sign up component
        .catch((error) => {
          this.setAlertMessage(error.message);
        });
      }
    
      setAlertMessage(message) {
        this.setState({ alertMessage: message });
      }
      

    

    render() {
        return (
            <section id='signup' className="vh-100 gradient-custom centered-element onTop">
                <form onSubmit={this.handleSubmit}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                        className="card bg-dark text-white"
                        style={{ borderRadius: "1rem" }}
                        >
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                            <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                            <p className="text-white-50 mb-5">
                                Please enter your email and password!
                            </p>
                            <div className="form-outline form-white mb-4">
                                <input
                                name='email'
                                type="email"
                                id="typeEmailX"
                                className="form-control form-control-lg"
                                // value={this.state.email}
                                onChange={this.handleInputChange}
                                />
                                <label className="form-label" htmlFor="typeEmailX">
                                Email
                                </label>
                            </div>
                            <div className="form-outline form-white mb-4">
                                <input
                                name='password'
                                type="password"
                                id="typePasswordX"
                                className="form-control form-control-lg"
                                value={this.state.password} onChange={this.handleInputChange}
                                />
                                <label className="form-label" htmlFor="typePasswordX" >
                                Password
                                </label>
                            </div>
                            <p className="small mb-5 pb-lg-2">
                                <a className="text-white-50" href="#!">
                                Forgot password?
                                </a>
                            </p>
                            <a href='#'>
                              <button
                                  className="btn btn-outline-light btn-lg px-5"
                                  type="submit"
                                  >
                                  Signup
                              </button>
                            </a>
                              
                            <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                <a href="#!" className="text-white">
                                <i className="fab fa-facebook-f fa-lg" />
                                </a>
                                <a href="#!" className="text-white">
                                <i className="fab fa-twitter fa-lg mx-4 px-2" />
                                </a>
                                <a href="#!" className="text-white">
                                <i className="fab fa-google fa-lg" />
                                </a>
                            </div>
                            </div>
                            <div>
                            <p className="mb-0">
                                Don't have an account?{" "}
                                <a href="#!" className="text-white-50 fw-bold">
                                Sign Up
                                </a>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </form>
            </section>
        )
    
  }
}

//this maps the redux store to the class component's props - here, it will set the isLoggedIn props to false as default
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLogged,
    showSignup: state.toggleSignup
  }
};

//allows this component to dipatch to redux store => when user logs in, the store updates to isLoggedIn = true
const mapDispatchToProps = (dispatch) => {
  return {
    loggingIn: () => { dispatch(loggedIn()) },
    toggleSignup: () => { dispatch(toggleSignup()) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);