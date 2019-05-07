const mongoose = require('mongoose');

var signupSchema = new mongoose.Schema({
    Username: String,
    EmailID: String,
    Password: String,});
const signupdata = mongoose.model('signupDetails', signupSchema);

module.exports=signupdata;
