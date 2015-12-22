/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: index
};

function index(req, res) {
  console.log(req.session);
  Post.find({}, function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({ title: posts[i].title, content: posts[i].content, slug: 'post/' + posts[i].slug });
      }
      res.view({ posts: postsPayload });
    }
  });
}