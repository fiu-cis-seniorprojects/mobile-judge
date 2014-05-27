Ext.define('OnlineJudges.view.admin.SendInvitation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminSendInvitation',

    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        items:[
            {
                xtype: 'fieldset',
                margin: '.5em .5em 1.5em',
                title: 'Judge Information',
                defaults:{
                    xtype: 'textfield'
                },
                items: [
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        placeHolder: 'email@example.com'
                    },
                    {
                        placeHolder: 'First Name',
                        name: 'firstName'
                    },
                    {
                        placeHolder: 'Last Name',
                        name: 'lastName'
                    }
                ]
            }
        ]
    }

});