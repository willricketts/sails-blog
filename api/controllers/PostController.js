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
  
  Post.create({ title: b.title, content: b.content, slug: slugify(b.title) }, function(err, post) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/');
    }
  });
}

function show(req, res) {
  Post.findOne({ id: req.params.id }, function(err, post) {
    if(err) {
      res.send(err);
    }
    else if(!post) {
      res.render('404');
    }
    else {
      res.view({ title: post.title, content: post.content, id: post.id });
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