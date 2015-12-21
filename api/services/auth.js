var bcrypt = require('bcrypt');

module.exports = {
  validate: validate
};

function validate(email, plaintext, callback) {
  hashPlaintext(plaintext, function(err, hash) {
    if(err) {
      callback(err, null);
    }
    else {
      getUserHash(email, function(err, userHash) {
        if(err) {
          callback(err, null);
        }
        else {
          compareHash(hash, userHash, function(result) {
            callback(null, result);
          });
        }
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

function compareHash(submittedHash, storedHash, callback) {
  return (submittedHash == storedHash);
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
