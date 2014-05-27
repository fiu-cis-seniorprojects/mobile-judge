Ext.define('OnlineJudges.store.student.Judges', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'studentJudges',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Judges.getByStudent',
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
            }, 'Email', 'FirstName', 'LastName', 'Title', 'Affiliation', 'QuestionValues', 'Comments',
            {
                name:'StudentId',
                type: 'int'
            },
            {
                name:'Grade',
                type: 'int'
            },
            {
                name:'Accepted',
                type:'boolean'
            }
        ],
        sorters: ['FirstName','LastName'],
        grouper: function(record) {
            return record.get('FirstName')[0].toUpperCase();
        }
    }
});