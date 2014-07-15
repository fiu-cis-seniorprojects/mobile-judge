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
                    text: 'Roles',
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
                            for(i =0; i < store.getAllCount();i++)
                            {
                                        Ext.php.PendingGrades.setAccept(store.getAt(i).get('id'), store.getAt(i).get('StudentId'), store.getAt(i).get('Accepted'), function (result) {
                                            //main.setMasked(false);

                                            if (result.success === true) {
                                                
                                            }
                                            else Ext.Msg.alert('Error', result.msg, Ext.emptyFn);
                                        });
                            }
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