Ext.define('OnlineJudges.store.Students', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'Students',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Students.getAll',
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
            }, 'Email', 'FirstName', 'LastName', 'Project', 'Location',
            {
                name: 'Grade',
                type: 'int'
            },
            {
                name: 'JudgeGrade',
                type: 'int'
            },
            {
                name: 'Selected',
                type: 'boolean'
            }
        ],
        sorters: ['FirstName','LastName'],
        grouper: function(record) {
            return record.get('FirstName')[0].toUpperCase();
        }
    }
});