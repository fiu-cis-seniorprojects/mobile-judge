Ext.define('OnlineJudges.view.admin.Students',{
    extend:'Ext.dataview.List',
    alias: 'widget.adminStudents',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config:{
        title: 'Students',
        itemTpl: [
            '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
                '<div class="x-form-label" style="background:none;padding: 0">',
                    '<div>{FirstName} {LastName}</div>',
                    '<div style="font-size:12px">Email: {Email}</div>',
                    '<div style="font-size:12px">Grade: <tpl if=\'Grade !== null\'>{Grade}<tpl else>--</tpl></div>',
                '</div>',
                '<div class="x-component-outer">',
                    '<div class="x-unsized x-field-input" style="border:0;background:none;">',
                        '<input type="checkbox" <tpl if=\'Grade !== null\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                        '<div class="x-field-mask"></div>',
                    '</div>',
                '</div>',
            '</div>'
        ],
        grouped: true,
        store: 'Students',
        onItemDisclosure: false,
        disableSelection: true,
        plugins: [{type: 'pullrefresh'}]
    }
});
