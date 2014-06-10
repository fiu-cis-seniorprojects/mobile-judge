Ext.define("OnlineJudges.model.LivestatsGraph", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: "id", type: "int" },
            { name: "Grade", type: "int" },
            { name: "FirstName", type: "var"},
            { name: "LastName", type: "var"}
        ]
    }
});
