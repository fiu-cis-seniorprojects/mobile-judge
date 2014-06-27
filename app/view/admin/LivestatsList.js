Ext.define("OnlineJudges.view.admin.LivestatsList", {
    extend: "Ext.dataview.List",
    alias: "widget.livestatsList",
    
    requires:[
        'Ext.plugin.PullRefresh',
    ],

    config: {
        title: 'Livestats',
        iconCls: 'favorites',
        itemTpl: [
        '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
            '<div class="x-form-label" style="background:none;padding: 0">',
            '<div align="left"><tpl if= \'LastName != null\'>{Name} {LastName}<tpl else>{Name}</tpl></div>',
            '<div align="left"  style="font-size:12px"><tpl if= \'LastName != null\'> Student ID: id</tpl></div>', 
            //'<div align="left"  style="font-size:12px"></div>',
        '</div>',
            //'<div class="x-component-outer">',
            //'<div align="center"><tpl if= \'RawGrade != null\'> Raw Grade: {RawGrade}<tpl else>Raw Grade: N/A</tpl></div>',
            //'</div>',
            '<div class="x-component-outer">',
            //'<div align="right"><tpl if= \'RawGrade != null\'> Raw Grade: {RawGrade}<tpl else>Raw Grade: n/a</tpl> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <tpl if= \'ApprovedGrade != null\'>Approved Grade: {ApprovedGrade}<tpl else>Approved Grade: n/a</tpl></div>',
            '<div align="right"><tpl if= \'RawGrade != null\'> Raw Grade: n/a<tpl else>Raw Grade: n/a</tpl> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <tpl if= \'ApprovedGrade != null\'>Approved Grade: n/a<tpl else>Approved Grade: n/a</tpl></div>',
            '</div>',
        '</div>'
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