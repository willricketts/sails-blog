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
  doCreateAdmin: doCreateAdmin
}

function login(req, res) {
  res.view();
}

function doLogin(req, res) {
  var b = req.body;
  console.log(req.body);
  auth.validate(b.email, b.password, function(err, result) {
    if(err) {
      res.serverError(err)
    }
    else if(result) {
      req.session.authenticated = true;
      res.redirect('/admin');
    }
    else {
      res.redirect('/login')
    }
  });
}

function logout(req, res) {
  console.log(req.session);
}

function createAdmin(req, res) {
  res.view();
}

function doCreateAdmin(req, res) {
  var b = req.body;
  
  auth.hashPlaintext(b.password, function(hash) {
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
