Ext.define('OnlineJudges.view.admin.Settings',{
    extend: 'Ext.form.Panel',
    alias: 'widget.settings',

    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Url',
        'Ext.field.Text',
        'Ext.field.Checkbox',
        'Ext.field.Select',
        'Ext.field.Spinner',
        'Ext.field.TextArea',
        'Ext.field.DatePicker'
    ],

    config: {
        title: 'Settings',
        padding: '5 5 0 5',
        iconCls: 'settings',
        layout: {
            type: 'vbox'
        },
        defaults:{
            xtype: 'fieldset',
            defaults:{
                xtype: 'textfield'
            }
        },
        items: [
            {
                items: [
                    {
                        xtype:'selectfield',
                        label: 'Term',
                        name: 'Term',
                        options: [
                            {text:'Fall 2013', value: 'Fall 2013'},
                            {text:'Spring 2014', value: 'Spring 2014'},
                            {text:'Summer 2014', value: 'Summer 2014'},
                            {text:'Fall 2014', value: 'Fall 2014'},
                            {text:'Spring 2015', value: 'Spring 2015'},
                            {text:'Summer 2015', value: 'Summer 2015'},
                            {text:'Fall 2015', value: 'Fall 2015'},
                            {text:'Spring 2016', value: 'Spring 2016'},
                            {text:'Summer 2016', value: 'Summer 2016'},
                            {text:'Fall 2016', value: 'Fall 2016'},
                            {text:'Spring 2017', value: 'Spring 2017'},
                            {text:'Summer 2017', value: 'Summer 2017'},
                            {text:'Fall 2017', value: 'Fall 2017'},
                            {text:'Spring 2018', value: 'Spring 2018'},
                            {text:'Summer 2018', value: 'Summer 2018'},
                            {text:'Fall 2018', value: 'Fall 2018'},
                            {text:'Spring 2019', value: 'Spring 2019'},
                            {text:'Summer 2019', value: 'Summer 2019'},
                            {text:'Fall 2019', value: 'Fall 2019'},
                            {text:'Spring 2020', value: 'Spring 2020'},
                            {text:'Summer 2020', value: 'Summer 2020'},
                            {text:'Fall 2020', value: 'Fall 2020'},
                            {text:'Spring 2021', value: 'Spring 2021'},
                            {text:'Summer 2021', value: 'Summer 2021'},
                            {text:'Fall 2021', value: 'Fall 2021'},
                            {text:'Spring 2022', value: 'Spring 2022'},
                            {text:'Summer 2022', value: 'Summer 2022'},
                            {text:'Fall 2022', value: 'Fall 2022'},
                            {text:'Spring 2023', value: 'Spring 2023'},
                            {text:'Summer 2023', value: 'Summer 2023'},
                            {text:'Fall 2023', value: 'Fall 2023'}
                        ]
                    }
                ]
            },
            {
                title: 'Judges can login',
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'AllowJudgesToLogin',
                        label: 'Enabled'
                    }
                ]
            },
            {
                title: 'Students can see grades',
                items:[
                    {
                        xtype: 'checkboxfield',
                        name: 'GradesPosted',
                        label: 'Enabled'
                    }
                ]
            },
            {
                title: 'Students Per Judge',
                items: [
                    {
                        xtype: 'spinnerfield',
                        label: 'Exact',
                        name: 'StudentsPerJudge',
                        maxValue: 10,
                        minValue: 1,
                        stepValue: 1,
                        defaultValue: 5
                    }
                ]
            },
            {
                title: 'Event Info',
                items: [
                    {
                        xtype: 'datepickerfield',
                        label: 'Date',
                        name: 'Date',
                        placeHolder: 'mm/dd/yyyy',
                        picker: {
                            yearFrom: 2013,
                            yearTo: 2100
                        }
                    },
                    {
                        label: 'Time',
                        name: 'Time'
                    },
                    {
                        label: 'Place',
                        name: 'Location'
                    },
                    {
                        xtype: 'urlfield',
                        label: 'Map Url',
                        name: 'MapImage'
                    }
                ]
            },
            {
                title: 'Email Info',
                items: [
                    {
                        label: 'Subject',
                        name: 'Subject'
                    },
                    {
                        xtype: 'textareafield',
                        label: 'Body',
                        name: 'EmailText'
                    }
                ]
            },
            {
                title: 'Sr. Project Website',
                items: [
                    {
                        xtype: 'urlfield',
                        label: 'Url',
                        name: 'SrProjectURL'
                    },
                    {
                        label: 'Token',
                        name: 'SrProjectToken'
                    }
                ]
            },
            {
                title: 'Stats Refresh Rate in Seconds',
                items: [
                    {
                        xtype: 'spinnerfield',
                        label: '(0 = off)',
                        name: 'RefreshRate',
                        maxValue: 60,
                        minValue: 0,
                        stepValue: 1,
                        defaultValue: 0
                    }
                ]
            },
             {
                 xtype: 'button',
                 itemId: 'questionsBtn',
                 text: 'Questions Config',
                 margin: '20 10 10 10'
             },
            {
                xtype: 'button',
                itemId: 'changePwdBtn',
                text: 'Change Password',
                margin: '20 10 10 10'
            },
            {
                xtype: 'button',
                itemId: 'myRolesBtn',
                ui: 'action-round',
                text: 'Roles',
                margin: '10 10 10 10'

            },
            {
                xtype: 'button',
                itemId: 'myDefaultRoleBtn',
                ui: 'action-round',
                text: 'Default Role',
                margin: '10 10 10 10'

            },
            {
                xtype: 'button',
                ui: 'decline',
                itemId: 'resetBtn',
                text: 'Reset App',
                margin: '20 10 10 10'
            },
        ]
    }
});