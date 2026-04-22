const controllers = require('./controllers');
const mid = require('./middleware');

module.exports = (app) => {
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/app', mid.requiresSecure, mid.requiresLogin, controllers.Page.appPage);
  app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout);

  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePassword);

  app.get('/getAccount', mid.requiresSecure, mid.requiresLogin, controllers.Account.getAccount);
  app.post('/togglePremium', mid.requiresSecure, mid.requiresLogin, controllers.Account.togglePremium);

  app.get('/getTasks', mid.requiresSecure, mid.requiresLogin, controllers.Task.getTasks);
  app.post('/makeTask', mid.requiresSecure, mid.requiresLogin, controllers.Task.makeTask);
  app.post('/updateTask', mid.requiresSecure, mid.requiresLogin, controllers.Task.updateTask);
  app.post('/deleteTask', mid.requiresSecure, mid.requiresLogin, controllers.Task.deleteTask);

  app.all('*', controllers.Page.notFound);
};