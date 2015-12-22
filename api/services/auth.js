var bcrypt = require('bcrypt');

module.exports = {
  validate: validate,
  hashPlaintext: hashPlaintext
};

function validate(email, plaintext, callback) {
  getUserHash(email, function(err, userHash) {
    if(err) {
      callback(err, null);
    }
    else {
      compareHash(plaintext, userHash, function(result) {
        callback(null, result);
      });
    }
  });
}

function hashPlaintext(plaintext, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      callback(err, null);
    }
    else {
      bcrypt.hash(plaintext, salt, function(err, hash) {
        if(err) {
          callback(err, null);
        }
        else {
          callback(null, hash);
        }
      });
    }
  });
}

function compareHash(plaintext, storedHash, callback) {
  bcrypt.compare(plaintext, stored, function(err, res) {
    callback(res);
  });
}

function getUserHash(email, callback) {
  User.findOne({ email: email }, function(err, user) {
    if(err) {
      callback(err, null);
    }
    else if(!user) {
      callback(err, null);
    }
    else {
      callback(err, user.password);
    }
  });
}
