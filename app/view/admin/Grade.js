Ext.define('OnlineJudges.view.admin.Grade',{
    extend: 'Ext.form.Panel',
    alias: 'widget.adminStudentGrade',

    config: {
        padding: '0 5 0 5',
        items: [
            {
                xtype:'fieldset',
                title: 'Grade',
                items:[
                    {
                        xtype: 'textfield',
                        name: 'Grade',
                        placeHolder: '--',
                        readOnly:true
                    }
                ]
            },
            {
                xtype:'fieldset',
                title:'Comments',
                items:[
                    {
                        xtype: 'textareafield',
                        name: 'Comments',
                        readOnly:true
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type:'hbox'
                },
                items:[
                    {
                        xtype:'button',
                        text: 'Accept',
                        ui:'confirm',
                        flex: 1,
                        margin: '5'
                    },
                    {
                        xtype:'button',
                        text: 'Reject',
                        ui:'decline',
                        flex: 1,
                        margin: '5'
                    }
                ]
            }
        ]
    }
});
