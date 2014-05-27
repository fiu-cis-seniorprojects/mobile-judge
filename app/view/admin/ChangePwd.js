Ext.define('OnlineJudges.view.admin.ChangePwd', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminChangePwd',

    requires:[
        'Ext.Label',
        'Ext.field.Text'
    ],

    config: {
        items: [
            {
                xtype:'fieldset',
                margin: '.5em .5em 1.5em',
                defaults:{
                    xtype:'passwordfield',
                    required: true
                },
                items:[
                    {
                        placeHolder: 'Current Password',
                        name: 'current'
                    },
                    {
                        placeHolder: 'New Password',
                        name: 'new'
                    },
                    {
                        placeHolder: 'Confirm Password',
                        name: 'confirm'
                    }
                ]
            }
        ]
    }
});
