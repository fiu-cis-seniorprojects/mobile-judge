Ext.define('OnlineJudges.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Login',
            'student.Home'
        ],

        stores: [
            'LoginInstance'
        ],

        refs: {
            login: {
                autoCreate: true,
                selector: 'login',
                xtype: 'login'
            }
        },

        control: {
            "login #login": {
                tap: 'onLoginTap'
            },
            "studentHome #logoutBtn":{
                tap: 'onLogoutStudentsTap'
            },
            "judgeHome #logoutBtn": {
                tap: 'onLogoutJudgesTap'
            },
            "adminMain #logoutBtn": {
                tap: 'onLogoutJudgesTap'
            }
        }
    },

    loadMainView: function(view, options) {
        Ext.Viewport.removeAll().add(Ext.create('widget.'+ view, Ext.apply({
            title: 'CIS 4911 Online Judges'
        }, options || {})));
    },

    onLoginTap: function() {
        var me = this,
            values = me.getLogin().getValues(),
            keyValue = new Object(),
            store = Ext.getStore('LoginInstance');

        store.removeAll();
        if (!Ext.isEmpty(values.email) && !Ext.isEmpty(values.password)) {
            Ext.php.LoginMain.login(values.email, values.password, function (user) {
                
                if (!user) Ext.Msg.alert('Error', 'Invalid Username or Password', Ext.emptyFn);
                else if (user.DefaultRole == "admin") {
                    OnlineJudges.user = user;
                    store.add({ id: 0, email: values.email, password: values.password, roles: user.Roles, defaultrole: user.DefaultRole });
                    me.loadMainView('adminMain', { title: 'Home' });
                }
                else if (user.DefaultRole == 'judge') {
                    if (!user.AllowLogin) Ext.Msg.alert('Dear ' + user.FirstName, 'The grading has not started yet', Ext.emptyFn);
                    else {
                        OnlineJudges.user = user;
                        store.add({ id: 0, email: values.email, password: values.password, roles: user.Roles, defaultrole: user.DefaultRole });
                        me.loadMainView('judgeHome');
                    }
                }
                else if (user.DefaultRole == 'student') {
                    token = window.localStorage.getItem('token');

                    Ext.php.Students.login(token, function (data) {
                        if (Ext.isString(data)) window.location = data; // redirect
                        else if (data != null) {
                            OnlineJudges.user = user;
                            store.add({ id: 0, email: values.email, password: values.password, roles: user.Roles, defaultrole: user.DefaultRole });
                            me.loadMainView('studentHome');
                        }
                    });
                }
            });
        }
    },

    onLogoutStudentsTap: function() {
        var token = window.localStorage.getItem('token');
        window.localStorage.removeItem('token');
        OnlineJudges.map = null;
        Ext.Viewport.removeAll().add(Ext.create('widget.login'));
        Ext.php.Students.logout(token);
    },

    onLogoutJudgesTap: function() {
        OnlineJudges.map = null;
        Ext.Viewport.down('navigationview').getLayout().setAnimation(false);
        Ext.Viewport.removeAll().add(Ext.create('widget.login'));
    }
});