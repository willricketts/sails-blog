/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: login,
  doLogin: doLogin,
  logout: logout
}

function login(req, res) {
  res.view();
}

function doLogin(req, res) {
  var b = req.body;
  console.log(req.body);
  auth.validate(b.email, b.password, function(err, result) {
    console.log(err, result);
  });
}

function logout(req, res) {
  console.log(req.session);
}
