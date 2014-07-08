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
                                //store.removeAll();
                                //var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getJudges');
                                //store.getProxy().setDirectFn(method);
                                //store.load();
                                var msg = " ";
                                if(record.get('LastName') != null)
                                {
                                    msg = "Name: " + record.get('Name') + " " + record.get('LastName');
                                    //msg += "<br>ID: " + record.get('id');
                                    msg += "<br>ID: n/a";
                                } 
                                else
                                {
                                    msg = "Project: " + record.get('Name');
                                }
                                //msg += "<br> Raw Grade: " + record.get('RawGrade') + "<br>Approved Grade: " + record.get('ApprovedGrade');
                                msg += "<br> Raw Grade: n/a<br>Approved Grade: n/a";
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
                                            msg += "<br>" + store.getAt(i).get('Name') + " " + store.getAt(i).get('LastName') + " -- Grade: n/a"; //+ store.getAt(i).get('RawGrade');
                                        }
                                    }
                                }
                                else
                                {
                                    for( i = 0; i < store.getAllCount(); i++)
                                    {
                                        if(store.getAt(i).get('Name') === record.get('Name')) {
                                            //msg += "<br>" + store.getAt(i).get('StuName') + " "+ store.getAt(i).get('StuLName') + " -- Raw: " + store.getAt(i).get('RawGrade') + " Accepted: " + store.getAt(i).get('ApprovedGrade');
                                            msg += "<br>" + store.getAt(i).get('StuName') + " "+ store.getAt(i).get('StuLName') + " -- Raw: " + "n/a" + " Accepted: " + "n/a";
                                        
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
        var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAll');
            store.getProxy().setDirectFn(method);
            if (!store.isLoaded()) store.load();
        var storeGraph = Ext.getStore('LivestatsGraph');
            if (!storeGraph.isLoaded()) storeGraph.load();

        //Function to check for now stuff
        var task = Ext.create('Ext.util.DelayedTask', function() {
        //load the list's store here. The list will be automatically updated
        var store = Ext.getStore('Livestats').load();    // Assuming your list component is "listComp"
        //store.refresh();
        store = Ext.getStore('LivestatsGraph').load();    // Assuming your list component is "listComp"
        //store.refresh();        
        //Ext.Msg.alert('refreshed');
        // The task will be called after each 10000 ms
        task.delay(1000);
        }, this);
     
        //The function will start after 0 milliseconds
        //so we want to start instantly at first
        //var time = Ext.getView('settings').RefreshRate;
        //popup.add(time);
        //popup.show();
        task.delay(1000);
         
        //to stop the task, just call the cancel method
        //task.cancel();
        //store.add(allStudents);
        //this.callParent();
    }
});
