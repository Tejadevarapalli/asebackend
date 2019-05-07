const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    User: String,
    Project: String,
    Comment: String});
const commentdata = mongoose.model('CommentDetails', profileSchema);
module.exports=commentdata;
