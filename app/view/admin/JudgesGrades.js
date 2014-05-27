Ext.define('OnlineJudges.view.admin.JudgesGrades', {
    extend:'Ext.dataview.List',
    alias: 'widget.adminJudgesGrades',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config: {
        itemTpl: [
            '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background: none">',
                '<div class="x-form-label" style="background: none;padding: 0">',
                    '<div>{FirstName} {LastName}</div>',
                    '<div style="font-size: 12px">Affiliation: {Affiliation} Title: {Title}</div>',
                    '<div style="font-size: 12px"><tpl if=\'Accepted === true\'>Accepted<tpl elseif=\'Accepted === false\'>Rejected</tpl><tpl if=\'Grade != null\'> Grade: {Grade}</tpl></div>',
                '</div>',
                '<div class="x-component-outer">',
                    '<div class="x-unsized x-field-input" style="border: 0; background: none;">',
                        '<input type="checkbox" <tpl if=\'Accepted != null\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                        '<div class="x-field-mask"></div>',
                    '</div>',
                '</div>',
            '</div>'
        ],
        store: 'studentJudges',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{type: 'pullrefresh'}]
    }
});
