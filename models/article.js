var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
      title: String,
      commentbody: String
    //  user: User
  });

//returns the title of the Article
articleSchema.methods.getTitle = function  () {
    return this.title;

};

//returns the html of the article
articleSchema.methods.getCommentBody = function  () {
  
  return this.commentbody;

};

//exporting so can be used by app.js
var Article = mongoose.model('Article',articleSchema);

module.exports = {
  Article: Article
};