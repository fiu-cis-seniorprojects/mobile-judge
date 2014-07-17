Ext.define('OnlineJudges.store.PendingGrades', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],
    config: {
        storeId: 'PendingGrades',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.PendingGrades.getAll',
            paramsAsHash: false,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        fields: [
            {
                name: 'JudgeId',
                type: 'int'
            },
            {
                name: 'JFName',
                type: 'string'
            },
            {
                name: 'JLName',
                type: 'string'
            },
            {
                name: 'StudentId',
                type: 'int'
            },
            {
                name: 'SFName',
                type: 'string'
            },
            {
                name: 'SLName',
                type: 'string'
            },
            {
                name: 'Grade',
                type: 'int'
            },
            {
                name: 'Accepted',
                type: 'boolean'
            }
        ],
        sorters:['SFName', 'SLName', 'JSName', 'JLName']
    }
});