'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/',app.middlewares.manageToLogin(), controller.home.index);
  router.post('/upload', app.middlewares.manageToLogin(),controller.home.upload);
  router.post('/userInfoByCode', controller.home.userInfoByCode);
  router.post('/addVisiter', controller.visiter.addVisiter);
  router.post('/saveUser',app.middlewares.manageToLogin(), controller.user.saveUser);
  router.get('/getManager', controller.user.getManager);
  router.get('/userList',app.middlewares.manageToLogin(), controller.user.userList);
  router.post('/editUserName',app.middlewares.manageToLogin(), controller.user.editUserName);
  router.post('/managerLogin', controller.manager.managerLogin);
  router.post('/saveManager', app.middlewares.manageToLogin(),controller.manager.saveManager);
  router.get('/managerList', app.middlewares.manageToLogin(),controller.manager.managerList);
};
