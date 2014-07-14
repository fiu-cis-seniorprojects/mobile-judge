Ext.define('OnlineJudges.store.EmailTemplates', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Direct'
    ],
    config: {
        storeId: 'EmailTemplates',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Email.getEmailTemplates',
            paramsAsHash: false,
            reader: {
                type: 'json',
                idProperty: 'TemplateID',
                rootProperty: 'data'
            }
        },
        fields: [
            {
                name: 'TemplateID',
                type: 'int'
            }, {
                name: 'TemplateTitle',
                type: 'string'
            }, {
                name: 'Subject',
                type: 'String'
            },{
                name: 'Body',
                type: 'string'
            }
        ],
        sorters: ['TemplateTitle']
    }
});