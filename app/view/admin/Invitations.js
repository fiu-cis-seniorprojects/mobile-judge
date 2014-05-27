Ext.define('OnlineJudges.view.admin.Invitations', {
    extend:'Ext.dataview.List',
    alias: 'widget.adminInvitations',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config: {
        title: 'Invitations',
        itemTpl: [
            '<div>{FirstName} {LastName}</div>',
            '<div style="font-size: 12px">Email: {Email}</div>',
            '<div style="font-size: 12px">RSVP: ',
            '<tpl if="Response === true">ACCEPTED',
            '<tpl elseif="Response === false">DECLINED',
            '<tpl else>PENDING...</tpl>',
            '</div>'
        ],
        grouped: true,
        indexBar: true,
        store: 'Invitations',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{type: 'pullrefresh'}]
    }
});
