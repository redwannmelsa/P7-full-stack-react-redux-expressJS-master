const client = require('../connection')

const { v4: uuidv4 } = require('uuid');
const { json } = require('body-parser');

exports.addNewPost = (req, res) => {
    var safeContent = req.body.content.replaceAll("'", "''")
    var safeUserEmail = req.session.userEmail.replaceAll("'", "''")
    const postId = uuidv4();
    
    let insertQuery = `INSERT INTO content(userId, contentText, imgUrl, postedAt, postid) 
    VALUES ('${safeUserEmail}', '${safeContent}', '${req.body.imgUrl}', to_timestamp(${Date.now()} / 1000.0), '${postId}')`
    
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err.message)
        }
    })
}

exports.getAllPosts = (req, res) => {

    if (req.session.userId) {
        console.log(req.session)
    }

    let insertQuery = `SELECT * FROM content`
    client.query(insertQuery, (err, results) => {
        if (!err) {
            console.log(req.session)
            let sending = [results.rows, req.session.userEmail, req.session.admin]
            res.send(sending)
        } else {
            console.log(err.message)
        }
    })
}

exports.getOnePost = (req, res) => {
    let insertQuery = `SELECT * FROM content WHERE postid = '${req.params.id}'`
    client.query(insertQuery, (err, results) => {
        if (!err) {
            res.send(results.rows);
        } else {
            console.log(err);
        }
    })
}

exports.modifyPost = (req, res) => {
    console.log(req.body.contentText)
    let insertQuery = `UPDATE content SET contenttext = '${req.body.contentText}', imgurl = '${req.body.imgUrl}' WHERE postid = '${req.params.id}';`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err.message)
        }
    })
}

exports.deletePost = (req, res) => {
    let insertQuery = `DELETE FROM content WHERE postid = '${req.params.id}'`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('post deleted')
        } else {
            console.log(err)
        }
    })
}

exports.addNewComment = (req, res) => {
    let getAllCommentsQuery = `SELECT comments FROM content WHERE postid = '${req.params.id}'`

    client.query(getAllCommentsQuery, (err, results) => {
        if(!err) {
            if (results.rows[0].comments === null) {
                var safeComment = req.body.comment.replaceAll("'", "''");
                var safeEmail = req.session.userEmail.replaceAll("'", "''");
                console.log(safeEmail)
                var commentObject = [];
                var commentId = safeEmail;
                commentObject = [{[commentId]: safeComment}];
                console.log(commentObject);
                let insertFirstCommentQuery = `UPDATE content SET comments = '${JSON.stringify(commentObject)}' WHERE postid = '${req.params.id}'`

                client.query(insertFirstCommentQuery, (err, result) => {
                    if (!err) {
                        return res.send(result);
                    } else {
                        console.log(err)
                    }
                })
            } else {
                console.log(req.session.userEmail)
                const commentId = req.session.userEmail;
                var commentObject = JSON.parse(results.rows[0].comments)
                commentObject.push({ [commentId]: req.body.comment })
                var commentObjectAsString = JSON.stringify(commentObject);
                var safeCommentObjectAsString = commentObjectAsString.replaceAll("'", "''");
                let insertNewCommentQuery = `UPDATE content SET comments = '${safeCommentObjectAsString}' WHERE postid = '${req.params.id}'`

                client.query(insertNewCommentQuery, (err, result) => {
                    if (!err) {
                        res.send(result);
                    } else {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(err)
        }
    })
}

// ! {
// ! "comment": { "commentId": "third this is a comment" }
// ! }
// this is the syntax you need to send from the front end for this to work

exports.deleteComment = (req, res) => {
    let getAllCommentsQuery = `SELECT comments FROM content WHERE postid = '${req.params.id}'`
    client.query(getAllCommentsQuery, (err, results) => {
        console.log(req.body)
        console.log(req.params.id)
        var updatedCommentObject = []
        var commentObject = JSON.parse(results.rows[0].comments);
        for (comment in commentObject) {
            // console.log(JSON.stringify(req.body.comment))
            if (JSON.stringify(commentObject[comment]) !== JSON.stringify(req.body.comment)) {
                // console.log(JSON.stringify(commentObject[comment]))
                updatedCommentObject.push(commentObject[comment])
            } else {
                console.log('one false found!!!')
            }
        }
        
        let updateCommentsQuery = `UPDATE content SET comments = '${JSON.stringify(updatedCommentObject)}' WHERE postid = '${req.params.id}'`
        client.query(updateCommentsQuery, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.send(response);
            }
        })
    })
}

exports.getUserNameFromId = (req, res) => {
    let getUserNameQuery = `SELECT email FROM users WHERE id = '${req.params.userId}'`
    client.query(getUserNameQuery, (err, response) => {
        if (err) {
            res.send(err)
        } else {
            if(response.rows[0] !== undefined) {
                console.log(Object.values(response.rows[0]))
                res.send(Object.values(response.rows[0]))
            }
            
            
        }
    })
}