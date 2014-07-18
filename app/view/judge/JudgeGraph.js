Ext.define("OnlineJudges.view.judge.JudgeGraph", {
    extend: "Ext.chart.CartesianChart",
    alias: "widget.judgeGraph",

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
        title: "Grades",
        //innerPadding: 10,
        animate: true,
        // legend: {
        //     position: "top"
        // },
        interactions: [
            'panzoom'
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
                yField: ["RawGrade"],
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