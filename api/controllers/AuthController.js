/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: login,
  doLogin: doLogin,
  logout: logout,
  createAdmin: createAdmin,
  doCreateAdmin: doCreateAdmin,
  setup: setup,
  doSetup: doSetup
}

function login(req, res) {
  res.view();
}

function doLogin(req, res) {
  var b = req.body;
  auth.validate(b.email, b.password, function(err, result) {
    if(err) {
      res.serverError(err)
    }
    else if(result) {
      User.findOne({ email: b.email }, function(err, user) {
        if(err) {
          res.serverError(err);
        }
        else if(!user) {
          res.serverError();
        }
        else {
          req.session.id = user.id;
          req.session.authenticated = true;
          res.redirect('/dashboard');
        }
      });
    }
    else {
      res.redirect('/login')
    }
  });
}

function logout(req, res) {
  req.session.authenticated = false;
  delete req.session.id;
  res.redirect('/');
}

function createAdmin(req, res) {
  res.view();
}

function doCreateAdmin(req, res) {
  var b = req.body;
  
  auth.hashPlaintext(b.password, function(err, hash) {
    User.create({ email: b.email, firstName: b.firstName, lastName: b.lastName, password: hash, admin: true }, function(err, user) {
      if(err) {
        res.serverError(err);
      }
      else if(!user) {
        res.serverError();
      }
      else {
        req.session.authenticated = true;
        res.redirect('/');
      }
    });
  });
}

function setup(req, res) {
  res.view();
}

function doSetup(req, res) {
  var b = req.body;
  
  User.create({
    firstName: b.firstName,
    lastName: b.lastName,
    email: b.email,
    password: b.password,
    admin: true
  }, function(err, user) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.redirect('/dashboard');
    }
  });
}