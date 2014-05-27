Ext.define('OnlineJudges.store.judge.Students', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'judgeStudents',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Students.getByJudge',
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
            }, 'Email', 'FirstName', 'LastName', 'Project', 'Location', 'QuestionValues', 'Comments',
            {
                name: 'JudgeId',
                type: 'int'
            },
            {
                name: 'JudgeGrade',
                type: 'int'
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
        sorters: ['FirstName','LastName'],
        grouper: function(record) {
            return record.get('FirstName')[0].toUpperCase();
        }
    }
});