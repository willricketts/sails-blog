/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: index,
    blogIndex: blogIndex,
    blogPage: blogPage
};

function index(req, res) {
  Post.find({}, function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({ title: posts[i].title, content: posts[i].content, slug: 'blog/' + posts[i].slug });
      }
      res.view({ posts: postsPayload });
    }
  });
}

function blogIndex(req, res) {
  Post.find({}, function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({ title: posts[i].title, content: posts[i].content, slug: 'blog/' + posts[i].slug });
      }
      res.view({ posts: postsPayload });
    }
  });
};

function blogPage(req, res) {
  Post.find().paginate({ page: req.params.page, limit: 10 }).exec(function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({ title: posts[i].title, content: posts[i].content, slug: 'blog/' + posts[i].slug });
      }
      res.view({ posts: postsPayload });
    }
  });
}