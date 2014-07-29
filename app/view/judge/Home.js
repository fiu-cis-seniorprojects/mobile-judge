Ext.define('OnlineJudges.view.judge.Home', {
    extend: 'Ext.navigation.View',
    alias: 'widget.judgeHome',

    config: {
        navigationBar: {
            docked: 'top',
            items: [
                {
                    text: 'Logout',
                    ui: 'back',
                    itemId: 'logoutBtn',
                    align: 'left'
                },
                {
                    align: 'right',
                    itemId: 'showMapBtn',
                    text: 'Show Map',
                    ui: 'action'
                },
                {
                    align: 'right',
                    itemId: 'judgeGraphBtn',
                    text: 'Stats'
                },
                {
                    align: 'right',
                    hidden: true,
                    itemId: 'submitBtn',
                    text: 'Submit',
                    ui: 'action'
                },
                {
                    xtype: 'button',
                    text: 'Judge',
                    itemId: 'rolesBtnJudge'
                }
            ]
        },
        items: [
            {
                xtype: 'list',
                title: 'Students',
                store: 'judgeStudents',
                disableSelection: true,
                itemTpl: [
                    '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background: none">',
                        '<div class="x-form-label" style="background: none;padding: 0">',
                            '<div>{FirstName} {LastName}</div>',
                            '<div style="font-size: 12px">Project: {Project}</div>',
                            '<div style="font-size: 12px">Location: {Location}</div>',
                        '</div>',
                        '<div class="x-component-outer">',
                            '<div class="x-unsized x-field-input" style="border: 0; background: none;">',
                                '<input type="checkbox" <tpl if=\'JudgeGrade != null && Accepted !== false\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                '<div class="x-field-mask"></div>',
                            '</div>',
                        '</div>',
                    '</div>'
                ],
                plugins: [{type: 'pullrefresh'}]
            }
        ]
    }

});