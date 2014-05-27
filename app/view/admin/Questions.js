Ext.define('OnlineJudges.view.admin.Questions', {
    extend: 'Ext.dataview.List',
    alias: 'widget.questions',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config: {
        title: 'Questions',
        iconCls: 'compose',
        itemTpl: [
            '<div class="deleteplaceholder"></div><div>{Text}</div>'
        ],
        store: 'Questions',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{type: 'pullrefresh'}]
    }
});
