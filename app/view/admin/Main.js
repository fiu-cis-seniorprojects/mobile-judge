Ext.define('OnlineJudges.view.admin.Main', {
    extend: 'Ext.navigation.View',
    alias: 'widget.adminMain',

    requires:[
        'Ext.tab.Panel',
        'Ext.dataview.List',
        'Ext.plugin.PullRefresh',
        'Ext.field.Spinner',
        'Ext.field.DatePicker'
    ],

    config: {
        navigationBar: {
            docked: 'top',
            items: [
                {
                    align: 'right',
                    hidden: true,
                    iconCls: 'arrow_left',
                    itemId: 'backBtn',
                    ui: 'action'
                },
                {
                    align: 'right',
                    disabled: false,
                    iconCls: 'refresh',
                    itemId: 'navigBtn',
                    ui: 'action'
                },        
                {
                    text: 'Logout',
                    ui: 'back',
                    itemId: 'logoutBtn',
                    align: 'left'
                },
                {
                    xtype: 'button',
                    text: 'Admin',
                    itemId: 'rolesBtnAdmin'   
                },
                {
                    align: 'right',
                    hidden: true,
                    text: 'Students',
                    itemId: 'LivestatsBtn'
                },
                {
                    align: 'right',
                    hidden: true,
                    text: 'Save',
                    itemId: 'GradeSaveBtn',
                    listeners: {
                        tap: function() {
                            var store = Ext.getStore('PendingGrades');
                            store.each(function(item, index, length){
                                Ext.php.PendingGrades.setAccept(item.get('JudgeId'), item.get('StudentId'), item.get('Accepted'));
                            });
                            Ext.Msg.alert('Save', 'Successful Save');
                        }
                    }
                }
            ]
        },
        layout: {
            type: 'card',
            animation: null
        },
        items:[
            {
                xtype:'tabpanel',
                layout: {
                    type: 'card',
                    animation: null
                },
                items: [
                    {
                        xtype: 'adminHome'
                    },
                    {
                        xtype: 'tabpanel',
                        layout: {
                            type: 'card',
                            animation: null
                        },
                        style:'font-size:90%',
                        title: 'People',
                        centered: false,
                        iconCls: 'team',
                        items: [
                            {
                                xtype: 'adminStudents'
                            },
                            {
                                xtype: 'adminJudges'
                            },
                            {
                                xtype: 'adminInvitations'
                            },
                            {
                                xtype: 'pendingGrades'
                            }
                        ]
                    },
                    //{
                    //    xtype: 'questions'
                    //},

                    {
                        xtype: 'email'
                    },

                    {
                        title: 'Stats',
                        xtype: 'livestats'
                    },
                    {
                        xtype: 'settings'
                    }
                ],
                tabBar: {
                    docked: 'bottom'
                }
            }
        ]
    },

    popAll: function() {
        var me = this, innerItems = this.getInnerItems();
        me.removeAll(innerItems);
        var buttonStack = me.getNavigationBar().backButtonStack;
        var btLength = buttonStack.length;
        for (var i = 0; i < btLength; i++) {
            buttonStack.pop();
        }
    }
});