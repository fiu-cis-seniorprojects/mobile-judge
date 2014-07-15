Ext.define("OnlineJudges.view.admin.StatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.statsList",
    
    requires:[
        'Ext.plugin.PullRefresh',
    ],

    config: {
        title: 'StatsList',
        iconCls: 'favorites',
        itemTpl:[
            //<tpl if= \'id == 2643936\'>TESTER</td><tpl else> --- </tpl> 
            //'<table width="100%"><tr> <td width="40%" align="left">{Name} {LastName}</tpl> <td width="30%" align="center"><tpl if= \'id == 2643936\'> Raw: {RawGrade}<tpl else>Raw: n/a</tpl></td> <td width="30%" align="right"><tpl if= \'id == 2643936\'>Approved: {ApprovedGrade}<tpl else>Approved: n/a</tpl></td> </tr></table>'
            '<table width="100%"; style="font-size:80%"><tr> <td width="40%" align="left">{Name} {LastName}</td> <td width="30%" align="center"><tpl if= \'RawGrade != null\'> Raw: {RawGrade}<tpl else>Raw: n/a</tpl></td> <td width="30%" align="right"><tpl if= \'ApprovedGrade != null\'>Approved: {ApprovedGrade}<tpl else>Approved: n/a</tpl></td> </tr></table>'
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