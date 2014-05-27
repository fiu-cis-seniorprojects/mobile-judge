Ext.define('OnlineJudges.view.admin.NewQuestion', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newQuestion',

    config: {
        items: [
            {
                xtype: 'fieldset',
                margin: '.5em .5em 1.5em',
                title: 'Type New Question',
                items: [
                    {
                        xtype: 'textareafield',
                        height: 362,
                        label: '',
                        name: 'Text'
                    }
                ]
            }
        ]
    }

});