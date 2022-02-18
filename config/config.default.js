/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security:{
      csrf:{
        enable:false
      }
    },
    redis : {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'auth',
        db: 0,
      },
    },
    mysql : {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'order',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1620373916139_8073';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    appid:"wx7aebdbf14ded9171",
    secret:"8ae9a3e941e321213881544b82c9bd7c",
    encryptedData : 
      'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
      'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
      '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
      '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
      'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
      'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
      '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
      'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
      '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
      '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
      'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
      '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
      '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
      'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
      'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
      '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
      'Db/XcxxmK01EpqOyuxINew==',
    iv : 'r7BXXKkLb8qrSNn05n0qiA==',
    user:'admin',
    password:'ee635e66ee98f5f118b25026ba63bdd4',
  };
  return {
    ...config,
    ...userConfig,
  };
};
