const client = require('./connection');
const PORT = 8080;

const express = require('express');
const session = require('express-session');
const uuid = require('uuid')

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const { UUIDV4 } = require('sequelize');

// setting up CORS
var whitelist = ['http://localhost:3000' /** other domains if any */ ]
var corsOptions = {
  methods: 'GET,PUT,POST,DELETE,PUT',
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
// app.use(cors({credentials: true, origin: true}))

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    id: UUIDV4(), //random name
    secret: "MY_SESSION_SECRET",
    resave: false, //doesn't resave user every time they reload session
    saveUninitialized: true,
    cookie: {
      httpOnly: false, //js can't access cookies -- security feature
      secure: false, //this allows cookies to be sent through http -- for development purposes
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);


//body parser used to parse requests bodies
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

client.connect();