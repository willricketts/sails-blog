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
  console.log(req.body);
  console.log(req.params);
}

function logout(req, res) {

}
