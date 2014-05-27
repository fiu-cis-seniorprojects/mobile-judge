Ext.define('OnlineJudges.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Login',
            'student.Home'
        ],

        refs: {
            login: {
                autoCreate: true,
                selector: 'login',
                xtype: 'login'
            }
        },

        control: {
            "login #loginJudges": {
                tap: 'onLoginJudgesTap'
            },
            "login #loginStudents": {
                tap: 'onLoginStudentsTap'
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

    onLoginJudgesTap: function() {
        var me = this,
            values = me.getLogin().getValues();

        if(!Ext.isEmpty(values.email) && !Ext.isEmpty(values.password)){
            Ext.php.Judges.login(values.email, values.password, function(user){
                if(!user) Ext.Msg.alert('Error', 'Invalid Username or Password', Ext.emptyFn);
                else if(user.Role == "Admin") {
                    OnlineJudges.user = user;
                    me.loadMainView('adminMain', { title: 'Home' });
                }
                else if(user.Role == "Judge") {
                    if (!user.AllowLogin) Ext.Msg.alert('Dear ' + user.FirstName, 'The grading has not started yet', Ext.emptyFn);
                    else {
                        OnlineJudges.user = user
                        me.loadMainView('judgeHome');
                    }
                }
            });
        }
    },

    onLoginStudentsTap: function () {
        var me = this,
            token = window.localStorage.getItem('token');

        Ext.php.Students.login(token, function(data) {
            if (Ext.isString(data)) window.location = data; // redirect
            else if (data != null) {
                OnlineJudges.user = user;
                me.loadMainView('studentHome');
            }
        });
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