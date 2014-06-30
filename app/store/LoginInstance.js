Ext.define('OnlineJudges.store.LoginInstance', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'LoginInstance',
        proxy: {
            type: 'localstorage',
            id: 'id'
        },
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'email',
                type: 'string'
            },
            {
                name: 'password',
                type: 'string'
            },
            {
                name: 'roles',
                type: 'string'
            },
            {
                name: 'defaultrole',
                type: 'string'
            }
        ],
        sorters:['Text']
    }
});