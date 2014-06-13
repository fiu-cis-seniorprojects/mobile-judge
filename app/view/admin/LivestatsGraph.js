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
        store: "LivestatsGraph",
        cls: "chart",
        innerPadding: 10,
        animate: false,
        interactions: [
            'itemhighlight',
            {
                type: 'iteminfo',
                // For some interactions, you can specify the gesture
                // to trigger it.
                gesture: 'itemtaphold',
                // You can also attach listeners to an interaction.
                listeners: {
                    show: function (me, item, panel) {
                        panel.setHtml("First Name: " + item.record.data.FirstName + "<br>Last Name: " + item.record.data.LastName+"<br>Student ID: " + item.record.data.StudentId + "<br> Grade: " + item.record.data.Grade);
                    }
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                grid: true,
                minimum: 0
            },
            {
                type: 'category',
                position: 'bottom'
            }
        ],
        series: [
            {
                type: "bar",
                yField: "Grade",
                xField: "id",
                axis: 'bottom',
                style: {
                    stroke: "rgb(40,40,40)"
                },
                subStyle: {
                    fill: ["#115fa6"]
                }
            }
        ]
    }
});