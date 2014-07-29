Ext.define('OnlineJudges.view.student.Home', {
    extend: 'Ext.Panel',
    alias: 'widget.studentHome',

    requires:[
        'Ext.Label',
        'Ext.field.Text'
    ],

    config: {
        layout: 'fit',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'CIS 4911',
                items: [
                    {
                        text: 'Logout',
                        ui: 'back',
                        itemId: 'logoutBtn',
                        align: 'left'
                    },
                    {
                        text: 'Student',
                        itemId: 'studentRolesBtn'
                    },
                    {
                        iconCls: 'refresh',
                        align: 'right',
                        handler: function(btn) {
                            btn.studentHome = btn.studentHome || btn.up('studentHome');
                            btn.email = btn.email || OnlineJudges.user.Email;
                            btn.form = btn.form || btn.studentHome.down('formpanel');

                            btn.studentHome.setMasked({
                                xtype: 'loadmask',
                                message: 'Refreshing...'
                            })

                            Ext.php.Students.getByEmail(btn.email, function(student){
                                OnlineJudges.user = student;
                                btn.form.setValues(student);
                                btn.studentHome.setMasked(false);
                            });
                        }
                    }
                ]
            },
            {
                xtype: 'formpanel',
                items: [
                    {
                        xtype:'fieldset',
                        margin: '.5em .5em 1.5em',
                        defaults:{
                            xtype:'textfield',
                            labelWidth: '120px',
                            readOnly:true
                        },
                        items:[
                            {
                                label: 'First Name',
                                name: 'FirstName'
                            },
                            {
                                label: 'Last Name',
                                name: 'LastName'
                            },
                            {
                                label: 'Email',
                                name: 'Email'
                            },
                            {
                                label: 'Panther ID',
                                name: 'id'
                            },
                            {
                                label: 'Project',
                                name: 'Project'
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items:[
                                    {
                                        xtype:'textfield',
                                        readOnly: true,
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
                                placeHolder: '--'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    loadMainView: function (view, options) {
        Ext.Viewport.removeAll().add(Ext.create('widget.' + view, Ext.apply({
            title: 'CIS 4911 Online Judges'
        }, options || {})));
    },

    initialize: function() {
        this.down('formpanel').setValues(OnlineJudges.user);
    }
});