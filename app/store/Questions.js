Ext.define('OnlineJudges.store.Questions', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'Questions',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Questions.getAll',
            paramsAsHash: false,
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'data'
            }
        },
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'Text',
                type: 'string'
            }
        ],
        sorters:['Text']
    }
});