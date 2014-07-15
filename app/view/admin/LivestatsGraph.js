Ext.define("OnlineJudges.view.admin.LivestatsGraph", {
    extend: "Ext.chart.CartesianChart",
    alias: "widget.livestatsGraph",

    requires: [
        "Ext.TitleBar",
        "Ext.chart.CartesianChart",
        "Ext.chart.series.Bar",
        "Ext.chart.axis.Numeric",
        "Ext.chart.axis.Category",
        "Ext.chart.interactions.PanZoom",
        "Ext.draw.sprite.Circle"
    ],
    config: {
        //flex: 1,
        xtype: "chart",
        fullscreen: true,
        theme:'Demo',
        store: "Livestats",
        cls: "chart",
        //innerPadding: 10,
        animate: true,
        legend: {
            position: "top"
        },
        interactions: [
            'panzoom',
            'itemhighlight',
            {
                type: 'iteminfo',
                // For some interactions, you can specify the gesture
                // to trigger it.
                gesture: 'itemtaphold',
                listeners: {
                    //panel.setWidth(400);
                    show: function (me, item, panel) {
                        panel.setWidth('90%');
                        panel.setHeight('60%');
                        var store = Ext.getStore('LivestatsGraph');
                        var msg = "<br>-------------------------------";
                        if(item.record.data.LastName != null) {
                            for( i = 0; i < store.getAllCount(); i++)
                                    {
                                        if(store.getAt(i).get('StuName') === item.record.data.Name && store.getAt(i).get('StuLName') === item.record.data.LastName && store.getAt(i).get('LastName') !== item.record.data.project) {
                                            //Alert(store.getAt(i).get('Name').toString().charAt(0));
                                            msg += "<br>" + store.getAt(i).get('Name').toString().charAt(0) + ". " + store.getAt(i).get('LastName') + " -- "+ store.getAt(i).get('RawGrade');
                                        }
                                    }

                            panel.setHtml("<center>" + item.record.data.Name + " " + item.record.data.LastName+"<br>Student ID: " + item.record.data.StudentId + "<br> Raw Grade: " + item.record.data.RawGrade + "<br> Approved Grade: " + item.record.data.ApprovedGrade + "<br> Project: " + item.record.data.project + "<br> Location: " + item.record.data.location + msg + "</center>");
                            //panel.setWidth(200);
                            //panel.setHtml("" + item.record.data.Name + " " + item.record.data.LastName+"<br>Student ID: " + item.record.data.StudentId + "<br> Raw Grade: n/a <br> Approved Grade: n/a<br> Project: " + item.record.data.project + "<br> Location: " + item.record.data.location + msg);
                        }

                        else {
                            for( i = 0; i < store.getAllCount(); i++)
                                    {
                                        if(store.getAt(i).get('Name') === item.record.data.Name) {
                                            msg += "<br>" + store.getAt(i).get('StuName').toString().charAt(0) + ". "+ store.getAt(i).get('StuLName') + " -- Raw: " + store.getAt(i).get('RawGrade') + " Accepted: " + store.getAt(i).get('ApprovedGrade');
                                            //msg += "<br>" + store.getAt(i).get('StuName') + " "+ store.getAt(i).get('StuLName') + " -- Raw: n/a Accepted: n/a";
                                        }
                                    }


                            panel.setHtml("<center>" + item.record.data.Name + "<br> Raw Grade: " + item.record.data.RawGrade + "<br> Approved Grade: " + item.record.data.ApprovedGrade + msg + "</center>");
                            //panel.setWidth(200);
                            //panel.setHeight(200);
                            //panel.setHtml("" + item.record.data.Name + "<br> Raw Grade: n/a <br> Approved Grade: n/a" + msg);
                        }


                          
                    //panel.setHtml("First Name: " + "First Name "+ "<br>Last Name: " + "last Name"+"<br>Student ID: " + "ID " + "<br> Raw Grade: " + item.record.data.RawGrade + "<br> Approved Grade: " + item.record.data.ApprovedGrade + "<br> Project: " + item.record.data.project + "<br> Location: " + item.record.data.location);
                    
                    }
                }
            },
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                grid: true,
                minimum: 0,
                maximum: 50
                //visibleRange: [0,50],
            },
            {
                type: 'category',
                position: 'bottom',
                hidden: true
            }
        ],
        series: [
            {
                type: "bar",
                yField: ["RawGrade", "ApprovedGrade"],
                stacked: false,
                xField: "id",
                highlight: true,
                axis: 'bottom',
                showInLegend: true,
                style: {
                    stroke: "rgb(40,40,40)"
                },
                subStyle: {
                    fill: ["#115fa6", "#10fa65"]
                }
            }
        ]
    },
        listeners: {
        initialize: function () {
            // The panzoom interaction provides an toggle button, you can add them anywhere (once).
            // It will be destroyed when the interaction is destroyed.
            var button = Ext.ComponentQuery.query("interaction[type=panzoom]")[0].getModeToggleButton();
            Ext.ComponentQuery.query("titlebar")[0].add(button);

        }
    }
});