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
                    align: 'right',
                    hidden: true,
                    //iconCls: '',
                    text: 'Selection',
                    itemId: 'LivestatsBtn'
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
                            }
                        ]
                    },
                    {
                        xtype: 'questions'
                    },

                    {
                        xtype: 'email'
                    },

                    {
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