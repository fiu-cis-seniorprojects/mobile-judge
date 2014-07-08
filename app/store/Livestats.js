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
                //idProperty: 'id',
                rootProperty: 'data'
            }
        },
        fields: [
            {
                name: 'id',
                type: 'int'
            }, 
            {
                name: 'Name',
                type: 'string'
            }, 
            {
                name: 'LastName',
                type: 'string'
            },
            {
                name: 'RawGrade',
                type: 'int'
            },
            {
                name: 'ApprovedGrade',
                type: 'int'
            },
            {
                name: 'project',
                type: 'string'
            },
            {
                name: 'location',
                type: 'string'
            }
        ],
        //sorters: ['RawGrade', 'ApprovedGrade']
        sorters: ['id']
    }
});