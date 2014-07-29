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
            },
            "studentHome #studentRolesBtn": {
                tap: 'onStudentRolesBtnTap'
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
            var isStudent = "";
            Ext.php.LoginMain.getDefaultRole(values.email, function (userDef) {
                if (userDef.DefaultRole == 'student')
                    isStudent = "true";
                else
                    isStudent = "false";

                if (isStudent === "false") {
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
                else if (isStudent === "true") {
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
    },

    onStudentRolesBtnTap: function () {
        var me = this,
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                items: []
            });
        Ext.php.LoginMain.getRoles(user.get('email'), user.get('password'), function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] == "admin") {
                    adminRoleTab = {
                        xtype: 'button',
                        text: 'Admin',
                        margin: '5',
                        handler: function () {
                            popup.hide();
                            me.loadMainView('adminMain');
                        }
                    }
                    popup.add(adminRoleTab);
                }
                else if (roles[i] == "judge") {
                    judgeRoleTab = {
                        xtype: 'button',
                        text: 'Judge',
                        margin: '5',
                        handler: function () {
                            popup.hide();
                            me.loadMainView('judgeHome');
                        }
                    }
                    popup.add(judgeRoleTab);
                }
                else if (roles[i] == "student") {
                    studentRoleTab = {
                        xtype: 'button',
                        text: 'Student',
                        margin: '5',
                        handler: function () {
                            popup.hide();
                            me.loadMainView('studentHome');
                        }
                    }
                    popup.add(studentRoleTab);
                }
            }
        });
        popup.add({
            xtype: 'button',
            docked: 'bottom',
            text: 'Cancel',
            handler: function () {
                popup.hide();
            }
        });
        popup.show();
    }
});