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
            xtype: "container",
            flex: 1,
            docked: "top",
            minHeight: '20px',
            height: '40px',
            layout: "hbox",
            items: [
                {
                    xtype: "container",
                    flex: 1,
                    height: '20px',
                    layout: "vbox",
                    xtype:'selectfield',
                    label: 'Grouping',
                    name: 'Grouping',
                    labelWrap: true,
                    options: [
                    {text:'Students', value: 'Students'},
                    {text:'Projects', value: 'Projects'}
                    ],
                    listeners: {
                    change: function(cmp, newValue, oldValue){
                        if(newValue === 'Students')
                        {
                            var msg = "Selected Students";
                            var stre = Ext.getStore('Livestats');
                            stre.removeAll();
                            var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAll');
                            stre.getProxy().setDirectFn(method);
                            stre.load();
                            //var msg = "Selected Students" + stre.getDirectFn();
                            //stre.getProxy().setUrl('Ext.php.Livestats.getAll');
                            //Ext.Msg.alert('Details', msg);
                        }
                        else if(newValue === 'Projects')
                        {
                            //var msg = "Selected Projects";
                            var stre = Ext.getStore('Livestats');
                            stre.removeAll();
                            var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAllProjects');
                            stre.getProxy().setDirectFn(method);
                            stre.load();
                            //var msg = "Selected Students" + stre.getDirectFn();
                            //stre.getProxy().setUrl('Ext.php.Livestats.getAll');
                            //Ext.Msg.alert('Details', msg);
                            //Ext.Msg.alert('Details', msg);
                        }
                    }
                    }
                }
            ]
        },
        {
            xtype: 'livestatsList',
            flex: 1,
            listeners: {
                            itemtap: function(item, num, ev, record){
                                //var tempStore = Ext.getStore('LivestatsGraph');
                                //tempStore.removeAll();
                                //var method = Ext.direct.manager.parseMethod('Ext.php.Livestats.getJudges');
                                var store = Ext.getStore('LivestatsGraph');
                                store.removeAll();
                                //var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getJudges');
                                //store.getProxy().setDirectFn(method);
                                var studentid = record.get('id');
                                store.getProxy().setExtraParams({ 'StudentId': studentid});
                                store.load();
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
                                msg += "<br>" + store.getCount();
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
        //var storeGraph = Ext.getStore('LivestatsGraph');
        //    if (!storeGraph.isLoaded()) storeGraph.load();
        //store.add(allStudents);
        //this.callParent();
    }
});
