Ext.define('OnlineJudges.view.admin.NewEmailTemplate', {
    extend: 'Ext.Panel',
    alias: 'widget.emailTemplate',
    scrollable: true,
    tinyMCEinitialized : false,

    config: {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Fields:',
                        options: [
                            { text: 'Sender\'s email', value: 'sender email' },
                            { text: 'Sender\'s Name', value: 'sender name' },
                            { text: 'Recipient\'s email', value: 'recipient email' },
                            { text: 'Recipient\'s Name', value: 'recipient name' },
                            { text: 'Recipient\'s Last Name', value: 'recipient last name' },
                            { text: 'Recipient\'s Title', value: 'recipient title' }

                        ]
                    } 
                ]

            }, {
                xtype: 'button',
                ui: 'action',
                text: 'Insert',
                margin: 10
            },
             {
                xtype: 'panel',
                margin: 10,
                name: 'preview',
                border: 1,
                html: ['<form method="post"><textarea id="elm1" name="area"></textarea></form>'],
                styleHtmlContent: true
            }
        ]
    }
});