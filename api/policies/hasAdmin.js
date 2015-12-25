module.exports = function(req, res, next) {
  User.find({ admin: true }, function(err, users) {
    if(err) {
      res.serverError(err);
    }
    else if(users.length > 0) {
     return next(); 
    }
    else {
      res.redirect('/setup');
    }
  });
}