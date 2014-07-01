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
            'admin.Email',
            'admin.NewEmailTemplate',
            'admin.JudgesOptions',
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
            'Livestats',
            'LivestatsGraph',
            'Terms',
            'StudentsContacts',
            'JudgesContacts',
            'LoginInstance'
        ],

        refs: {
            main: 'adminMain',
            navBtn: 'adminMain #navigBtn',
            logoutBtn: 'adminMain #logoutBtn',
            backBtn: 'adminMain #backBtn',
            judgesOptions: {
                autoCreate: true,
                selector: 'judgesOptions',
                xtype: 'judgesOptions'
            },
            emailTemplate: {
                autoCreate: true,
                xtype: 'emailTemplate',
                selector: 'emailTemplate'
            },
            LivestatsBtn: 'adminMain #LivestatsBtn',
            rolesBtn: 'adminMain #rolesBtnAdmin',
            studentEmail: 'adminStudentView #studentEmail'
        },

        control: {
            "adminMain": {
                show: 'onAdminLoadRoles',
                back: 'onHomeBack'
            },
            "adminMain #navigBtn": {
                tap: 'onNavBtnTap'
            },
            "adminMain #backBtn":{
                tap: 'onBackBtnTap'
            },
            "adminMain adminHome": {
                show: 'onHomeTabShow'
            },
            "adminMain tabpanel tabpanel": {
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
            "adminStudentGrade button": {
                tap: 'onAcceptJudgeGradeTap'
            },
            "email": {
                show: 'onEmailShow',
                activeitemchange: 'onEmailActiveItemChange',
                hide: 'onEmailHide'
            },

            "email selectfield": {
                change: 'onTemplateFieldChange'
            },            
            "email checkboxfield[name=allStudents]": {
                check: 'onAllStudentsChecked',
                uncheck: 'onAllStudentsUnchecked'
            },
            "email checkboxfield[name=activeStudents]":{
                uncheck: 'onActiveStudentsUnchecked',
                check: 'onActiveStudentsCheck'
            },
            "email checkboxfield[name=allJudges]": {
                check: 'onAllJudgesChecked',
                uncheck: 'onAllJudgesUnchecked'
            },
            "email checkboxfield[name=activeJudges]": {
                check: 'onActiveJudgesChecked',
                uncheck: 'onActiveJudgesUnchecked'
            },
            "email checkboxfield[name=pastJudges]": {
                uncheck: 'onActiveJudgesUnchecked',
                check: 'onPastJudgesChecked'

            },
            "email checkboxfield[name=pastStudents]":{
                uncheck: "onPastStudensUncheck",
                check: "onPastStudentsCheck"
            },
            "judgesOptions checkboxfield[name=invitedJudges]": {
                check: 'onInvitedJudgesCheck',
                uncheck: 'onInvitedJudgesUncheck'
            },
            "judgesOptions checkboxfield[name=pendingJudges]": {
                uncheck: 'onPendingJudgesUncheck',
                check: 'onPendingJudgesCheck'
            },
            "judgesOptions checkboxfield[name=acceptedJudges]": {
                uncheck: 'onPendingJudgesUncheck',
                check: 'onAcceptedJudgesCheck'
            },
            "judgesOptions checkboxfield[name=declinedJudges]": {
                uncheck: 'onPendingJudgesUncheck',
                check: 'onDeclinedJudgesCheck'
                
            },
            "emailTemplate": {
                show: 'onEmailTemplateShow'
            },
            "adminMain livestats": {
                show: 'onLivestatsListShow'
            },
            "livestats #livestatsGraphBtn": {
                tap: 'onlivestatsGraphBtnTap'
            },
            "adminStudentView #studentRolesBtnAdmin": {
                tap: 'onStudentRolesBtnTap'
            },
            "settings #myRolesBtn": {
                tap: 'onMyRolesBtnTap'
            }
        }
    },
    onEmailTemplateShow: function(panel){
        var main = this.getMain();
        if (panel.tinyMCEinitialized !== true) {
            tinymce.init({
                selector: "textarea#elm1",
                theme: "modern",
                width: main.getWidth(),
                height: 200,
                plugins: [
                     "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                     "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                     "save table contextmenu directionality emoticons template paste textcolor"
                ],
                content_css: "css/content.css",
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
                style_formats: [
                     { title: 'Bold text', inline: 'b' },
                     { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                     { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                     { title: 'Example 1', inline: 'span', classes: 'example1' },
                     { title: 'Example 2', inline: 'span', classes: 'example2' },
                     { title: 'Table styles' },
                     { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
                ]
            });
            panel.tinyMCEinitialized = true;
        }
        
    },
    //=============================================================================
    //Handlers for the judgesOptions view
    //=============================================================================
    onDeclinedJudgesCheck:function(chk, e, eO){
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                invitedJudges = jo.down('checkboxfield[name=invitedJudges]'),
                pendingJudges = jo.down('checkboxfield[name=pendingJudges]'),
                acceptedJudges = jo.down('checkboxfield[name=acceptedJudges]');
            if (pendingJudges.getChecked() === true && acceptedJudges.getChecked() === true) {
                invitedJudges.check();
            }
        }
    }, 
    onAcceptedJudgesCheck: function(chk, e, eO){
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                invitedJudges = jo.down('checkboxfield[name=invitedJudges]'),
                declinedJudges = jo.down('checkboxfield[name=declinedJudges]'),
                pendingJudges = jo.down('checkboxfield[name=pendingJudges]');
            if (pendingJudges.getChecked() === true && declinedJudges.getChecked() === true) {
                invitedJudges.check();
            }
        }
    },
    onPendingJudgesCheck: function(chk,e,eO){
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                invitedJudges = jo.down('checkboxfield[name=invitedJudges]'),
                acceptedJudges = jo.down('checkboxfield[name=acceptedJudges]'),
                declinedJudges = jo.down('checkboxfield[name=declinedJudges]');
            if (acceptedJudges.getChecked() === true && declinedJudges.getChecked() === true) {
                invitedJudges.check();
            }

        }
    },
    onPendingJudgesUncheck: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                invitedJudges = jo.down('checkboxfield[name=invitedJudges]');
            invitedJudges.uncheck();
        }
    },
    onInvitedJudgesUncheck: function(chk, e, eO){
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                pendingJudges = jo.down('checkboxfield[name=pendingJudges]'),
                acceptedJudges = jo.down('checkboxfield[name=acceptedJudges]'),
                declinedJudges = jo.down('checkboxfield[name=declinedJudges]');
            pendingJudges.uncheck();
            acceptedJudges.uncheck();
            declinedJudges.uncheck();
        }
    },
    onInvitedJudgesCheck: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var jo = this.getJudgesOptions(),
                pendingJudges = jo.down('checkboxfield[name=pendingJudges]'),
                acceptedJudges = jo.down('checkboxfield[name=acceptedJudges]'),
                declinedJudges = jo.down('checkboxfield[name=declinedJudges]');
            pendingJudges.check();
            acceptedJudges.check();
            declinedJudges.check();
        }
        
    },
    //===========================================================================================
    //Handlers for the Email view
    //===========================================================================================
    onPastJudgesChecked: function(chk, e, eO){
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                allJudges = main.down('email checkboxfield[name=allJudges]'),
                currentJudges = main.down('email checkboxfield[name=activeJudges]');
            if (currentJudges.getChecked()) {
                allJudges.check();
            }
        }
    },
    onPastStudentsCheck: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                currentStudents = main.down('email checkboxfield[name=activeStudents]'),
                allStudents = main.down('email checkboxfield[name=allStudents]');
            if (currentStudents.getChecked() === true) {
                allStudents.check();
            }
        }
    },
    onPastStudensUncheck: function(chk,e,eO){
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                allStudents = main.down('email checkboxfield[name=allStudents]');
            allStudents.uncheck();
        }
    },
    onActiveStudentsCheck: function(chk, e, eO){
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                pastStudents = main.down('email checkboxfield[name=pastStudents]'),
                allStudents = main.down('email checkboxfield[name=allStudents]');
            if (pastStudents.getChecked() === true) {
                allStudents.check();
            }
        }
    },
    onActiveStudentsUnchecked: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                allStudents = main.down('email checkboxfield[name=allStudents]');
            allStudents.uncheck();
        }
    },
    onActiveJudgesUnchecked: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                        allJudgesCk = main.down('email checkboxfield[name=allJudges]'),
                        judgesOptions = this.getJudgesOptions();
                
            allJudgesCk.uncheck();
            judgesOptions.hide();

        }

    },
   
    onActiveJudgesChecked: function (chkBox, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                pastJudges = main.down("email checkboxfield[name=pastJudges]"),
                allJudges = main.down("email checkboxfield[name=allJudges]");
            if (pastJudges.getChecked() === true) {
                allJudges.check();
            }
            var judgesOptions = this.getJudgesOptions();
            judgesOptions.showBy(chkBox);
        }
        
    },
    onAllJudgesUnchecked: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                currentJudges = main.down('email checkboxfield[name=activeJudges]'),
                pendingJudges = main.down('email checkboxfield[name=pastJudges]');
            currentJudges.uncheck();
            pendingJudges.uncheck();
        }
        
    },
    onAllJudgesChecked: function(chk, e, eO){
        var main = this.getMain(),
            currentJudges = main.down('email checkboxfield[name=activeJudges]'),
            pendingJudges = main.down('email checkboxfield[name=pastJudges]');
        currentJudges.check();
        pendingJudges.check();
    },
    onAllStudentsUnchecked: function (chk, e, eO) {
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
           currentStudentsChckBox = main.down('email checkboxfield[name=activeStudents]'),
           pastStudentsChkBox = main.down('email checkboxfield[name=pastStudents]');
            currentStudentsChckBox.setChecked(false);
            pastStudentsChkBox.setChecked(false);

        }
        
    },
    onAllStudentsChecked: function(){
        var main = this.getMain(),
            currentStudentsChckBox = main.down('email checkboxfield[name=activeStudents]'),
            pastStudentsChkBox = main.down('email checkboxfield[name=pastStudents]');
        currentStudentsChckBox.setChecked(true);
        pastStudentsChkBox.setChecked(true);

    },
    //===========================================================================================
    //Handlers for the email template view
    //===========================================================================================
    onTemplateFieldChange: function (select, newValue, oldValue, eOpts) {
        var main = this.getMain(),
            navBtn = this.getNavBtn(),
            backBtn = this.getBackBtn();
        if (newValue === 'CREATE_NEW') {
            this.getLogoutBtn().hide();
            backBtn.hide();
            main.push(this.getEmailTemplate());
            navBtn.setText('Save');
            navBtn.setIconCls('');
        }
    },
    //===========================================================================================
    //Handlers for the email view
    //===========================================================================================
    onEmailHide: function () {
        var backBtn = this.getBackBtn();
        if (Ext.isDefined(backBtn)) backBtn.hide();
    },
    onEmailActiveItemChange: function (container, value, oldValue, eOpts) {
        var main = this.getMain();
        var navBtn = this.getNavBtn(),
             backBtn = this.getBackBtn();
        if (value.name === 'sendPanel') {
            navBtn.setText('Send');
            navBtn.setIconCls('');
            backBtn.show();
           
        }else if(value.name === 'listPanel'){
            backBtn.show();
            navBtn.setText('');
            navBtn.setIconCls('arrow_right');
        } else {
            navBtn.setText('');
            navBtn.setIconCls('arrow_right');
            backBtn.hide();
        }
    },

    onEmailShow: function (email) {
        var main = this.getMain(),
            navBar = main.getNavigationBar(),
            navBtn = this.getNavBtn(),
            backBtn = this.getBackBtn();
           

        navBar.setTitle('Email');
        if (email.getActiveItem().name === 'sendPanel') {
            navBtn.setIconCls('');
            navBtn.setText('Send');
            backBtn.show();
        } else if (email.getActiveItem().name === 'listPanel') {
            backBtn.show();
            navBtn.setIconCls('arrow_right');
            navBtn.setText('');
        }
        else {
            navBtn.setIconCls('arrow_right');
            navBtn.setText('');
        }
       
        navBtn.from = 'Email';
    },
    //===========================================================================================
    //Back Button handler used in th email module
    //===========================================================================================
    onBackBtnTap: function(){
        var main = this.getMain(),
            email = main.down("email");
        email.previous();


    },

    //===========================================================================
    //First version stuff
    //===========================================================================
    onAcceptJudgeGradeTap: function (btn) {
        var me = this,
            main = me.getMain(),
            form = btn.up('formpanel'),
            rec = form.getRecord(),
            acceptance = btn.getUi() === 'confirm';

        main.setMasked({
            xtype: 'loadmask',
            message: 'Saving...'
        });

        Ext.php.Judges.setGrade(rec.get('id'), rec.get('StudentId'), acceptance, function (result) {
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

    onJudgeGradeListTap: function (dataView, index, target, record) {
        var navBtn = this.getNavBtn(),
            main = this.getMain(),
            name = record.get('FirstName') + ' ' + record.get('LastName');

        if (navBtn.from === 'studentGrade') return;

        navBtn.from = 'studentGrade';

        main.push({
            xtype: 'adminStudentGrade',
            title: name + "'" + (name.indexOf('s', name.length - 1) !== -1 ? '' : 's') + ' Grade'
        }).setRecord(record).student = dataView.student;
    },

    onResetAppBtnTap: function () {
        var mainView = this.getMain();

        Ext.Msg.confirm('Reset App', 'Are you sure you want to erase all content?', function (btn) {
            if (btn === 'yes') {
                mainView.setMasked({
                    xtype: 'loadmask',
                    message: 'Resetting...'
                });

                Ext.php.Settings.reset(function () {
                    // reload all loaded stores
                    Ext.StoreManager.each(function (s) {
                        if (s.isLoaded()) s.load();
                    });

                    mainView.setMasked(false);
                    Ext.Msg.alert('Reset App', 'Reset was successful', Ext.emptyFn);
                });
            }
        });
    },

    onChangePasswordBtnTap: function () {
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

    onStudentShowJudgesTap: function (btn) {
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
            title: name + "'" + (name.indexOf('s', name.length - 1) !== -1 ? '' : 's') + ' Judges'
        }).student = record;

        store.getProxy().setExtraParams({ 'id': record.get('id') });
        store.load({
            callback: function () {
                mainView.setMasked(false);
            }
        });
    },

    onPeopleTabChange: function (container, value) {
        var store = value.getStore(),
            navBtn = this.getNavBtn(),
            navBar = this.getMain().getNavigationBar(),
            title = value.getTitle();

        navBar.setTitle(title);
        navBar.backButtonStack[navBar.backButtonStack.length - 1] = title;

        if (!store.isLoaded()) store.load();

        if (title === 'Students') {
            navBtn.from = "studentsTab";
            navBtn.setText("Load");
            navBtn.setIconCls('');
            navBtn.show();
        }
        else if (title === 'Judges') {
            navBtn.from = "judgesTab";
            navBtn.setText('');
            navBtn.setIconCls('add');
            navBtn.show();
        }
        else if (title === 'Invitations') {
            navBtn.hide();
        }
    },

    onStudentsListTap: function (dataView, index, target, record) {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain();

        if (navBtn.from === 'studentView') return;

        navBtn.from = 'studentView';
        navBtn.setText('Save');
        navBtn.setIconCls('');

        this.getLogoutBtn().hide();

        mainView.push(Ext.create('widget.adminStudentView', {
            title: record.get('FirstName') + " " + record.get('LastName')
        }).setRecord(record));
    },

    onHomeTabShow: function () {
        var main = this.getMain(),
            navBtn = this.getNavBtn(),
            navBar = main.getNavigationBar(),
            form = main.down('adminHome');

        navBtn.from = 'homeTab';
        navBtn.setText('');
        navBtn.setIconCls('refresh');
        navBtn.show();

        navBar.setTitle("Home");
        navBar.backButtonStack[navBar.backButtonStack.length - 1] = "Home";

        Ext.php.Settings.getSummary(function (data) {
            form.setValues(data);
        });
    },

    onNavBtnTap: function (button) {
        var me = this,
            mainView = me.getMain();

        if (button.from === 'homeTab') {
            Ext.php.Settings.getSummary(function (data) {
                mainView.down('adminHome').setValues(data);
            });
        }

        else if (button.from === 'questionsTab') {

            this.getLogoutBtn().hide();

            mainView.push({
                xtype: 'newQuestion',
                title: "New Question"
            });

            button.setText("Save");
            button.setIconCls('');
            button.from = 'newQuestion';
        }

        else if (button.from === 'newQuestion') {
            var rec = mainView.getActiveItem().getValues();
            if (!Ext.isEmpty(rec.Text)) {

                mainView.setMasked({
                    xtype: 'loadmask',
                    message: 'Saving...'
                });

                Ext.php.Questions.add(rec.Text, function (result) {
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

        else if (button.from === 'judgesTab') {

            Ext.php.Settings.load(function (settings) {

                if (Ext.isEmpty(settings.Date) ||
                    Ext.isEmpty(settings.Time) ||
                    Ext.isEmpty(settings.EmailText) ||
                    Ext.isEmpty(settings.Subject) ||
                    Ext.isEmpty(settings.StudentsPerJudge) ||
                    Ext.isEmpty(settings.Location)) {
                    Ext.Msg.alert('Send Invitation', 'Please fill the settings first', function () {
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

        else if (button.from === 'studentsTab') {
            Ext.Msg.confirm('Load Students', 'Do you want to import students from the Sr Project Website?', function (btn) {
                if (btn === 'yes') {
                    Ext.php.Students.load(function () {
                        Ext.getStore('Students').load();
                    });
                }
            });
        }

        else if (button.from === 'sendInvitation') {
            var rec1 = mainView.getActiveItem().getValues();
            if (!Ext.isEmpty(rec1.email)) {

                Ext.php.Invites.send(rec1, function (result) {
                    var msg = result.success ? "Invitation successfully sent" : "Failed to send invitation",
                        store = Ext.getStore('Invitations');

                    if (result.success && store.isLoaded()) store.load();

                    Ext.Msg.alert("Invitation Email", msg);
                    mainView.pop();
                    me.onHomeBack();
                });
            }
        }

        else if (button.from === 'settingsTab') {
            var form = mainView.down('settings'),
                settings = form.getValues();

            settings.Date = Ext.Date.format(settings.Date, 'Y-m-d');

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            Ext.php.Settings.save(settings, function (result) {
                form.setMasked(false);
                if (result === false) Ext.Msg.alert('Settings', 'Error loading map image', Ext.emptyFn);
            });
        }

        else if (button.from === 'studentView') {
            var form = mainView.down('adminStudentView'),
                rec3 = form.getRecord(),
                id = rec3.get('id'),
                location = form.getValues().Location;

            if (Ext.isEmpty(location)) {
                location = 'TBA';
                form.setValues({ 'Location': location });
            }

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            Ext.php.Students.setLocation(id, location, function (result) {

                if (result === true) rec3.set('Location', location);
                else form.reset();

                form.setMasked(false);
            });
        }

        else if (button.from === 'changePwd') {
            var form = mainView.down('adminChangePwd'),
                values = form.getValues();

            form.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            values.email = OnlineJudges.user.Email;

            Ext.php.Settings.changePassword(values, function (result) {
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



        else if (button.from === "Email") {
            var email = this.getMain().down("email");
            if (email.getActiveItem().name === 'sendPanel') {
                Ext.Msg.Alert("Not yet", "Not implemented yet", Ext.emptyFN)
            } else {
                email.next();
            }

        }
    },

    onPeopleTabShow: function (tabpanel) {
        this.onPeopleTabChange(0, tabpanel.getActiveItem());
    },

    onSettingsTabShow: function () {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            form = mainView.down('settings');

        navBar.setTitle("Settings");
        navBar.backButtonStack[navBar.backButtonStack.length - 1] = "Settings";
        navBtn.from = "settingsTab";
        navBtn.setText("Save");
        navBtn.setIconCls('');
        navBtn.show();

        form.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        Ext.php.Settings.load(function (settings) {
            settings.Date = Ext.Date.parse(settings.Date, 'Y-m-d');
            form.setValues(settings);
            form.setMasked(false);
        });
    },

    onQuestionsTabShow: function () {
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            store = Ext.getStore('Questions');

        navBar.setTitle("Questions");
        navBar.backButtonStack[navBar.backButtonStack.length - 1] = "Questions";

        navBtn.from = "questionsTab";
        navBtn.setText("");
        navBtn.setIconCls('add');
        navBtn.show();

        if (!store.isLoaded()) store.load();
    },

    onQuestionsListSwipe: function (dataview, index, target, record, e) {
        if (e.direction !== "right") return;

        var del = Ext.create("Ext.Button", {
            ui: "decline",
            text: "Delete",
            style: "position:absolute;right:0.125in;top:3px",
            handler: function () {
                Ext.php.Questions.remove(record.get('id'));
                Ext.getStore('Questions').remove(record);
            }
        });

        var removeDeleteButton = function () {
            Ext.Anim.run(del, 'fade', {
                after: function () {
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

    onHomeBack: function () {
        var navBtn = this.getNavBtn(),
            navBar = this.getMain().getNavigationBar();

        if (navBtn.from !== 'studentJudges' && navBtn.from !== 'studentGrade') this.getLogoutBtn().show();

        if (navBtn.from === 'newQuestion') {
            navBtn.from = 'questionsTab';
            navBtn.setText("");
            navBtn.setIconCls('add');
        }

        else if (navBtn.from === 'sendInvitation') {
            navBtn.from = 'judgesTab';
            navBtn.setText("");
            navBtn.setIconCls('add');
        }

        else if (navBtn.from === 'studentView') {
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

        else if (navBtn.from === 'changePwd') {
            navBtn.from = "settingsTab";
            navBtn.setText("Save");
            navBtn.setIconCls('');
            navBtn.show();
        }

        else if (navBtn.from === 'studentGrade') {
            navBtn.from = 'studentJudges';
        }

        else if (navBtn.from === 'Email') {
            navBar.setTitle('Email');
            navBtn.setText('Send');
            this.getLogoutBtn().show();
            var backBtn = this.getBackBtn();
            backBtn.show();
        }

        else navBtn.hide();
    },

    //==============================================================
    //Livestats stuff
    //==============================================================
    onlivestatsGraphBtnTap: function() {
        var navBtn = this.getNavBtn(),
        mainView = this.getMain(),
        navBar = mainView.getNavigationBar();
        this.getLogoutBtn().hide();

        mainView.push({
            xtype: 'livestatsGraph'
        });
    },

    onLivestatsListShow: function() {   
        var navBtn = this.getNavBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            form = mainView.down('livestats'),
            store = Ext.getStore('Livestats');
            store.load();



        navBar.setTitle("Livestats");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Livestats";
        //navBtn.backButtonStack[navBar.backButtonStack.length-1] = "Livestats";
        navBtn.from = 'livestatsTab';
        navBtn.setText('');
        navBtn.setIconCls('list');

        navBtn.setListeners({
            tap: function() {
                var swidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
                    sheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
                    popup = new Ext.Panel({
                        top: 20,
                        right: 5,
                        items: []
                    });
                selStudents = {
                    xtype: 'button',
                    text: 'Students',
                    margin: '5',
                    handler: function() {
                        popup.hide();
                        var stre = Ext.getStore('Livestats');
                            stre.removeAll();
                            var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAll');
                            stre.getProxy().setDirectFn(method);
                            stre.load();
                        
                    }
                }
                selProjects = {
                    xtype: 'button',
                    text: 'Projects',
                    margin: '5',
                    handler: function() {
                        popup.hide();
                        var stre = Ext.getStore('Livestats');
                            stre.removeAll();
                            var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAllProjects');
                            stre.getProxy().setDirectFn(method);
                            stre.load();
                        
                    }
                }
                popup.add(selStudents);
                popup.add(selProjects);
                popup.show();
            }

        });
        form.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        form.setMasked(false);
    },

    //================================================================
    //Roles stuff
    //================================================================
    onAdminLoadRoles: function() {
        var me = this,
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            rolesBtn = this.getRolesBtn();

        me.onHomeTabShow();

        rolesBtn.setListeners({
            tap: function () {
                var swidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
                    sheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
                    popup = new Ext.Panel({
                        floating: true,
                        centered: true,
                        modal: true,
                        width: swidth/3,
                        height: sheight/3,
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
    },

    onStudentRolesBtnTap: function(button) {
        var me = this,
            swidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            sheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
            email = this.getStudentEmail().getValue(),
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                width: swidth / 3,
                height: sheight / 3,
                items: [
                    {
                        xtype: 'button',
                        docked: 'top',
                        iconCls: 'add',
                        ui: 'action-round',
                        handler: function () {
                            //Ext.Msg.alert("clicked");
                            me.addRoleDialog(popup, email);
                        }
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        text: 'Cancel',
                        handler: function () {popup.hide();}
                    }
                ]
            });

        Ext.php.LoginMain.getOtherRoles(email, function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] == "admin") {
                    adminRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Admin',
                                readOnly: true,
                                style: { 'border': '2px solid black' }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "admin"); }
                            }
                        ]                        
                    }
                    popup.add(adminRoleTab);
                }
                else if (roles[i] == "judge") {
                    judgeRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Judge',
                                readOnly: true,
                                style: { 'border': '2px solid black' }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "judge"); }
                            }
                        ]
                    }
                    popup.add(judgeRoleTab);
                }
                else if (roles[i] == "student") {
                    studentRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Student',
                                readOnly: true,
                                style: {'border': '2px solid black'}
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "student"); }
                            }
                        ]
                    }
                    popup.add(studentRoleTab);
                }
            }
        });
        popup.show();
    },

    onMyRolesBtnTap: function() {
        var me = this,
            swidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            sheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            email = user.get('email');
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                width: swidth / 3,
                height: sheight / 3,
                items: [
                    {
                        xtype: 'button',
                        docked: 'top',
                        iconCls: 'add',
                        ui: 'action-round',
                        handler: function () {
                            me.addRoleDialog(popup, email);
                        }
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        text: 'Cancel',
                        handler: function () { popup.hide(); }
                    }
                ]
            });

        Ext.php.LoginMain.getOtherRoles(email, function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] == "admin") {
                    adminRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Admin',
                                readOnly: true,
                                style: { 'border': '2px solid black' }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "admin"); }
                            }
                        ]
                    }
                    popup.add(adminRoleTab);
                }
                else if (roles[i] == "judge") {
                    judgeRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Judge',
                                readOnly: true,
                                style: { 'border': '2px solid black' }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "judge"); }
                            }
                        ]
                    }
                    popup.add(judgeRoleTab);
                }
                else if (roles[i] == "student") {
                    studentRoleTab = {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                value: 'Student',
                                readOnly: true,
                                style: { 'border': '2px solid black' }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'delete',
                                ui: 'decline',
                                docked: 'right',
                                margin: '10',
                                handler: function () { me.confirmRemoveRole(popup, email, "student"); }
                            }
                        ]
                    }
                    popup.add(studentRoleTab);
                }
            }
        });

        popup.show();
    },

    //======================================================================
    //Role Helper methods
    //======================================================================
    loadMainView: function (view, options) {
        Ext.Viewport.removeAll().add(Ext.create('widget.' + view, Ext.apply({
            title: 'CIS 4911 Online Judges'
        }, options || {})));
    },

    confirmRemoveRole: function (popup, user, role) {
        Ext.Msg.confirm('Remove Role', 'Are you sure you want to remove this role?', function (btn) {
            if (btn === 'yes') {
                Ext.php.LoginMain.removeRole(user, role, function (res) {
                    Ext.Msg.alert(""+res);
                });
                popup.hide();
            }
            else {/*do nothing*/ }
        });
    },

    addRoleDialog: function (popup, user) {
        popup.removeAll();
        popup.removeAt(0);
        var addAdminBtn = {
                xtype: 'button',
                text: 'Admin',
                ui: 'confirm',
                margin: '5',
                handler: function () {
                    Ext.php.LoginMain.addRole(user, "admin", function (resA) {
                        popup.hide();
                        Ext.Msg.alert("" + resA);
                    });
                }
            },
            addJudgeBtn = {
                xtype: 'button',
                text: 'Judge',
                ui: 'confirm',
                margin: '5',
                handler: function () {
                    Ext.php.LoginMain.addRole(user, "judge", function (resJ) {
                        popup.hide();
                        Ext.Msg.alert("" + resJ);
                    });
                }
            },
            addStudentBtn = {
                xtype: 'button',
                text: 'Student',
                ui: 'confirm',
                margin: '5',
                handler: function () {
                    Ext.php.LoginMain.addRole(user, "student", function (resS) {
                        popup.hide();
                        Ext.Msg.alert("" + resS);
                    });
                }
            };
        Ext.php.LoginMain.getOtherRoles(user, function (res) {
            var uRoles = res.Roles;
            if (uRoles == "admin;judge;student") {
                popup.hide();
                Ext.Msg.alert("No more roles to add");
            }
            else if (uRoles == "admin;judge") {
                popup.add(addStudentBtn);
            }
            else if (uRoles == "admin;student") {
                popup.add(addJudgeBtn);
            }
            else if (uRoles == "admin") {
                popup.add(addJudgeBtn);
                popup.add(addStudentBtn);
            }
            else if (uRoles == "judge;student") {
                popup.add(addAdminBtn);
            }
            else if (uRoles == "judge") {
                popup.add(addAdminBtn);
                popup.add(addStudentBtn);
            }
            else if (uRoles == "student") {
                popup.add(addAdminBtn);
                popup.add(addJudgeBtn);
            }
            else {
                popup.add(addAdminBtn);
                popup.add(addJudgeBtn);
                popup.add(addStudentBtn);
            }
        });
    }
});