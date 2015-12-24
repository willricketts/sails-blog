/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var RSS = require('rss');
var moment = require('moment');

module.exports = {
    index: index,
    blogIndex: blogIndex,
    blogPage: blogPage,
    rss: rss
};

function index(req, res) {
  Post.find()
  .sort({ createdAt: 'desc' })
  .exec(function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({ title: posts[i].title,
          content: posts[i].content,
          slug: 'blog/' + posts[i].slug,
          date: moment(posts[i].createdAt).format('MMMM Do YYYY')
        });
      }
      res.view({ posts: postsPayload });
    }
  });
}

function blogIndex(req, res) {
  /*Post.find({}, function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({
          title: posts[i].title,
          content: posts[i].content,
          slug: 'blog/' + posts[i].slug,
          date: moment(posts[i].createdAt).format('MMMM Do YYYY')
        });
      }
      res.view({ posts: postsPayload });
    }
  });*/
  res.redirect('/blog/page/1');
};

function blogPage(req, res) {
  Post.find().paginate({ page: req.params.page, limit: 10 }).exec(function(err, posts) {
    if(err) {
      res.send(err);
    }
    else {
      var postsPayload = [];
      for(var i in posts) {
        postsPayload.push({
          title: posts[i].title,
          content: posts[i].content,
          slug: 'blog/' + posts[i].slug,
          date: moment(posts[i].createdAt).format('MMMM Do YYYY')
        });
      }
      res.view({ posts: postsPayload });
    }
  });
}

function rss(req, res) {
  var feed = new RSS();
  Post.find({}, function(err, posts) {
    if(err) {
      res.serverError(err);
    }
    else {
      for(var i in posts) {
        feed.item({
          title: posts[i].title,
          description: posts[i].content,
          url: 'http://willricketts.com/blog/'+ posts[i].slug
        });
      }
      console.log(feed.xml());
      res.send(feed.xml());
    }
  });
}