Ext.define('OnlineJudges.view.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.login',

    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'CIS 4911 Online Judges'
            },
            {
                xtype: 'fieldset',
                margin: '.5em .5em 1.5em',
                title: 'Login',
                items: [
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        placeHolder: 'email@example.com'
                        //,value: 'aparedes'
                        //,value: 'admin'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        placeHolder: 'password'
                        //,value: 'password'
                        //,value: 'admin'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'vbox'
                },
                margin: '10px',
                items:[
                    {
                        xtype: 'button',
                        margin: '10px',
                        itemId: 'login',
                        text: 'Login'
                    }
                ]
            }
        ]
    }

});