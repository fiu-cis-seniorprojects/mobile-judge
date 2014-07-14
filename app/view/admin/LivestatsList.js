Ext.define("OnlineJudges.view.admin.LivestatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.livestatsList",
    
    requires:[
        'Ext.plugin.PullRefresh',
    ],

    config: {
        title: 'LivestatsList',
        iconCls: 'favorites',
        itemTpl:[
            '<table width="100%"><tr> <td width="40%" align="left">{Name} {LastName}</td> <td width="30%" align="center"><tpl if= \'RawGrade != null\'> Raw: {RawGrade}<tpl else>Raw: n/a</tpl></td> <td width="30%" align="right"><tpl if= \'ApprovedGrade != null\'>Approved: {ApprovedGrade}<tpl else>Approved: n/a</tpl></td> </tr></table>'
            //'<table width="100%"><tr> <td width="40%" align="left">{Name} {LastName}</td> <td width="30%" align="center"><tpl if= \'RawGrade != null\'> Raw: n/a<tpl else>Raw: n/a</tpl></td> <td width="30%" align="right"><tpl if= \'ApprovedGrade != null\'>Approved: n/a<tpl else>Approved: n/a</tpl></td> </tr></table>'
        ],
        store: 'Livestats'
        //onItemDisclosure: false,
        //disableSelection: true,
        //plugins: [{type: 'pullrefresh'}]
    },

        initialize: function() {
        // var store = Ext.getStore('Livestats');
        //     if (!store.isLoaded()) store.load();
        // var storeGraph = Ext.getStore('LivestatsGraph');
        //     if (!storeGraph.isLoaded()) storeGraph.load();
        this.callParent();
    }
});