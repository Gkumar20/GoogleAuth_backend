require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { getUserProfile, updateUser, deleteUser, getAllUser} = require('../controllers/userController');
const User = require('../models/userSchema');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
let currUser = null;




//passport 
//google strategy for authenticated users
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  userProfileURL: process.env.GOOGLE_USER_PROFILE_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      currUser = existingUser;
      done(null, existingUser);
    } else {
      const newUser = new User({
        name: profile.displayName,
        email: profile.email,
        googleId: profile.id,
        accessToken: accessToken,
      });
      await newUser.save();
      currUser = newUser;
      done(null, newUser);
    }
  } catch (err) {
    done(err, null);
  }
}));

// github strategy for authenticated users
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        githubId: profile.id,
        name: profile.displayName,
        accessToken: accessToken
      }, function (err, user) {
        if (err) {
          done(err, null);
        } else {
          currUser = user;
          done(null, user);
        }
      });
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});



//routing for google oauth routes
//user login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/auth/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  });

//routing for github oauth routes 
router.get('/auth/github/',
  passport.authenticate('github', { scope: ["profile"] })
)

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login/failed',
    successRedirect: CLIENT_URL
  }),
  (req, res) => res.json('Logged In')
)

//successfull logined
router.get("/login/success", (req, res) => {
  // console.log(currUser);
  if (currUser !== null) {
    res.status(200).json({
      error: false,
      message: "seccessfully logged in",
      user: currUser
    })
  } else {
    res.status(403).json({ 
      error: true, 
      message: "invalid authorization" })
}});


//failed logined
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "failed to login",
  })
});

//successfull Logout
router.get("/logout", (req, res) => {
  currUser = null;
  res.status(200).json({ 
    error: true, 
    message: "Logged out", 
    user: currUser })
});



// controllers 

router.get('/userinfo/:id', getUserProfile);
router.delete('/deleteuser/:id', deleteUser);
router.patch('/updateuser/:id', updateUser);
router.get('/getalluser', getAllUser);


module.exports = router;
