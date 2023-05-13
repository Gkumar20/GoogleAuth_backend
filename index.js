require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoute');
const db = require('./db/conn');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1 hour
  },
  name: 'sessionId',
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());  

app.use(userRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
