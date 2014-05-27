Ext.define('OnlineJudges.view.admin.Home', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminHome',

    config:{
        title: 'Home',
        iconCls: 'home',
        padding: '0 5 0 5',
        defaults: {
            xtype: 'fieldset',
            defaults: {
                xtype:'textfield',
                readOnly: true,
                labelWidth: '150px'
            }
        },
        items: [
            {
                title: 'Students',
                items: [
                    {
                        name: 'students',
                        label: 'Total'
                    },
                    {
                        name: 'toGrade',
                        label: 'Pending Grade'
                    }
                ]
            },
            {
                title: 'Judges',
                items: [
                    {
                        label: 'Accepted',
                        name: 'accepted'
                    },
                    {
                        label: 'Declined',
                        name: 'declined'
                    },
                    {
                        label: 'Pending',
                        name: 'pending'
                    }
                ]
            }
        ]
    }
});