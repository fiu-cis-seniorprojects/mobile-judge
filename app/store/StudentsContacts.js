Ext.define('OnlineJudges.store.StudentsContacts', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],
    config: {
        storeId: 'StudentsContacts',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Email.getStudentsContacts',
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
                type: 'String'
            },
            {
                name: 'Send',
                type: 'boolean',
                defaultValue: true
            }
        ],
        sorters: 'FirstName',
    }
});