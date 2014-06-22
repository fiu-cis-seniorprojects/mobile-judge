/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'OnlineJudges',

    requires: [
        'Ext.MessageBox',
        'Ext.direct.*'
    ],

    models:[
        "LivestatsGraph"
    ],

    controllers: [
        'Login',
        'Admin',
        'Judge'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    profiles: ['Tablet', 'Phone'],

    launch: function() {

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src="api/?javascript"; //script.src="http://frankxp.net/OnlineJudgesDebug/api/?javascript";
        script.async = true;
        script.onload = function() {
            var params = Ext.Object.fromQueryString(location.hash.replace('#/','')),
                openView = function(view) {
                    Ext.fly('appLoadingIndicator').destroy();
                    return Ext.Viewport.add(Ext.create('widget.' + view));
                };

            location.hash = "";

            if (!Ext.isEmpty(params.rsvp)) {
                Ext.php.Invites.getById(params.rsvp, function(invite){
                    if (invite === null || !Ext.isEmpty(invite.Replied)) openView('login');
                    else openView('judgeConfirmation').setValues(invite);
                });
            }
            else
            {
                var token = (!Ext.isEmpty(params.token)) ? params.token : window.localStorage.getItem('token');

                window.localStorage.removeItem('token');

                if (!token) openView('login');
                else {
                    Ext.php.Students.login(token, function(data) {
                        if (!Ext.isString(data) && Ext.isDefined(data.id)) {
                            window.localStorage.setItem('token', token);
                            OnlineJudges.user = data;
                            openView('studentHome');
                        }
                        else openView('login');
                    });
                }
            }
        };
        document.getElementsByTagName('HEAD')[0].appendChild(script);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
