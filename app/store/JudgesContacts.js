Ext.define('OnlineJudges.store.JudgesContacts', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],
    config: {
        storeId: 'JudgesContacts',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Email.getJudgesContacts',
            paramsAsHash: false,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
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
                name: 'Term',
                type: 'string'
            },
            {
                name: 'Response',
                type: 'string'
            },
            {
                name: 'Send',
                type: 'boolean',
                defaultValue: true
            }
        ],
        sorters: 'FirstName'
    }
});