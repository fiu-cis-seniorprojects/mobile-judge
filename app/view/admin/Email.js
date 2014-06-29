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
        padding: '5',
        items: [
            {
                xtype: 'panel',
                name: 'filterPanel',
                layout: 'auto',
                scrollable: true,
                margin: '5 5 5 5',
                

                items: [{
                    xtype: 'fieldset',
                    title: 'Students',
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'allStudents',
                        label: 'All',
                        checked: false
                        //labelWrap: true

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
                }
                , {
                    xtype: 'selectfield',
                    label: 'Terms',
                    displayField: 'id',
                    store: 'Terms'
                }
                ]
            }, {
                xtype: 'panel',
                name: 'listPanel',
                layout: 'vbox',
                margin: '5 5 5 5',
                items: [{
                    xtype: 'label',
                    html: '<h4><b>Students</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '{FirstName} {LastName} <a style="font-size:small">({Email})</a>',
                    ui: 'round',
                    mode: 'MULTI', 
                    flex: 3,
                    store: 'StudentsContacts'
                }, {
                    xtype: 'label',
                    html: '<h4><b>Judges</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '{FirstName} {LastName} <a style="font-size:small">({Email})</a>',
                    mode: 'MULTI',
                    flex: 3,
                    ui: 'round',
                    store: 'JudgesContacts'
                }, {
                    xtype: 'label',
                    html: '<h4><b>Extra e-mails</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    itemTpl: '{name}',
                    ui: 'round',
                    flex: 3,
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
                margin: '5 5 5 5',
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

    },
    initialize: function () {
        var store = Ext.getStore('StudentsContacts');
        if (!store.isLoaded()) store.load();

        var judgesStore = Ext.getStore('JudgesContacts');
        if (!judgesStore.isLoaded()) judgesStore.load();
    }

});