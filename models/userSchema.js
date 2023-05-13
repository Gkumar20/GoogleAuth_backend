const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
    googleId: String,
    faceBookId: String,
    githubId: String,
    name: String,
    username: {
        type: String,
        default: () => Math.random().toString(36).substr(2, 9),
        unique: true
    },
    email: String,
    city: String,
    country: {
        type: String,
        default: 'India'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        default: "we're committed to helping your business succeed. Our team of experts is dedicated to delivering exceptional services that are tailored to your specific needs. Contact us today to see how we can help you achieve your goals and take your business to the next level!",
    },
}
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', userSchema);

