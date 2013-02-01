var Routes = module.exports = {
    'Site': {
        basePattern: '/',
        applet: 'Site',
        requirements: {
        }
    },

    'Admin': {
        basePattern: 'admin',
        applet: 'Admin',
        requirements: {
            _usergroup: 'admin',
            _session: true
        }
    }
};
