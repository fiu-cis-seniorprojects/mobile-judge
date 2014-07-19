Ext.define('OnlineJudges.view.admin.Livestats', {
    extend: 'Ext.Container',
    alias: 'widget.livestats',

    requires:[

        'Ext.dataview.List',
        'Ext.form.FieldSet',
        'Ext.field.Url',
        'Ext.field.Text',
        'Ext.field.Checkbox',
        'Ext.field.Select',
        'Ext.field.Spinner',
        'Ext.field.TextArea',
        'Ext.data.proxy.Direct',
        'Ext.TitleBar'
    ],

    config: {
        title: 'LiveStats',
        padding: '5 5 0 5',
        iconCls: 'favorites',
        layout: {
            type: 'vbox',
            minHeight: '10px',
            scrollable: 'true'
        },
        items: [
        {
            xtype: 'statsList',
            flex: 1,
            listeners: {
                            itemtap: function(item, num, ev, record){
                                var store = Ext.getStore('LivestatsGraph');
                                var msg = " ";
                                if(record.get('LastName') != null)
                                {
                                    msg = "Name: " + record.get('Name') + " " + record.get('LastName');
                                    msg += "<br>ID: " + record.get('id');
                                    //msg += "<br>ID: n/a";
                                } 
                                else
                                {
                                    msg = "Project: " + record.get('Name');
                                }
                                msg += "<br> Raw Grade: " + record.get('RawGrade') + "<br>Approved Grade: " + record.get('ApprovedGrade');
                                //msg += "<br> Raw Grade: n/a<br>Approved Grade: n/a";
                                if(record.get('project') != null )
                                {
                                    msg += "<br>Project: " + record.get('project') + "<br>Location: " + record.get('location');
                                }
                                msg += "<br>----------------------------"

                                if(record.get('LastName') != null)
                                {
                                    for( i = 0; i < store.getAllCount(); i++)
                                    {
                                        if(store.getAt(i).get('StuName') === record.get('Name') && store.getAt(i).get('StuLName') === record.get('LastName') && store.getAt(i).get('LastName') !== record.get('project')) {
                                            msg += "<br>" + store.getAt(i).get('Name').charAt(0) + ". " + store.getAt(i).get('LastName') +"  -- "+ store.getAt(i).get('RawGrade');
                                        }
                                    }
                                }
                                else
                                {
                                    for( i = 0; i < store.getAllCount(); i++)
                                    {
                                        if(store.getAt(i).get('Name') === record.get('Name')) {
                                            msg += "<br>" + store.getAt(i).get('StuName').charAt(0) + ". "+ store.getAt(i).get('StuLName') + " -- Raw: " + store.getAt(i).get('RawGrade') + " Accepted: " + store.getAt(i).get('ApprovedGrade');
                                            //msg += "<br>" + store.getAt(i).get('StuName') + " "+ store.getAt(i).get('StuLName') + " -- Raw: " + "n/a" + " Accepted: " + "n/a";
                                        
                                        }
                                    }
                                }
                                Ext.Msg.alert('Details', msg);
                                //console.log('itemtap fired');
                        }
                    }
        },
        {
            xtype: 'button',
            itemId: 'livestatsGraphBtn',
            text: 'Graph',
            margin: '20 10 20 10'
        }
        ]
    },
     initialize: function() {
        //var allStudents = { id: 999, FirstName: 'ALL', LastName: 'ALL', Grade: null };
        var store = Ext.getStore('Livestats');
        var str = Ext.getStore('LivestatsGraph');
        var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAll');
            store.getProxy().setDirectFn(method);
            if (!store.isLoaded()) store.load();
        var storeGraph = Ext.getStore('LivestatsGraph');
            if (!storeGraph.isLoaded()) storeGraph.load();
         
        //to stop the task, just call the cancel method
        //task.cancel();
        //store.add(allStudents);
        this.callParent();
    }
});
