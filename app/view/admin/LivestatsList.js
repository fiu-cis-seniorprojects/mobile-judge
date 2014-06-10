Ext.define("OnlineJudges.view.admin.LivestatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.livestatsList",
    
    requires:[
        'Ext.plugin.PullRefresh'
    ],

    
    config: {
        itemTpl: [
            '<div align="left">{FirstName} {LastName}</div>', '<div align="right">Grade: {Grade}</div>',
            '<div align="left"  style="font-size:12px">Student ID: {id}</div>'
        ],
        store: 'Livestats',
        onItemDisclosure: false,
        disableSelection: true
    },
        initialize: function() {
        var store = Ext.getStore('Livestats');
        if (!store.isLoaded()) store.load();
    }
});