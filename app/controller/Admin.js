Ext.define('OnlineJudges.controller.Admin', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.Anim'
    ],

    config: {
        views: [
            'admin.Main',
            'admin.Home',
            'admin.NewQuestion',
            'admin.SendInvitation',
            'admin.StudentView',
            'admin.Questions',
            'admin.Settings',
            'admin.Judges',
            'admin.JudgesGrades',
            'admin.Students',
            'admin.Grade',
            'admin.Invitations',
            'admin.ChangePwd',
            'admin.Livestats',
            'admin.LivestatsList',
            'admin.LivestatsGraph'
        ],
        stores: [
            'Questions',
            'Students',
            'Judges',
            'student.Judges',
            'Invitations',
            'Livestats'
        ],

        refs: {
            main: 'adminMain',
            navBtn: 'adminMain #navigBtn',
            logoutBtn: 'adminMain #logoutBtn'
        },

        control: {
            "adminMain": {
                show: 'onHomeTabShow',
                back: 'onHomeBack'
            },
            "adminMain #navigBtn": {
                tap: 'onNavBtnTap'
            },
            "adminMain adminHome": {
                show: 'onHomeTabShow'
            },
            "adminMain tabpanel tabpanel":{
                show: 'onPeopleTabShow',
                activeitemchange: 'onPeopleTabChange'
            },
            "adminMain adminStudents": {
                itemtap: 'onStudentsListTap'
            },
            "adminMain adminJudgesGrades": {
                itemtap: 'onJudgeGradeListTap'
            },
            "adminMain questions": {
                show: 'onQuestionsTabShow',
                itemswipe: 'onQuestionsListSwipe'
            },
            "adminMain settings": {
                show: 'onSettingsTabShow'
            },
            "settings #changePwdBtn": {
                tap: 'onChangePasswordBtnTap'
            },
            "settings #resetBtn": {
                tap: 'onResetAppBtnTap'
            },
            "adminStudentView button[ui=forward]": {
                tap: 'onStudentShowJudgesTap'
            },
            "adminStudentGrade button":{
                tap: 'onAcceptJudgeGradeTap'
            },
            "adminMain Livestats": {
                show: 'onLivestatsShow'
            },
            "livestats #livestatsGraphBtn": {
                tap: 'onlivestatsGraphBtnTap'
            }
        }
    },

    onAcceptJudgeGradeTap: function(btn) {
        var me = this,
            main = me.getMain(),
            form = btn.up('formpanel'),
            rec = form.getRecord(),
            acceptance = btn.getUi() === 'confirm';

        main.setMasked({
            xtype: 'loadmask',
            message: 'Saving...'
        });

        Ext.php.Judges.setGrade(rec.get('id'),rec.get('StudentId'), acceptance, function(result){
            main.setMasked(false);

            if (result.success === true) {
                form.student.set('Grade', result.grade);
                rec.set('Accepted', acceptance);
                main.pop();
                me.onHomeBack();
            }
            else Ext.Msg.alert('Error', result.msg, Ext.emptyFn);
        });
    },

    onJudgeGradeListTap: function(dataView, index, target, record) {
        var navBtn = this.getNavBtn(),
            main = this.getMain(),
            name = record.get('FirstName') + ' ' + record.get('LastName');

        if (navBtn.from === 'studentGrade') return;

        navBtn.from = 'studentGrade';

        main.push({
            xtype: 'adminStudentGrade',
            title: name + "'" + (name.indexOf('s', name.length -1) !== -1 ? '' : 's' ) + ' Grade'
        }).setRecord(record).student = dataView.student;
    },

    onResetAppBtnTap: function() {
        var mainView = this.getMain();

        Ext.Msg.confirm('Reset App', 'Are you sure you want to erase all content?', function(btn){
            if (btn === 'yes') {
                mainView.setMasked({
                    xtype: 'loadmask',
                    message: 'Resetting...'
                });

                Ext.php.Settings.reset(function() {
                    // reload all loaded stores
                    Ext.StoreManager.each(function(s) {
                        if (s.isLoaded()) s.load();
                    });

                    mainView.setMasked(false);
                    Ext.Msg.alert('Reset App', 'Reset was successful', Ext.emptyFn);
                });
            }
        });
    },

    onChangePasswordBtnTap: function() {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain();

        this.getLogoutBtn().hide();

        navBtn.from = 'changePwd';

        mainView.push({
            xtype: 'adminChangePwd',
            title: "Change Password"
        });

        navBtn.setText("Change");
        navBtn.setIconCls('');
        navBtn.from = 'changePwd';
        navBtn.show();
    },

    onStudentShowJudgesTap: function(btn){
        var mainView = this.getMain(),
            navBtn = this.getNavBtn(),
            store = Ext.getStore('studentJudges'),
            record = btn.up('formpanel').getRecord(),
            name = record.get('FirstName') + ' ' + record.get('LastName');

        mainView.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        navBtn.from = 'studentJudges';
        navBtn.hide();

        mainView.push({
            xtype: 'adminJudgesGrades',
            title: name + "'" + (name.indexOf('s', name.length -1) !== -1 ? '' : 's' )+' Judges'
        }).student = record;

        store.getProxy().setExtraParams({'id': record.get('id')});
        store.load({
            callback: function(){
                mainView.setMasked(false);
            }
        });
    },

    onPeopleTabChange: function(container, value){
        var store = value.getStore(),
            navBtn = this.getNavBtn(),
            navBar = this.getMain().getNavigationBar(),
            title = value.getTitle();

        navBar.setTitle(title);
        navBar.backButtonStack[navBar.backButtonStack.length-1] = title;

        if(!store.isLoaded()) store.load();

        if(title === 'Students'){
            navBtn.from = "studentsTab";
            navBtn.setText("Load");
            navBtn.setIconCls('');
            navBtn.show();
        }
        else if(title === 'Judges'){
            navBtn.from = "judgesTab";
            navBtn.setText('');
            navBtn.setIconCls('add');
            navBtn.show();
        }
        else if(title === 'Invitations') {
            navBtn.hide();
        }
    },

    onStudentsListTap: function(dataView, index, target, record){
        var navBtn = this.getNavBtn(),
            mainView = this.getMain();

        if (navBtn.from === 'studentView') return;

        navBtn.from = 'studentView';
        navBtn.setText('Save');
        navBtn.setIconCls('');

        this.getLogoutBtn().hide();

        mainView.push(Ext.create('widget.adminStudentView',{
            title: record.get('FirstName') + " " + record.get('LastName')
        }).setRecord(record));
    },

    onHomeTabShow: function() {
        var main = this.getMain(),
            navBtn = this.getNavBtn(),
            navBar = main.getNavigationBar(),
            form = main.down('adminHome');

        navBtn.from = 'homeTab';
        navBtn.setText('');
        navBtn.setIconCls('refresh');
        navBtn.show();

        navBar.setTitle("Home");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Home";

        Ext.php.Settings.getSummary(function(data){
            form.setValues(data);
        });
    },

    onNavBtnTap: function(button) {
        var me = this,
            mainView = me.getMain();

        if (button.from === 'homeTab') {
            Ext.php.Settings.getSummary(function(data){
                mainView.down('adminHome').setValues(data);
            });
        }

        else if(button.from === 'questionsTab'){

            this.getLogoutBtn().hide();

            mainView.push({
                xtype: 'newQuestion',
                title: "New Question"
            });

            button.setText("Save");
            button.setIconCls('');
            button.from = 'newQuestion';
        }

        else if(button.from === 'newQuestion'){
            var rec = mainView.getActiveItem().getValues();
            if (!Ext.isEmpty(rec.Text)) {

                mainView.setMasked({
                    xtype: 'loadmask',
                    message: 'Saving...'
                });

                Ext.php.Questions.add(rec.Text, function(result){
                    mainView.setMasked(false);

                    if (!result.success) Ext.Msg.alert('Add Question', result.msg, Ext.emptyFn);
                    else {
                        var store = Ext.getStore('Questions');
                        store.load();

                        mainView.pop();
                        me.onHomeBack();
                    }
                });
            }
        }

        else if(button.from === 'judgesTab'){

            Ext.php.Settings.load(function(settings) {

                if (Ext.isEmpty(settings.Date) ||
                    Ext.isEmpty(settings.Time) ||
                    Ext.isEmpty(settings.EmailText) ||
                    Ext.isEmpty(settings.Subject) ||
                    Ext.isEmpty(settings.StudentsPerJudge) ||
                    Ext.isEmpty(settings.Location)) {
                    Ext.Msg.alert('Send Invitation','Please fill the settings first', function() {
                        mainView.down('tabpanel').setActiveItem(3);
                    });
                    return;
                }

                me.getLogoutBtn().hide();
                mainView.push({
                    xtype: 'adminSendInvitation',
                    title: 'Send Invitation'
                });
                button.setText("Send");
                button.setIconCls('');
                button.from = 'sendInvitation';
            });
        }

        else if(button.from === 'studentsTab') {
            Ext.Msg.confirm('Load Students', 'Do you want to import students from the Sr Project Website?', function(btn){
                if (btn === 'yes') {
                    Ext.php.Students.load(function(){
                        Ext.getStore('Students').load();
                    });
                }
            });
        }

        else if(button.from === 'sendInvitation'){
            var rec1 = mainView.getActiveItem().getValues();
            if (!Ext.isEmpty(rec1.email)) {

                Ext.php.Invites.send(rec1, function(result) {
                    var msg = result.success ? "Invitation successfully sent" : "Failed to send invitation",
                        store = Ext.getStore('Invitations');

                    if (result.success && store.isLoaded()) store.load();

                    Ext.Msg.alert("Invitation Email", msg);
                    mainView.pop();
                    me.onHomeBack();
                });
            }
        }

        else if(button.from === 'settingsTab'){
            var form = mainView.down('settings'),
                settings = form.getValues();

            settings.Date = Ext.Date.format(settings.Date,'Y-m-d');

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            Ext.php.Settings.save(settings, function(result){
                form.setMasked(false);
                if (result === false) Ext.Msg.alert('Settings', 'Error loading map image', Ext.emptyFn);
            });
        }

        else if(button.from === 'studentView') {
            var form = mainView.down('adminStudentView'),
                rec3 = form.getRecord(),
                id = rec3.get('id'),
                location = form.getValues().Location;

            if (Ext.isEmpty(location)) {
                location = 'TBA';
                form.setValues({'Location': location});
            }

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            Ext.php.Students.setLocation(id, location, function(result) {

                if (result === true) rec3.set('Location', location);
                else form.reset();

                form.setMasked(false);
            });
        }

        else if(button.from === 'changePwd'){
            var form = mainView.down('adminChangePwd'),
                values = form.getValues();

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            values.email = OnlineJudges.user.Email;

            Ext.php.Settings.changePassword(values, function(result){
                form.setMasked(false);

                if (result === true) {
                    Ext.Msg.alert('Success', "Password was changed", Ext.emptyFn);
                    mainView.pop();
                    me.onHomeBack();
                }
                else {
                    //form.reset();
                    Ext.Msg.alert('Error', result, Ext.emptyFn);
                }
            });
        }
    },

    onPeopleTabShow: function(tabpanel) {
        this.onPeopleTabChange(0, tabpanel.getActiveItem());
    },

    onSettingsTabShow: function() {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            form = mainView.down('settings');

        navBar.setTitle("Settings");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Settings";
        navBtn.from = "settingsTab";
        navBtn.setText("Save");
        navBtn.setIconCls('');
        navBtn.show();

        form.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        Ext.php.Settings.load(function(settings){
            settings.Date = Ext.Date.parse(settings.Date, 'Y-m-d');
            form.setValues(settings);
            form.setMasked(false);
        });
    },

    onQuestionsTabShow: function() {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            store = Ext.getStore('Questions');

        navBar.setTitle("Questions");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Questions";

        navBtn.from = "questionsTab";
        navBtn.setText("");
        navBtn.setIconCls('add');
        navBtn.show();

        if(!store.isLoaded()) store.load();
    },

    onQuestionsListSwipe: function(dataview, index, target, record, e) {
        if(e.direction !== "right") return;

        var del = Ext.create("Ext.Button", {
            ui: "decline",
            text: "Delete",
            style: "position:absolute;right:0.125in;top:3px",
            handler: function() {
                Ext.php.Questions.remove(record.get('id'));
                Ext.getStore('Questions').remove(record);
            }
        });

        var removeDeleteButton = function() {
            Ext.Anim.run(del, 'fade', {
                after: function() {
                    del.destroy();
                },
                out: true
            });
        };

        del.renderTo(Ext.DomQuery.selectNode(".deleteplaceholder", target.element.dom));

        dataview.on({
            single: true,
            buffer: 250,
            itemtouchstart: removeDeleteButton
        });
        dataview.element.on({
            single: true,
            buffer: 250,
            touchstart: removeDeleteButton
        });
    },

    onHomeBack: function() {
        var navBtn = this.getNavBtn();

        if (navBtn.from !== 'studentJudges' && navBtn.from !== 'studentGrade') this.getLogoutBtn().show();

        if (navBtn.from === 'newQuestion') {
            navBtn.from = 'questionsTab';
            navBtn.setText("");
            navBtn.setIconCls('add');
        }

        else if (navBtn.from === 'sendInvitation'){
            navBtn.from = 'judgesTab';
            navBtn.setText("");
            navBtn.setIconCls('add');
        }

        else if (navBtn.from === 'studentView'){
            navBtn.from = 'studentsTab';
            navBtn.setText("Load");
            navBtn.setIconCls('');
        }

        else if (navBtn.from === 'studentJudges') {
            var form = this.getMain().down('adminStudentView');

            form.setRecord(form.getRecord());
            navBtn.from = 'studentView';
            navBtn.setText("Save");
            navBtn.setIconCls('');
            navBtn.show();
        }

        else if(navBtn.from === 'changePwd') {
            navBtn.from = "settingsTab";
            navBtn.setText("Save");
            navBtn.setIconCls('');
            navBtn.show();
        }

        else if (navBtn.from === 'studentGrade') {
            navBtn.from = 'studentJudges';
        }

        else navBtn.hide();
    },


    onlivestatsGraphBtnTap: function() {
        var mainView = this.getMain();
        this.getLogoutBtn().hide();
        mainView.push({
            xtype: 'livestatsGraph'
        });
    },

    onLivestatsShow: function() {   
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            form = mainView.down('livestats'),
            store = Ext.getStore('Livestats');
            store.load();

        navBar.setTitle("Livestats");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Livestats";
        navBtn.from = 'LivestatsTab';
        navBtn.setText('');
        navBtn.setIconCls('refresh');
        navBtn.show();
        
        form.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
    }
});