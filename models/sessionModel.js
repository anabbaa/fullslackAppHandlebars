const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SessionSchema = Schema({
  uuid: {
    type: String,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  //my user id will be registered on my session id
});
const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;