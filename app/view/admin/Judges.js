Ext.define('OnlineJudges.view.admin.Judges', {
    extend:'Ext.dataview.List',
    alias: 'widget.adminJudges',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config: {
        title: 'Judges',
        itemTpl: [
            '<div>{FirstName} {LastName}</div>',
            '<div style="font-size: 12px">Email: {Email}</div>',
            '<div style="font-size: 12px">Affiliation: {Affiliation}</div>',
            '<div style="font-size: 12px">Title: {Title}</div>'
        ],
        grouped: true,
        indexBar: true,
        store: 'Judges',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{ type: 'pullrefresh' }]
    }
});
