import React from "react";

import { connect } from "react-redux";
import { loggedIn, storeUserId } from "../actions";

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       posts: [],
       comment: '',
       loggedUser: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
   //  this.handleDeleteComment = this.handleDeleteComment.bind(this);
   }

   componentDidMount() {
      fetch('http://localhost:8080/api/content', {credentials: 'include'})
      .then((res) => res.json())
      .then((json) => {

         if(json[1]) {
            this.props.loggingIn() //if user session (json) => dispatches to props logging in => front end matches the login backend
         }
         // console.log(json[0][0].postedat)
         json[0].sort((a, b) => new Date(b.postedat) - new Date(a.postedat)) //sorting posts to show up from most recent to least before setting array as state
         this.setState({
            posts: json[0],
            loggedUser: json[1],
            isAdmin: json[2]
         })
      })
   }

   //input event handler, reflects user input in the component's state to later be used in POST method
   handleInputChange(event) {
      event.preventDefault();
      const target = event.target;
      this.setState({
        comment: target.value
      });
    }

   // comment posting handling, requests the API with the comment stored in component's state as body
   // sends the posts' ID to the fetch URL to be used in the backend as params to link comment to its post
   async handleClick(id) {
      let commentBody = {
         comment: this.state.comment
      }
      const requestOptions = {
         method: 'POST',
         headers: { 'Content-type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify(commentBody),
         credentials: 'include'
      }
      console.log(requestOptions)
      await fetch(`http://localhost:8080/api/content/${id}/comment`, requestOptions)
         .then(res => res.json())
      .catch((error) => {
         console.log(error);
      });
      window.location.reload()
   }

   // delete post handler
   async handleDeletePost(id) {
      const deleteRequestOptions = {
         method: 'DELETE'
      }
      console.log(deleteRequestOptions)
      await fetch(`http://localhost:8080/api/content/${id}/delete`, deleteRequestOptions)
         .then(res => res.json())
         .catch(err => console.log(err))
      window.location.reload()
   }

   // delete comment handler
   // sends the comment to be deleted as body and the post ID as params
   async handleDeleteComment(comment, id) {
      let bodyComment = {
         "comment": comment
      }
      const deleteCommentRequestOptions = {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(bodyComment)
      }
      await fetch(`http://localhost:8080/api/content/${id}/comment`, deleteCommentRequestOptions)
         .then(res => res.json())
         .catch(err => console.log(err))

      window.location.reload() //reloading to refresh the page's content and reflect the deleted row in DB
   }
  
   

   render() {
      const {posts} = this.state;
      return (
         posts.map((post) => { //mapping posts to dynamically generate HTML for each DB entry
            let id = post.postid;
            let time = new Date(post.postedat);
            let imgUrl = post.imgurl;
            let content = post.contenttext;
            let userEmail = post.userid;
         
         return (
            <section className="hero">
                  <div className="container" key={id}>
                     <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                           <div className="cardbox shadow-lg bg-white">
                              <div className="cardbox-heading">
                                 <div className="media m-0">
                                    <div className="media-body">
                                       <p className="m-0">{userEmail.split('@')[0]}</p>
                                       <small><span className=''><i className="icon ion-md-time"></i>{time.toDateString()}</span></small>
                                       {/* delete button shows up only if the user is the one who posted the content OR if user is admin */}
                                       { userEmail === this.state.loggedUser || this.props.userId.userId && userEmail === this.props.userId.userId.userEmail || this.state.isAdmin || this.props.userId.userId && this.props.userId.userId.admin ? 
                                          <button className='btn btn-danger' onClick={() => this.handleDeletePost(id)}>Delete post</button>
                                          : null
                                        }
                                       
                                    </div>
                                 </div>
                              </div>
                              { imgUrl ? 
                                 <div className="cardbox-item">
                                    <img className="img-fluid" src={imgUrl} alt="Image" />
                                 </div>
                                 : null
                              }
                              { content ? 
                                 <div className="cardbox-item">
                                    <p>{content}</p>
                                    
                                 </div>
                                 : null
                                 
                              
                              }
                              
                                 {/* this shows comment section under the post if there are any comments */}
                                 {/* user who commented username is email truncated to remove @xxx.xxx */}
                                 {post.comments ? 
                                 JSON.parse(post.comments).map((comment) => {
                                    return (
                                       <>
                                       <div id="comments" className="cardbox-item">
                                       {/* delete button shows up only if the user is the one who posted the content OR if user is admin */}
                                       { Object.keys(comment)[0] === this.state.loggedUser || Object.keys(comment)[0] === this.props.userId.userId || this.state.isAdmin || this.props.userId.userId && this.props.userId.userId.admin ? 
                                          <button className='btn btn-danger' onClick={() => this.handleDeleteComment(comment, id)}>Delete comment</button>
                                          : null
                                        }
                                       
                                       <p><b>{Object.keys(comment)[0].split('@')[0]}</b> commented</p> 
                                       <p>{Object.values(comment)}</p>
                                       </div>
                                       </>
                                       
                                       
                                    )
                                    })
                                 : null}
                              
                              { this.props.isLoggedIn ? 
                                 <>
                                 <textarea onChange={this.handleInputChange} placeholder='Write a comment'></textarea>
                                 <button className='btn btn-secondary' onClick={() => this.handleClick(id)}>post</button>
                                 </>
                              : null}
                              
                           </div>
                        </div>
                     </div>
                  </div>
            </section>
         )})
      )
   }
}

// mapping state and dispatch to props to use redux store
const mapStateToProps = (state) => {
   return {
     isLoggedIn: state.isLogged,
     userId: state.initUser
   }
 };

 const mapDispatchToProps = (dispatch) => {
   return {
       loggingIn: () => { dispatch(loggedIn()) },
       userInit: (data) => { dispatch(storeUserId(data)) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);