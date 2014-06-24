Ext.define('OnlineJudges.view.admin.StudentGradeView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminStudentGradeView',

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
                        readOnly:true
                    },
                    {
                        label: 'Last Name',
                        name: 'LastName',
                        readOnly:true
                    },
                    {
                        label: 'Email',
                        name: 'Email',
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
                //xtype:'gradeList'
            }
        ]
    }
});