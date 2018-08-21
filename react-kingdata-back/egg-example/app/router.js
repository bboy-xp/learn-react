'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/saveForm', controller.home.saveForm);
  router.get('/getAllForm', controller.home.getAllForm);
  router.post('/getForm',controller.home.getForm);
  router.get('/getNextForm',controller.home.getNextForm);
  router.post('/postUserData',controller.home.postUserData);
  router.post('/oauth',controller.home.oauth);
  router.post('/updateUserdata',controller.home.updateUserdata);
  router.post('/getUserdata',controller.home.getUserdata);
  router.post('/getUserdataByOpenId',controller.home.getUserdataByOpenId);
  router.post('/getUserdataByOpenIdAndId',controller.home.getUserdataByOpenIdAndId);
  router.get('/test',controller.home.test);
  router.post('/getTimeSteps',controller.home.getTimeSteps);
  router.post('/getRenderUserdata',controller.home.getRenderUserdata);
  
};
