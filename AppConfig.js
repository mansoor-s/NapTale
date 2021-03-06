/*
*   Configurations
*/

var Config = module.exports = {

    PROTOCOL: 'http',
    
    /*
        Domain/Host used for generating URIs
    */
    PUB_HOST: 'localhost',
    
    PORT: 8080,    
    
    ENV: 'dev',//'prod'
    
    /*
        Location of the "applets" directory, for autoloading applets
    */
    APPLETS_DIR: __dirname + '/applets/',

    LOG_DIR: __dirname + '/logs/',
    
    PUBLIC_DIR: __dirname + '/public/',

    MODELS_DIR: __dirname + '/models/',

    DEBUG_ENV: ['dev'], //show errors and debug information to user in these specified enviroments

    SESSION_COOKIE_NAME: 'session',

    /*
        Auto start WebSockets server. Set false if you are going to use cluster.
        You must start it manually (See Docs)

    */
    AUTO_START_WS_SERVER: true,
    
    /*
        Number of nodes. set 0 to use number of CPU cores
     
    */
    NODE_COUNT: 0,

    MongoDB: {
        HOST: 'localhost',
        PORT: 27017,
        DB_NAME: 'naptale',
        OPTS: {
            USER: '',
            PASS: ''
        }
    }
    
    
    
};
