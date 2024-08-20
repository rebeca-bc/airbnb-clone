/** database user model */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/** also define data types and restrictions */
const userSchema = new Schema({
    fName: String,
    lName: String,
    email: {type: String, unique: true},
    password: String,
});

/** create the model */
const userModel = mongoose.model('user', userSchema);
/** export model, to allow usage in other parts of the app */
module.exports = userModel;