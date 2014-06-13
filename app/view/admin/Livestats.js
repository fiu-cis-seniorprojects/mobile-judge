Ext.define('OnlineJudges.view.admin.Livestats', {
    extend: 'Ext.Container',
    alias: 'widget.livestats',

    requires:[

        'Ext.dataview.List',
        'Ext.form.FieldSet',
        'Ext.field.Url',
        'Ext.field.Text',
        'Ext.field.Checkbox',
        'Ext.field.Select',
        'Ext.field.Spinner',
        'Ext.field.TextArea'
    ],

    config: {
        title: 'LiveStats',
        padding: '5 5 0 5',
        iconCls: 'favorites',
        layout: {
            type: 'vbox',
            minHeight: '10px',
            scrollable: 'true'
        },
        items: [
        {
            xtype: "container",
            flex: 1,
            docked: "top",
            minHeight: '20px',
            height: '40px',
            layout: "hbox",
            items: [
                {
                    xtype: "container",
                    flex: 1,
                    height: '20px',
                    layout: "vbox",
                    xtype:'selectfield',
                    label: 'Student',
                    name: 'Student',
                    labelWrap: true,
                    displayField:'LastName',
                    store: 'Livestats',
                    valueField: 'id'
                },
                {
                    xtype: "container",
                    flex: 1,
                    height: '20px',
                    layout: "vbox",
                    xtype:'selectfield',
                    label: 'Grade',
                    name: 'Grade',
                    options: [
                    {text:'Raw', value: 'Raw'},
                    {text:'Approved', value: 'Approved'}
                    ]
                }
            ]
        },
        {
            xtype: 'livestatsList',
            flex: 1
        },
        {
            xtype: 'button',
            itemId: 'livestatsGraphBtn',
            text: 'Graph',
            margin: '20 10 20 10'
        }
        ]
    },
     initialize: function() {
        var store = Ext.getStore('Livestats');
        if (!store.isLoaded()) store.load();
    }
});
