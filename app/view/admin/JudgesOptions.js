Ext.define('OnlineJudges.view.admin.JudgesOptions', {
    extend: 'Ext.Panel',
    alias: 'widget.judgesOptions',
    

    config: {
        items: [
            {
                xtype: 'fieldset',
                layout: 'vbox',
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
            },
            {
                xtype: 'button',
                name: 'ok',
                ui: 'action',
                margin: 5,
                text: 'OK',
         
            }
        ]
    }
});