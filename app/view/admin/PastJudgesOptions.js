Ext.define('OnlineJudges.view.admin.PastJudgesOptions', {
    extend: 'Ext.Panel',
    alias: 'widget.pastJudgesOptions',

    config: {
        
        items: [
            {
                xtype: 'panel',
                layout: 'vbox',
                items:[
                     {
                         xtype: 'fieldset',

                         items: [
                             {
                                 xtype: 'checkboxfield',
                                 name: 'invitedJudges',
                                 label: 'Invited',
                                 labelWrap: true,
                                 labelWidth: '60%'
                             },
                              {
                                  xtype: 'checkboxfield',
                                  name: 'pendingJudges',
                                  label: 'Pending',
                                  labelWrap: true,
                                  labelWidth: '60%'
                              },
                               {
                                   xtype: 'checkboxfield',
                                   name: 'acceptedJudges',
                                   label: 'Accepted',
                                   labelWrap: true,
                                   labelWidth: '60%'
                               },
                               {
                                   xtype: 'checkboxfield',
                                   name: 'declinedJudges',
                                   label: 'Declined',
                                   labelWrap: true,
                                   labelWidth: '60%'
                               }
                         ]
                     }, {
                         xtype: 'list',
                         name: 'terms',
                         store: 'Terms',
                         itemTpl: '{id}',
                         height: '150px',
                         width: '150px',
                         mode: 'MULTI',
                     }
                ]
            },
            {
                xtype: 'button',
                margin: '5 5 5 5',
                name: 'OKBtn',
                text: 'OK',
                ui: 'action',
            }
        ]
    }
});