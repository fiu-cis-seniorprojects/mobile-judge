Ext.define('OnlineJudges.view.admin.Email', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.email',
    scrollable: true,

    requires: ['Ext.form.FieldSet', 'Ext.carousel.Carousel', 'Ext.List'],

    config: {
        title: 'Emails',
        iconCls: 'reply',
        cls: 'home',
        indicator: false,

        items: [
            {
                xtype: 'panel',
                name: 'filterPanel',
                layout: 'auto',
                scrollable: true,

                items: [{
                    xtype: 'fieldset',
                    title: 'Students',
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'allStudents',
                        label: 'All',
                        checked: false,
                        labelWrap: true

                    },{
                        xtype: 'checkboxfield',
                        name: 'activeStudents',
                        label: 'Current',
                        checked: false,
                        labelWrap: true
                    }, {
                        xtype: 'checkboxfield',
                        name: 'pastStudents',
                        label: 'Past',
                        checked: false,
                        labelWrap: true
                    }, ]
                }, {
                    xtype: 'fieldset',
                    title: 'Judges',
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'allJudges',
                        label: 'All',
                        checked: false,
                        labelWrap: true
                    }, {
                        xtype: 'checkboxfield',
                        name: 'activeJudges',
                        label: 'Current',
                        checked: false,
                        labelWrap: true
                    }, {
                        xtype: 'checkboxfield',
                        name: 'pastJudges',
                        label: 'Past',
                        checked: false,
                        labelWrap: true
                    }, ]
                }, {
                    xtype: 'fieldset',
                    title: "Extra e-mails (one per line)",
                    items: [{
                        xtype: 'textareafield',
                        name: 'extraEmails'
                    }]
                }]
            }, {
                xtype: 'panel',
                name: 'listPanel',
                layout: 'vbox',
                order: 3,
                items: [{
                    xtype: 'label',
                    html: '<h4><b>Students</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '<table><tr><td style="font-size:small" width="40%"><b>{name}</b> </td>    <td width="60%" style="font-size:small">{email}</td></tr></table>',
                    ui: 'round',
                    mode: 'MULTI',
                    flex: 4,
                    store: { 
                        fields: ['name', 'email'],
                        data: [
                            { name: 'Cowper', email: 'cowper@gmail.com' },
                            { name: 'Everett', email: 'cowper@gmail.com' },
                            { name: 'Everett', email: 'cowper@gmail.com' },
                            { name: 'University', email: 'cowper@gmail.com' },
                            { name: 'Forest', email: 'cowper@gmail.com' }
                        ]
                    }
                }, {
                    xtype: 'label',
                    html: '<h4><b>Judges</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '{name}',
                    mode: 'MULTI',
                    flex: 4,
                    ui: 'round',
                    store: {
                        fields: ['name'],
                        data: [
                            { name: 'Cowper' },
                            { name: 'Everett' },
                            { name: 'University' },
                            { name: 'Forest' }
                        ]
                    }
                }, {
                    xtype: 'label',
                    html: '<h4><b>Extra e-mails</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '{name}',
                    ui: 'round',
                    flex: 4,
                    store: {
                        fields: ['name'],
                        data: [
                            { name: 'Cowper' },
                            { name: 'Everett' },
                            { name: 'University' },
                            { name: 'Forest' }
                        ]
                    }
                }]
            }, {
                xtype: 'panel',
                name: 'sendPanel',
                scrollable: true,
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: 'Template:',
                                options: [
                                    { text: 'First Option', value: 'first' },
                                    { text: 'Second Option', value: 'second' },
                                    { text: 'Third Option', value: 'third' },
                                    { text: 'Create a new one', value: 'CREATE_NEW'}
                                ]
                            }, {
                                xtype: 'textfield',
                                label: 'Subject:',
                                name: 'subject'
                            }
                        ]
                    }
                ]
            }

        ]

    }

});