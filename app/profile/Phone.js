Ext.define('OnlineJudges.profile.Phone', {
    extend: 'Ext.app.Profile',

//    config: {
//        controllers: ['Main'],
//        views: ['Main', 'TouchEvents']
//    },

    isActive: function() {
        return Ext.os.is.Phone;
    }

//    launch: function() {
//        Ext.create('Kitchensink.view.phone.Main');
//
//        this.callParent();
//    }
});