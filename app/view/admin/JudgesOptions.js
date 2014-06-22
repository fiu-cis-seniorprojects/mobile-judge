Ext.define('OnlineJudges.view.admin.JudgesOptions', {
    extend: 'Ext.Panel',
    alias: 'widget.judgesOptions',
    

    config: {
        items: [
            {
                xtype: 'fieldset',
                modal: true,
                hideOnMaskTab: true,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'invitedJudges',
                        label: 'Invited',
                        labelWrap: true
                    },
                     {
                         xtype: 'checkboxfield',
                         name: 'pendingJudges',
                         label: 'Pending',
                         labelWrap: true
                     },
                      {
                          xtype: 'checkboxfield',
                          name: 'acceptedJudges',
                          label: 'Accepted',
                          labelWrap: true
                      },
                      {
                          xtype: 'checkboxfield',
                          name: 'declinedJudges',
                          label: 'Declined',
                          labelWrap: true
                      }
                ]
            },
            {
                xtype: 'button',
                ui: 'action',
                margin: 5,
                text: 'OK',
                listeners: {
                    tap: function (btn) {
                        var judgesOptions = btn.up('judgesOptions');
                        judgesOptions.hide();
                    }
                }
            }
        ]
    }
});