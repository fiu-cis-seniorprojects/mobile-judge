Ext.define('OnlineJudges.view.admin.StudentView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminStudentView',

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
                    xtype:'textfield',
                    labelWidth: '120px'
                },
                items:[
                    {
                        label: 'First Name',
                        name: 'FirstName',
                        itemId: 'studentFName',
                        readOnly:true
                    },
                    {
                        label: 'Last Name',
                        name: 'LastName',
                        itemId: 'studentLName',
                        readOnly:true
                    },
                    {
                        label: 'Email',
                        name: 'Email',
                        itemId: 'studentEmail',
                        readOnly:true
                    },
                    {
                        label: 'Panther ID',
                        name: 'id',
                        readOnly:true
                    },
                    {
                        label: 'Project',
                        name: 'Project',
                        readOnly:true
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items:[
                            {
                                xtype: 'textfield',
                                labelWidth: '120px',
                                name: 'Location',
                                label: 'Location',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                itemId: 'showMapBtn',
                                text: 'Map',
                                width: '60px',
                                margin: '6'
                            }
                        ]
                    },
                    {
                        label: 'Grade',
                        name: 'Grade',
                        placeHolder: '--',
                        readOnly:true
                    }
                ]
            },
            {
                xtype:'button',
                text: 'Show Judges',
                ui:'forward',
                margin: '10 20 0 10'
            },
            {
                xtype: 'button',
                itemId: 'studentRolesBtnAdmin',
                text: 'Roles',
                ui: 'action-round',
                margin: '10 20 0 10'
            }
        ]
    }
});