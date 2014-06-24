Ext.define("OnlineJudges.view.admin.LivestatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.livestatsList",
    
    requires:[
        'Ext.plugin.PullRefresh'
    ],

    
    config: {
        itemTpl: [
            '<div align="left">{FirstName} {LastName}</div>',
            '<div align="right"><tpl if= \'Grade != null\'>Grade: {Grade}<tpl else>Grade: N/A </tpl></div>',
            '<div class="x-component-outer">',
            '<div align="left"  style="font-size:12px">Student ID: {id}</div>', 
            '<div align="left"  style="font-size:12px"></div>',
            '</div>'
        ],
        store: 'LivestatsGraph',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{type: 'pullrefresh'}]
    },
        initialize: function() {
        var store = Ext.getStore('LivestatsGraph');
        if (!store.isLoaded()) store.load();
    }
});