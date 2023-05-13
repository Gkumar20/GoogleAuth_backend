const User = require('../models/userSchema');


// user profile information
exports.getUserProfile = async (req, res) => {
  try {
    let userId = req.params.id;
    const user = await User.findById(userId);

    if (user == null) {
      return res.status(404).send({
        message: "User Not Found"
      });
    }
    res.status(200).send({
      message: true,
      userProfile: user,
    });
  } catch (err) {
    console.log("Error in get users is: ",err);
    res.status(500).send({
      message: "Some Internal Error !!!",
    });
  }
};

// user update
exports.updateUser = async (req, res) => {
  try {
    let userId = req.params.id;
    // console.log(userId)
    const user = await User.findByIdAndUpdate(userId, {
      $set: req.body
    });

    if (user == null) {
      return res.status(404).send({
        message: "User not Found",
      });
    }
    res.status(200).send({
      message: true,
      userProfile: user,
    });
  } catch (err) {
    console.log("Error in update users is: ",err);
    res.status(500).send({
      message: "Some Internal Error !!!",
    });
  }
};


// user Delete
exports.deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;
    // console.log(userId)
    const user = await User.findByIdAndDelete(userId);

    if (user == null) {
      return res.status(404).send({
        message: "User not Found",
      });
    }
    res.status(200).send({
      message: true,
      userProfile: user,
    });
  } catch (err) {
    console.log("Error in delete users is: ",err);
    res.status(500).send({
      message: "Some Internal Error !!!",
    });
  }
};


//get all users
exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find(req.query.user);
    if (user == null) {
      return res.status(404).send({
        message: "User not Found",
      });
    }
    res.status(200).send({
      message: true,
      userProfile: user,
    });
  } catch (err) {
    console.log("Error in get all users is: ",err);
    res.status(500).send({
      message: "Some Internal Error !!!",
    });
  }
};


// following update
exports.followingUpdate = async (req, res) => {
  try {
    let userId = req.params.id;
    // console.log(userId)
    const user = await User.findByIdAndUpdate(userId, {
      $set: req.body
    });

    if (user == null) {
      return res.status(404).send({
        message: "User not Found",
      });
    }
    res.status(200).send({
      message: true,
      following: user.following,
    });
  } catch (err) {
    console.log("Error in update users is: ",err);
    res.status(500).send({
      message: "Some Internal Error !!!",
    });
  }
};
