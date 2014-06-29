Ext.define("OnlineJudges.view.admin.LivestatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.livestatsList",
    
    requires:[
        'Ext.plugin.PullRefresh',
    ],

    config: {
        title: 'Livestats',
        iconCls: 'favorites',
        itemTpl:[
            '<table width="100%"><tr> <td width="60%" align="left">{Name} {LastName}</td> <td width="20%" align="right">{RawGrade}</td> <td width="20%" align="right">{ApprovedGrade}</td> </tr></table>'
        ],
        store: 'Livestats'
        //onItemDisclosure: false,
        //disableSelection: true,
        //plugins: [{type: 'pullrefresh'}]
    },

        initialize: function() {
         var store = Ext.getStore('Livestats');
             if (!store.isLoaded()) store.load();
        // var storeGraph = Ext.getStore('LivestatsGraph');
        //     if (!storeGraph.isLoaded()) storeGraph.load();
        this.callParent();
    }
});