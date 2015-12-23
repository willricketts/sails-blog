/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  connection: 'mongodb',
  schema: true,

  attributes: {
    title: {
      type: 'text',
      unique: true
    },
    
    content: {
      type: 'text'
    },
    
    slug: {
      type: 'string',
      unique: true
    },
    
    author: {
      model: 'user'
    },
    
    published: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    }
  }
};

