const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    EmailID: String,
    about: String,});
const profiledata = mongoose.model('profileDetails', profileSchema);

module.exports=profiledata;
