module.exports.routes = {

  // PAGE ROUTES
  'get /' : 'PageController.index',
  'get /blog' : 'PageController.blogIndex',
  'get /blog/page/:page' : 'PageController.blogPage',
  //'get /rss' : 'PageController.rss',
  
  // AUTH ROUTES
  'get /login' : 'AuthController.login',
  'post /login' : 'AuthController.doLogin',
  'get /logout' : 'AuthController.logout',
  'get /createAdmin' : 'AuthController.createAdmin',
  'post /createAdmin' : 'AuthController.doCreateAdmin',
  'get /setup' : 'AuthController.setup',
  'post /setup' : 'AuthController.setup',
  
  // ADMIN ROUTES
  'get /dashboard' : 'AdminController.dashboard',
  
  // POST ROUTES
  'get /new' : 'PostController.create',
  'post /new' : 'PostController.doCreate',
  'get /blog/:slug' : 'PostController.show',
  'get /edit/:slug' : 'PostController.update',
  'post /edit/:slug' : 'PostController.doUpdate',
  'get /delete/:slug' : 'PostController.destroy'

};
