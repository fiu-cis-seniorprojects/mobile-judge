Ext.define('OnlineJudges.store.Livestats', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'Livestats',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Livestats.getAll',
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
                name: 'FirstName',
                type: 'string'
            }, 
            {
                name: 'LastName',
                type: 'string'
            },
            {
                name: 'Grade',
                type: 'int'
            }
        ],
        sorters: ['FirstName','LastName']
    }
});