module.exports = {    
    'site_home': {
        pattern: '',
        controller: 'homeAction'
    },
    
    'submit': {
        pattern: 'submit',
        controller: 'submitAction',
        requirements: {
            _method: 'POST'
        }
    },
    
    'top': {
        pattern: 'top/?:page',
        controller: 'topAction',
        requirements: {
            page: /\d*/
        }
    },
    
    'new': {
        pattern: 'new/?:page',
        controller: 'newAction',
        requirements: {
            page: /\d*/
        }
    },
    
    'read': {
        pattern: 'read/:id',
        controller: 'readAction',
        requirements: {
            id: /\w+/
        }
    },
    
    '404': {
        pattern: '400',
        controller: 'catch404'
    },
    
    '500': {
        pattern: '500',
        controller: 'catch500'
    }
};