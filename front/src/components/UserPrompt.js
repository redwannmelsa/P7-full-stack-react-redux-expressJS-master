import React from "react";

import { connect } from "react-redux";

class UserPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            imgUrl: '',
            userId: this.props.initUser.userId
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImgInputChange = this.handleImgInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    // sets the state equal to the user input to later be used in POST request for comment body
    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
          content: target.value,
        });
      }
      
    // sets the state equal to URL input to be used in POST request
    handleImgInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
          imgUrl: target.value,
        });
      }

    // async function handling POST request to insert new post in the DB
    async handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(this.state)
        }
        await fetch('http://localhost:8080/api/content/new', requestOptions)
          .then(res => res.json())
          .then(data => data)
        .catch((error) => {
          console.log(error.message);
        });
        window.location.reload()
      }

    render() {
        return (
            <section className='hero'>
                <div className="container">
                    <div className="row">
                        <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border col-lg-6 offset-lg-3 input-container">
                            <textarea className="" onChange={this.handleInputChange} placeholder="What's on your mind" />
                        </div>
                        <input className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border col-lg-6 offset-lg-3 input-container" onChange={this.handleImgInputChange} placeholder="Image URL"></input>
                    </div>
                    <button className="btn btn-secondary mt-1" onClick={this.handleSubmit}>Post</button>
                </div>
            </section>
        )
    }
}

// mapping state to props to use redux store
const mapStateToProps = (state) => {
  return {
    initUser: state.initUser
  }
}

export default connect(mapStateToProps)(UserPrompt);