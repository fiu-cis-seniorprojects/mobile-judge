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
            paramOrder: 'id',
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
                name: 'Accepted',
                type: 'boolean'
            }
        ],
        sorters: ['RawGrade', 'ApprovedGrade','Name','LastName']
    }
});