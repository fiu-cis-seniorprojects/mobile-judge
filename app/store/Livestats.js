Ext.define('OnlineJudges.store.Livestats', {
    extend: 'Ext.data.Store',

    requires:[
        'Ext.data.proxy.Direct'
    ],

    config: {
        storeId: 'Livestats',
        proxy: {
            type: 'direct',
            directFn: 'Ext.php.Livestats.getAll',
            paramsAsHash: false,
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'data'
            }
        },
        fields: [
            {
                name: 'id',
                type: 'int'
            }, 
            {
                name: 'FirstName',
                type: 'string'
            }, 
            {
                name: 'LastName',
                type: 'string'
            },
            {
                name: 'Grade',
                type: 'int'
            }
        ],
        sorters: ['FirstName','LastName']
    }
    // config: {
    //     storeId: 'Livestats',
    //     data: [
    //         { StudentId: 1234567, Grade: 50, FirstName: "Frank", LastName: "Amber" },
    //         { StudentId: 4523452, Grade: 49, FirstName: "Andy", LastName: "Blue" },
    //         { StudentId: 7674344, Grade: 44, FirstName: "Eric", LastName: "Bronze" },
    //         { StudentId: 1254099, Grade: 47, FirstName: "Fernando", LastName: "Red" },
    //         { StudentId: 4345223, Grade: 50, FirstName: "Alan", LastName: "Mininet" },
    //         { StudentId: 3323134, Grade: 49, FirstName: "Jennifer", LastName: "Lopez" },
    //         { StudentId: 1132344, Grade: 44, FirstName: "Alejandra", LastName: "Ben" },
    //         { StudentId: 6498133, Grade: 47, FirstName: "Alejandro", LastName: "Amber" },
    //         { StudentId: 2870198, Grade: 46, FirstName: "Adam", LastName: "Larz" },
    //         { StudentId: 3993311, Grade: 49, FirstName: "Jake", LastName: "Howard" },
    //         { StudentId: 9826521, Grade: 50, FirstName: "Shaine", LastName: "Fan" },
    //         { StudentId: 8872341, Grade: 47, FirstName: "Omar", LastName: "Yorlitz" },
    //         { StudentId: 2341113, Grade: 46, FirstName: "Francis", LastName: "Diaz" },
    //         { StudentId: 9999999, Grade: 50, FirstName: "Ashley", LastName: "Thompson" }
    //     ],
    //      sorters:['StudentId']
    // }
});