Ext.define('OnlineJudges.profile.Tablet', {
    extend: 'Ext.app.Profile',

    isActive: function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    }
});