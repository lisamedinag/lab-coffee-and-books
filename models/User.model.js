const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: String,
});

module.exports = mongoose.model("User", userSchema);

