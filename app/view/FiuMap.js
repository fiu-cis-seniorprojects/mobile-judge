Ext.define('OnlineJudges.view.FiuMap', {
    extend: 'Ext.Panel',
    alias: 'widget.fiumap',

    requires:[
        'OnlineJudges.ux.PinchZoomImage',
        'OnlineJudges.ux.PDF'
    ],

    config: {
        layout: 'fit',
        items:[
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'CIS FIU Map',
                items: [
                    {
                        text: 'Done',
                        align: 'right',
                        handler: function(btn) {
                            btn.up('panel').hide({type:'slideOut', direction:'down'});
                        }
                    }
                ]
            }
        ]
    },

    constructor: function(mapUrl) {
        var me = this;

        me.config.items.push({
            xtype: mapUrl.endsWith('pdf') ? 'pdfpanel' : 'pinchzoomimage',
            src: mapUrl,
            style: {
                backgroundColor: '#333'
            }
        });

        me.callParent();
    }
});