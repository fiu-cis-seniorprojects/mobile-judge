Ext.define('OnlineJudges.view.admin.PendingGrades', {
    extend:'Ext.dataview.List',
    alias: 'widget.pendingGrades',

    requires:[
        'Ext.plugin.PullRefresh'
    ],

    config: {
        title: 'Grades',
        itemTpl: [
            '<div class="x-container x-field-checkbox x-field x-label-align-left x-field-labeled" style="background:none">',
                                   '<div class="x-form-label" style="background:none;padding: 0;width:80%">',
                                    '<table width="100%"; style="font-size:80%"><tr> <td width="30%" align="left">Judge: {JFName} {JLName}</td> <td width="30%" align="center"> Student: {SFName} {SLName} </td><td width="30%" align="right">Grade: {Grade}</td><td width="10%"><input type="checkbox" <tpl if=\'Accepted === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox"></td></table>',
                                   '</div>',
                                   '<div class="x-component-outer">',
                                       '<div class="x-unsized x-field-input" style="border:0;background:none;">',
                                           '<input type="checkbox" <tpl if=\'Accepted === true\'>checked="checked"</tpl> class="x-input-el x-input-checkbox">',
                                           '<div class="x-field-mask"></div>',
                                       '</div>',
                                   '</div>',
                               '</div>'
        ],
        //grouped: true,
        //indexBar: true,
        store: 'PendingGrades',
        listeners: {
                        itemtap: function (item, num, ev, record) {
                            var flag = record.get('Accepted');
                            if (flag === true) {
                                record.set('Accepted', false);
                            } else {
                                record.set('Accepted', true);
                            }
                        }
                    },
        onItemDisclosure: false,
        disableSelection: true,
        emptyText: '<a style="font-size:12px">The are no grades pending</a>',
        //plugins: [{type: 'pullrefresh'}]
    }
});
