Ext.define('OnlineJudges.store.ExtraEmails', {
    extend: 'Ext.data.Store',
    
    requires:[
        'Ext.data.proxy.LocalStorage'
    ],

    config: {
        storeId: 'ExtraEmails',
        proxy: {
            type: 'localstorage',
            
        },
        fields: [
            {
                name: 'Email',
                type: 'string'
            },
            {
                name: 'FirstName',
                type: 'string'
            },
            {
                name: 'LastName',
                type: 'string'
            },
            {
                name: 'Send',
                type: 'boolean',
                defaultValue: true
            }
        ]
    }
});