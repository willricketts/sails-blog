var slugify = require('slugify');
var marked = require('marked');
var showdown = require('showdown');
var converter = new showdown.Converter();

module.exports = {
  create: create,
  doCreate: doCreate,
  show: show,
  update: update,
  doUpdate: doUpdate,
  destroy: destroy
}

function create(req, res) {
  res.view({ title: 'New Post' });
}

function doCreate(req, res) {
  var b = req.body;
  console.log(b);
  Post.create({ title: b.title, content: b.content, slug: slugify(b.title.toLowerCase()) }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/dashboard');
    }
  });
}

function show(req, res) {
  Post.findOne({ slug: req.params.slug }, function(err, post) {
    if(err) {
      res.serverError();
    }
    else if(!post) {
      res.notFound();
    }
    else {
      var postPayload = {
        title: post.title,
        content: converter.makeHtml(post.content)
      };
      res.view({ title: post.title, post: postPayload });
    }
  });
}

function update(req, res) {
  Post.findOne({ slug: req.params.slug }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else if(!post) {
      res.notFound();
    }
    else {
      res.view({ title: 'Update Post', post: post });
    }
  })
}

function doUpdate(req, res) {
  var b = req.body;
  
  Post.update({ slug: req.params.slug }, { title: b.title, content: b.content }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/dashboard');
    }
  });
}

function destroy(req, res) {
  Post.destroy({ slug: req.params.slug }, function(err, post) {
    if(err) {
      res.serverError();
    }
    else {
      res.redirect('/dashboard');
    }
  });
}