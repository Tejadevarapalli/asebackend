const mongoose = require('mongoose');

var modaluploadSchema = new mongoose.Schema({
    User: String,
    Projecttitle: String,
    ProjectDescription: String,
    GithubURL: String,
    Likes: Number
});
const homeedata = mongoose.model('modalupload', modaluploadSchema);
module.exports=homeedata;


