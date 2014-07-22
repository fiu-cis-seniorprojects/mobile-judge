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
                //margin: '5 5 5 5',
                

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
                    name:'extraEmails',
                    items: [{
                        xtype: 'textareafield',
                        name: 'extraEmails'
                    }]
                }]
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
                    disableSelection: true,
                    itemTpl: [
                               '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
                                   '<div class="x-form-label" style="background:none;padding: 0">',
                                       '<div>{FirstName} {LastName}</div>',
                                       '<div style="font-size:12px">Email: {Email}</div>',
                                   '</div>',
                                   '<div class="x-component-outer">',
                                       '<div class="x-unsized x-field-input" style="border:0;background:none;">',
                                           '<input type="checkbox" <tpl if=\'Send === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                           '<div class="x-field-mask"></div>',
                                       '</div>',
                                   '</div>',
                               '</div>'
                    ],
                    ui:'round',
                    flex: 3,
                    emptyText: '<a style="font-size:12px">The are no students to display<a>',
                    store: 'StudentsContacts',
                    listeners: {
                        itemtap: function (item, num, ev, record) {
                            var flag = record.get('Send');
                            if (flag === true) {
                                record.set('Send', false);
                            } else {
                                record.set('Send', true);
                            }
                        }
                    }
                    

                }, {
                    xtype: 'label',
                    html: '<h4><b>Judges</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    disableSelection: true,
                    emptyText: '<a style="font-size:12px">The are no judges to display<a>',
                    itemTpl: [
                               '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
                                   '<div class="x-form-label" style="background:none;padding: 0">',
                                       '<div>{FirstName} {LastName}</div>',
                                       '<div style="font-size:12px">{Email}</div>',
                                   '</div>',
                                   '<div class="x-component-outer">',
                                       '<div class="x-unsized x-field-input" style="border:0;background:none;">',
                                           '<input type="checkbox" <tpl if=\'Send === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                           '<div class="x-field-mask"></div>',
                                       '</div>',
                                   '</div>',
                               '</div>'
                    ],
                    flex: 3,
                    ui: 'round',
                    store: 'JudgesContacts',
                    listeners: {
                        itemtap: function (item, num, ev, record) {
                            var flag = record.get('Send');
                            if (flag === true) {
                                record.set('Send', false);
                            } else {
                                record.set('Send', true);
                            }
                        }
                    }
                }, {
                    xtype: 'label',
                    html: '<h4><b>Extra e-mails</b></h4>',
                    styleHtmlContent: true,
                    flex: 1
                }, {
                    xtype: 'list',
                    disableSelection: true,
                    emptyText: '<a style="font-size:12px">The are no extra e-mails to display<a>',
                    itemTpl: [
                               '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
                                   '<div class="x-form-label" style="background:none;padding: 0">',
                                        '<div>{FirstName} {LastName}</div>',
                                       '<div  style="font-size:12px">{Email}</div>',
                                   '</div>',
                                   '<div class="x-component-outer">',
                                       '<div class="x-unsized x-field-input" style="border:0;background:none;">',
                                           '<input type="checkbox" <tpl if=\'Send === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                           '<div class="x-field-mask"></div>',
                                       '</div>',
                                   '</div>',
                               '</div>'
                    ],
                    ui: 'round',
                    flex: 3,
                    store: 'ExtraEmails',
                    filters: [{
                        property: 'Term',
                        value: 'Not display'
                    }],
                    listeners: {
                        itemtap: function (item, num, ev, record) {
                            var flag = record.get('Send');
                            if (flag === true) {
                                record.set('Send', false);
                            } else {
                                record.set('Send', true);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                name: 'sendPanel',
                margin: '5 5 5 5',
                scrollable:true,
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'selectfield',
                                name: 'templates',
                                label: 'Template:',
                                store: 'EmailTemplates',
                                displayField: 'TemplateTitle',
                                autoSelect: false
                            }, {
                                xtype: 'textfield',
                                name: 'subject',
                                label: 'Subject:',
                                name: 'subject'
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                margin: '5 5 5 5',
                                items: [
                                    {
                                        xtype: 'button',
                                        name: 'editTemplate',
                                        docked: 'right',
                                        iconCls: 'compose',
                                        margin: '5 5 5 5',
                                    },
                                    {
                                        xtype: 'button',
                                        name: 'addTemplate',
                                        docked: 'right',
                                        iconCls: 'add',
                                        margin: '5 5 5 5',
                                    }
                                ]
                            }, {
                                xtype: 'panel',
                                name: 'bodyPanel',
                                scrollable: true,
                                styleHtmlContent: true,
                                minHeight: '300px'
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
        store.filter('Term','NOT DISPLAY')

        var judgesStore = Ext.getStore('JudgesContacts');
        if (!judgesStore.isLoaded()) judgesStore.load();
        judgesStore.filter('Term', 'NOT DISPLAY');

        var termsStore = Ext.getStore('Terms');
        if (!termsStore.isLoaded()) termsStore.load();

        var extraStr = Ext.getStore('ExtraEmails');
        if (!extraStr.isLoaded()) extraStr.load();

        var tplStr = Ext.getStore('EmailTemplates');
        if(!tplStr.isLoaded()) tplStr.load()
        
    }

});