Ext.define('OnlineJudges.store.LivestatsGraph', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'LivestatsGraph',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Livestats.getJudges',
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
                name: 'altId',
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
            },
            {
                name: 'StuName',
                type: 'string'
            },
            {
                name: 'StuLName',
                type: 'string'            },
            {
                name: 'Accepted',
                type: 'int'
            }
        ]
        //sorters: ['LastName']
    }
});