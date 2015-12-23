/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dashboard: dashboard
};

function dashboard(req, res) {
  Post.find({}, function(err, posts) {
    if(err) {
      res.serverError(err);
    }
    else {
      res.view({ posts: posts });
    }
  });
}

