Ext.define('OnlineJudges.view.admin.TermsList', {
    extend: 'Ext.Panel',
    alias: 'widget.termsList',
    
    config: {
        padding: 5,
        items: [
            {
                xtype: 'list',
                name: 'terms',
                store: 'Terms',
                itemTpl: '{id}',
                height: '150px',
                width: '150px',
                mode: 'MULTI',
            }, {
                xtype: 'button',
                name: 'OKBtn',
                text: 'OK',
                ui: 'action',
            }
        ]
    }
});