Ext.define('OnlineJudges.view.admin.NewEmailTemplate', {
    extend: 'Ext.form.Panel',
    alias: 'widget.emailTemplate',
    scrollable: true,
    config: {
        items: [
            {
                xtype: 'textfield',
                name: 'TemplateTitle',
                label: 'Title'
            },
            {
                xtype: 'textfield',
                name: 'Subject',
                label: 'Subject'
            },
            {
                xtype: 'selectfield',
                name: 'placeHolders',
                label: 'Fields:',
                options: [
                    { text: 'Sender\'s email', value: 'SENDER_EMAIL' },
                    { text: 'Sender\'s Name', value: 'SENDER_NAME' },
                    { text: 'Recipient\'s email', value: 'RECIPIENT_EMAIL' },
                    { text: 'Recipient\'s Name', value: 'RECIPIENT_NAME' },
                    { text: 'Recipient\'s Last Name', value: 'RECIPIENT_LAST_NAME' },
                    //{ text: 'Recipient\'s Title', value: 'recipient title' }

                ]
            }, {
                xtype: 'button',
                name: 'insertPlaceHolder',
                text: 'Insert',
                margin: 10
            },
            {
                xtype: 'tabpanel',
                name: 'templateTabs',
                layout: {
                    type: 'card',
                    animation: null
                },
                margin: '5 5 5 5',
                height: '350px',
                items: [
                    {
                        title: 'Edit',
                        xtype: 'panel',
                        items: [
                            {
                                xtype: 'fieldset',
                                name: 'bodyFieldset',
                                items: [
                                    {
                                        xtype: 'textareafield',
                                        name: 'Body',
                                        itemId:'templateBody',
                                        label: 'Body',
                                        labelAlign: 'top',
                                        height: '320px'
                                    }
                                ]
                            }
                        ]

                    },
                    {
                        title: 'Preview',
                        name: 'preview',
                        height: '350px',
                        items: [
                            {
                                xtype: 'panel',
                                name: 'preview',
                                styleHtmlContent: true
                            }
                        ]
                    }
                ]

            }
        ]
    }
});