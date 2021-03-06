/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  connection: 'mongodb',
  schema: true,

  attributes: {
    firstName: {
      type: 'string'
    },
    
    lastName: {
      type: 'string'
    },
    
    email: {
      type: 'string',
      unique: true
    },
    
    password: {
      type: 'string'
    },
    
    admin: {
      type: 'bloolean',
      required: true,
      defaultsTo: false
    }
  }
};

