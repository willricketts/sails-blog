var slugify = require('slugify');

module.exports = {
  create: create,
  doCreate: doCreate,
  show: show,
  update: update,
  doUpdate: doUpdate,
  destroy: destroy
}

function create(req, res) {
  res.view();
}

function doCreate(req, res) {
  var b = req.body;
  
  Post.create({ title: b.title, content: b.content, slug: slugify(b.title.toLowerCase()) }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/');
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
        content: post.content
      };
      
      res.view({ post: postPayload });
    }
  });
}

function update(req, res) {
  res.view();
}

function doUpdate(req, res) {
  var b = req.body;
  
  Post.update({ id: b.id }, { title: b.title, content: b.content }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/' + post.slug);
    }
  });
}

function destroy(req, res) {
  Post.remove({ slug: req.params.id }, function(err, post) {
    if(err) {
      res.serverError();
    }
    else {
      res.redirect('/');
    }
  });
}