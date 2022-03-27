# p7_react-redux-expressJS

Front - react/redux
Back - ExpressJS, NodeJS

To start the project on your computer, 
    install node package for the back end
        => cd back
        => npm install
    then start the server
        => node server
    install node package for the front end
        => cd front
        => npm install
    then start the front end app
        => npm start

To create the database with postgresql, run this command
    CREATE DATABASE groupomania;
    CREATE TABLE users
    (
        id text PRIMARY KEY,
        email varchar(255),
        password text,
        admin boolean,
        created timestampz,
        updated timestampz
    );
    CREATE TABLE content
    (
        postid varchar(255) PRIMARY KEY,
        contenttext text,
        imgurl text,
        comments text,
        postedat timestampz,
        userid text
    );