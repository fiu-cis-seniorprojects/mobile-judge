Ext.define('OnlineJudges.store.Terms', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],
    config: {
        storeId: 'Terms',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Email.getSemesters',
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
                type: 'string'
            }
        ],
        sorters: ['Term']
    }
});