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
                // You can also attach listeners to an interaction.
                listeners: {
                    show: function (me, item, panel) {
                        if(item.record.data.LastName != null) {
                            //panel.setHtml("" + item.record.data.Name + " " + item.record.data.LastName+"<br>Student ID: " + item.record.data.StudentId + "<br> Raw Grade: " + item.record.data.RawGrade + "<br> Approved Grade: " + item.record.data.ApprovedGrade + "<br> Project: " + item.record.data.project + "<br> Location: " + item.record.data.location);
                            panel.setHtml("" + item.record.data.Name + " " + item.record.data.LastName+"<br>Student ID: " + item.record.data.StudentId + "<br> Raw Grade: n/a <br> Approved Grade: n/a<br> Project: " + item.record.data.project + "<br> Location: " + item.record.data.location);
                        }
                        else {
                            panel.setHtml("" + item.record.data.Name + "<br> Raw Grade: " + item.record.data.RawGrade + "<br> Approved Grade: " + item.record.data.ApprovedGrade);
                            panel.setHtml("" + item.record.data.Name + "<br> Raw Grade: n/a <br> Approved Grade: n/a" );
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