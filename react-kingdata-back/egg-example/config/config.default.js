'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531657200963_7305';

  // add your config here
  config.middleware = [];

  exports.mongoose = {
    url: 'mongodb://127.0.0.1/react-kingdata-back',
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }
  // add static file server
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
  };

  return config;
};
