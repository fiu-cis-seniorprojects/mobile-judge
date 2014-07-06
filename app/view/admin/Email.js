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
                                       '<div>{Email}</div>',
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
                    }]
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
        store.filter('Term','NOT DISPLAY')

        var judgesStore = Ext.getStore('JudgesContacts');
        if (!judgesStore.isLoaded()) judgesStore.load();

        var termsStore = Ext.getStore('Terms');
        if (!termsStore.isLoaded()) termsStore.load();
    }

});