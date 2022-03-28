const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const client = require("../connection");

exports.signup = (req, res) => {
    const user = req.body;
    var safeEmail = user.email.replaceAll("'", "''")
    const userId = uuidv4();
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    let insertQuery = `INSERT INTO users(id, email, password, created, updated)
                       VALUES('${userId}', '${safeEmail}', '${hash}', to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0))`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            console.log(user.email)
            req.session.userEmail = user.email;
            res.status(200).json({
                userEmail: user.email
            })
        } else {
            console.log(err.message);
        }
    });
    client.end;
};

exports.login = (req, res) => {
    const user = req.body;
    var safeEmail = user.email.replaceAll("'", "''")
    let insertQuery = `SELECT email, password, id, admin FROM users WHERE email = '${safeEmail}'`

    client.query(insertQuery, (err, results) => {
        if (!err) {
            bcrypt.compare(user.password, results.rows[0].password, (err, isValid) => {
                if (!isValid) {
                    return console.log('wrong password')
                } else {
                    if (results.rows[0].admin) {
                        req.session.admin = true;
                    } else {
                        req.session.admin = false;
                    }
                    console.log(results.rows[0].email)
                    req.session.userEmail = results.rows[0].email;
                    req.session.cookie.userEmail = results.rows[0].email;
                    console.log(req.session)
                    res.status(200).json({
                        token : jwt.sign(
                            {userId: results.rows[0].id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        userId: results.rows[0].id,
                        userEmail: results.rows[0].email,
                        admin: req.session.admin
                    })
                }
            })
        } else {
            console.log(err)
        }
    })
}

exports.logoff = (req, res) => {
    req.session.destroy();
    console.log(req.session)
    res.send("user logged <output></output>")
}