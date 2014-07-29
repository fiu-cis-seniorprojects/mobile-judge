Ext.define('OnlineJudges.view.judge.Confirmation', {
    extend: 'Ext.Panel',
    alias: 'widget.judgeConfirmation',

    requires:['Ext.field.Hidden'],

    config: {
        layout: 'card',
        scrollable: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Welcome',
                items: [
                    {
                        align: 'left',
                        hidden: true,
                        text: 'Back',
                        ui: 'back',
                        handler: function(btn) {
                            var me = btn.up('judgeConfirmation'),
                                index = me.getActiveIndex();

                            if (index <= 0) return;
                            if (index == 2) me.down('button[ui=confirm]').setText('Next').setUi('forward');
                            me.animateActiveItem(--index, {type:'slide', direction:'right'});
                            if (index == 0) btn.hide();
                        }
                    },
                    {
                        align: 'right',
                        text: 'Next',
                        ui: 'forward',
                        handler: function(btn) {
                            var me = btn.up('judgeConfirmation'),
                                index = me.getActiveIndex();

                            if (index >= 2) return;
                            me.animateActiveItem(++index, {type:'slide', direction:'left'});
                            me.down('button[ui=back]').show();
                            if (index == 2) btn.setText('Done').setUi('confirm');
                        }
                    }
                ]
            },
            {
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Personal Info',
                        margin: '.5em .5em 1.5em',
                        defaults:{
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                placeHolder: 'Title',
                                name: 'Title'
                            },
                            {
                                placeHolder: 'First Name',
                                name: 'FirstName'
                            },
                            {
                                placeHolder: 'Last Name',
                                name: 'LastName'
                            },
                            {
                                placeHolder: 'Affiliation',
                                name: 'Affiliation'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                layout: 'fit',
                margin: '.5em .5em 1.5em',
                title: 'Mark conflict of interest',
                items: [
                    {
                        xtype: 'list',
                        disableSelection: true,
                        itemTpl: [
                            '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background: none">',
                                '<div class="x-form-label" style="background: none;padding: 0">',
                                    '<div>{FirstName} {LastName}</div>',
                                    '<div style="font-size: 12px">Project: {Project}</div>',
                                '</div>',
                                '<div class="x-component-outer">',
                                    '<div class="x-unsized x-field-input" style="border: 0; background: none;">',
                                        '<input type="checkbox" <tpl if=\'Selected === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                        '<div class="x-field-mask"></div>',
                                    '</div>',
                                '</div>',
                            '</div>'
                        ],
                        store: 'Students',
                        grouped: true,
                        listeners: {
                            itemtap: function(me, index, target, record) {
                                var selected = record.get('Selected');
                                record.set('Selected', !selected);
                            }
                        }
                    }
                ]
            },
            {
                xtype:'formpanel',
                items:[
                    {
                        xtype: 'fieldset',
                        title: 'Account',
                        margin: '.5em .5em 1.5em',
                        defaults:{
                            xtype: 'passwordfield'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'id'
                            },
                            {
                                xtype: 'emailfield',
                                readOnly: true,
                                name: 'Email',
                                placeHolder: 'email@example.com'
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Password must be 8 characters with at least one letter and number.',
                                margin: '.5em .5em 1.5em',
                                defaults: {
                                    xtype: 'passwordfield'
                                },
                                items: [
                                    {
                                        placeHolder: 'Password',
                                        name: 'Password'
                                    },
                                    {
                                        placeHolder: 'Retype Password',
                                        name: 'Confirm'
                                    }
                                ]
                            },                            
                        ]
                    }
                ]
            }
        ]
    },

    getActiveIndex: function() {
        return this.items.indexOf(this.getActiveItem())-1;
    },

    initialize: function() {
        var store = Ext.getStore('Students');
        if (!store.isLoaded()) store.load();
    },

    setValues: function(invite) {
        Ext.each(this.query('formpanel'), function(fp){
           fp.setValues(invite);
        });
    },

    getValues: function() {
        var store = Ext.getStore('Students'),
            values = {};

        Ext.each(this.query('formpanel'), function(fp) {
            Ext.apply(values, fp.getValues());
        });

        values.Conflicts = [];

        store.each(function(item){
           if (item.get('Selected')) values.Conflicts.push(item.get('id'));
        });

        return values;
    }
});