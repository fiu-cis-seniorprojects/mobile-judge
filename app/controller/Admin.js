var taskLiveStatsTimer;
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
            'admin.StatsList',
            'admin.LivestatsGraph',
            'admin.TermsList',
            'admin.PendingGrades',
            'admin.PastJudgesOptions'
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
            'LoginInstance',
            'ExtraEmails',
            'EmailTemplates',
            'PendingGrades'
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
            pastJudgesOptions: {
                autoCreate: true,
                selector: 'pastJudgesOptions',
                xtype: 'pastJudgesOptions'
            },
            emailTemplate: {
                autoCreate: true,
                xtype: 'emailTemplate',
                selector: 'emailTemplate'
            },
            GradeSaveBtn: 'adminMain #GradeSaveBtn',
            LivestatsBtn: 'adminMain #LivestatsBtn',
            rolesBtn: 'adminMain #rolesBtnAdmin',
            studentEmail: 'adminStudentView #studentEmail',
            studentFName: 'adminStudentView #studentFName',
            studentLName: 'adminStudentView #studentLName',
            studentEmail: 'adminStudentView #studentEmail',
            terms: {
                autoCreate: true,
                selector: 'termsList',
                xtype: 'termsList'
            },
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
                activeitemchange: 'onPeopleTabChange',
                hide: 'onPeopleTabHide'
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
                uncheck: 'onPastJudgesUnchecked',
                check: 'onPastJudgesChecked'

            },
            "email checkboxfield[name=pastStudents]":{
                uncheck: "onPastStudensUncheck",
                check: "onPastStudentsCheck"
            },
            "email button[name=addTemplate]":{
                tap: 'onAddTemplateTap'
            },
            "email button[name=editTemplate]":{
                tap: 'onEditTemplateTap'
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
            "judgesOptions button[name=ok]":{
                tap: 'onJudgesOptionOKTap'
            },
            "emailTemplate": {
                show: 'onEmailTemplateShow'
            },
            "emailTemplate tabpanel[name=templateTabs]":{
                activeitemchange: 'onTemplateTabsItemChange'
            },
            "emailTemplate button[name=insertPlaceHolder]":{
                tap: 'onInsertPlaceHolderTap'
            },

            "adminMain livestats": {
                show: 'onLivestatsListShow',
                hide: 'onLivestatsHide'
            },
            "livestats #livestatsGraphBtn": {
                tap: 'onlivestatsGraphBtnTap'
            },
            "adminStudentView #studentRolesBtnAdmin": {
                tap: 'onStudentRolesBtnTap'
            },
            "settings #myRolesBtn": {
                tap: 'onMyRolesBtnTap'
            },
            "settings #questionsBtn": {
                tap: 'onQuestionsTabShow'
            },
            "adminMain adminJudges": {
                itemtap: 'onJudgesListTap'
            },
            "termsList button[name=OKBtn]": {
                tap: 'onTermsOKTab'

            },
            "pastJudgesOptions button[name=OKBtn]": {
                tap: 'onPastJOptionsOKTap'
            },
            "pastJudgesOptions checkboxfield[name=invitedJudges]": {
                check: 'onPJOinvitedCheck'
            },
            "pastJudgesOptions checkboxfield[name=pendingJudges]": {
                check: 'onPJOpendingCheck',
                uncheck: 'onPJOpendingUncheck'
            },
            "pastJudgesOptions checkboxfield[name=acceptedJudges]": {
                check: 'onPJOacceptedCheck',
                uncheck: 'onPJOpendingUncheck'
            },
            "pastJudgesOptions checkboxfield[name=declinedJudges]": {
                check: 'onPJOdeclinedCheck',
                uncheck: 'onPJOpendingUncheck'
            },
            "settings #myDefaultRoleBtn": {
                tap: 'onMyDefaultRoleBtnTap'
            }

        }
    },
    onPJOdeclinedCheck: function(){
        var pjo = this.getPastJudgesOptions();
        var pendingtPjo = pjo.down('checkboxfield[name=pendingJudges]');
        var acceptedPjo = pjo.down('checkboxfield[name=acceptedJudges]');
        var all = pjo.down('checkboxfield[name=invitedJudges]');
        if (pendingtPjo.getChecked() === true && acceptedPjo.getChecked() === true) {
            all.check();
        }
    },
    onPJOacceptedCheck:function(){
        var pjo = this.getPastJudgesOptions();
        var pendingtPjo = pjo.down('checkboxfield[name=pendingJudges]');
        var all = pjo.down('checkboxfield[name=invitedJudges]');
        var declinedPjo = pjo.down('checkboxfield[name=declinedJudges]');
        if (pendingtPjo.getChecked() === true && declinedPjo.getChecked() === true) {
            all.check();
        }
    },
    onPJOpendingUncheck: function(){
        var pjo = this.getPastJudgesOptions();
        var all = pjo.down('checkboxfield[name=invitedJudges]');
        all.uncheck();
      
    },
    onPJOpendingCheck: function(){
        var pjo = this.getPastJudgesOptions();
        var all = pjo.down('checkboxfield[name=invitedJudges]');
        var acceptedPjo = pjo.down('checkboxfield[name=acceptedJudges]');
        var declinedPjo = pjo.down('checkboxfield[name=declinedJudges]');

        if (acceptedPjo.getChecked() === true && declinedPjo.getChecked() === true) {
            all.check();
        }
    },
    onPJOinvitedCheck: function(){
        var pjo = this.getPastJudgesOptions();
        var pendingtPjo = pjo.down('checkboxfield[name=pendingJudges]');
        var acceptedPjo = pjo.down('checkboxfield[name=acceptedJudges]');
        var declinedPjo = pjo.down('checkboxfield[name=declinedJudges]');
        pendingtPjo.check();
        acceptedPjo.check();
        declinedPjo.check();
    },
    onPastJOptionsOKTap: function(){
        var pjo = this.getPastJudgesOptions();
        var main = this.getMain();
        var pendingtPjo = pjo.down('checkboxfield[name=pendingJudges]');
        var acceptedPjo = pjo.down('checkboxfield[name=acceptedJudges]');
        var declinedPjo = pjo.down('checkboxfield[name=declinedJudges]');
        var listPjo = pjo.down('list[name=terms]');
        var pastMain = main.down('checkboxfield[name=pastJudges]');
        if (pendingtPjo.getChecked() === false && acceptedPjo.getChecked() === false
            && declinedPjo.getChecked() === false && listPjo.getSelection().length == 0) {
            pastMain.uncheck();
        }
        pjo.hide();
        
    },
    //Funtion used in the TermsList view
    //==============================================================================================
    onTermsOKTab: function(btn){
        var main = this.getMain();
        var terms = this.getTerms();
        var list = terms.down('list[name=terms]');
        var chb = main.down('email checkboxfield[name=pastStudents]');
        //var current = main.down('email checkboxfield[name=activeStudents]');
        var all = main.down('email checkboxfield[name=allStudents]');

        if (list.getSelectionCount() > 0) {
            chb.check();
        }
        else {
            chb.uncheck();
            all.uncheck();
        }
        terms.hide();
       
    },
    //==============================================================================================

    //=============================================================================
    //Handlers for the judgesOptions view
    //=============================================================================
    onJudgesOptionOKTap: function(){
        var jOptions = this.getJudgesOptions();
        var pendingChk = jOptions.down('checkboxfield[name=pendingJudges]');
        var acceptedChk = jOptions.down('checkboxfield[name=acceptedJudges]');
        var declinedChk = jOptions.down('checkboxfield[name=declinedJudges]');

        var main = this.getMain();
        var activeJudges = main.down('checkboxfield[name=activeJudges]');
        if (pendingChk.getChecked() === false && acceptedChk.getChecked() === false
            && declinedChk.getChecked() === false)
            activeJudges.uncheck();
        jOptions.hide();
    },
    setJudgesStoreFilter: function () {
        var str = Ext.getStore('JudgesContacts');
        var main = this.getMain();
        var activeJudges = main.down('checkboxfield[name=activeJudges]');
        var pastJudges = main.down('checkboxfield[name=pastJudges]');
        var jOptions = this.getJudgesOptions();
        var pendingChk = jOptions.down('checkboxfield[name=pendingJudges]');
        var acceptedChk = jOptions.down('checkboxfield[name=acceptedJudges]');
        var declinedChk = jOptions.down('checkboxfield[name=declinedJudges]');

        var pastJO = this.getPastJudgesOptions();
        var pastTermsList = pastJO.down('list[name=terms]');
        var pastTerms = pastTermsList.getSelection().map(function (rec) { return rec.get('id') });
        var pastPending = pastJO.down('checkboxfield[name=pendingJudges]');
        var pastAccepted = pastJO.down('checkboxfield[name=acceptedJudges]');
        var pastDeclined = pastJO.down('checkboxfield[name=declinedJudges]');

	if(activeJudges === null) return;
        str.clearFilter();
        str.load();
        //str.each(function (item) {
        //    item.set('Send', true);
        //});

        str.filterBy(function (record) {
            var terms = record.get('Term').split(',');
            var resp = record.get('Response');
            var responses = resp.split(',');

            if (activeJudges.getChecked() === true) {
                //Check if it is pending
                if (pendingChk.getChecked() === true) {
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i] === "Current" && responses[i] === '-1')
                            return record;
                    }
                }
                //Checking accepted
                if (acceptedChk.getChecked() === true && responses !== null) {
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i] === "Current" && responses[i] === '1')
                            return record;
                    }
                }
                //Check declined
                if (declinedChk.getChecked() === true && responses !== null) {
                    for (var i = 0; i < terms.length; i++) {
                        if (terms[i] === "Current" && responses[i] === '0')
                            return record;
                    }
                }
            } else if (pastJudges.getChecked() === true) {
                for (var i = 0; i < terms.length; i++) {
                    var wasTermSelected = false;
                    for (var j = 0; j < pastTerms.length; j++)
                        if (pastTerms[j] === terms[i]) wasTermSelected = true;
                    if (!wasTermSelected) continue;

                    //Checking past pending
                    if (pastPending.getChecked() === true && responses[i] === '-1') {
                        return record;
                    }

                    //Checking past accepted
                    if (pastAccepted.getChecked() === true && responses[i] === '1') {
                        return record;
                    }

                    //Checking past declined
                    if (pastDeclined.getChecked() === true && responses[i] === '0') {
                        return record;
                    }
                }
            }

            
        });
    },
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
    onEmailTemplateShow: function (panel) {
        var main = this.getMain();
        var backBtn = this.getBackBtn();
        var navBtn = this.getNavBtn();
        navBtn.setText('Save');
        backBtn.hide();

        //tinymce.init({
        //    selector: "textarea.tinymce",
        //    theme: "modern",
        //    width: main.getWidth(),
        //    height: 200,
        //    plugins: [
        //            "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        //            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        //            "save table contextmenu directionality emoticons template paste textcolor"
        //    ],
        //    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
        //    style_formats: [
        //            { title: 'Bold text', inline: 'b' },
        //            { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
        //            { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
        //            { title: 'Example 1', inline: 'span', classes: 'example1' },
        //            { title: 'Example 2', inline: 'span', classes: 'example2' },
        //            { title: 'Table styles' },
        //            { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
        //    ]
        //});



    },
    onAddTemplateTap: function(){
        var main = this.getMain();
        var navBar = main.getNavigationBar();

        main.push({ xtype: 'emailTemplate' });
        var navBtn = this.getNavBtn();
        navBtn.from = 'emailTemplateSave';
        navBar.setTitle('Template');
    },
    onEditTemplateTap: function(){
        var main = this.getMain();
        var navBar = main.getNavigationBar();
        var dropDown = main.down('email selectfield[name=templates]');
        var template = main.push({ xtype: 'emailTemplate' });
        template.setRecord(dropDown.getRecord());
        template.down('fieldset').setRecord(dropDown.getRecord());
        var navBtn = this.getNavBtn();
        navBtn.from = 'emailTemplateUpdate';
        navBar.setTitle('Template');
    },
   
    setStudentsStoreFilter: function () {
        var str = Ext.getStore('StudentsContacts');
        var main = this.getMain(),
            currentStudents = main.down('email checkboxfield[name=activeStudents]'),
            pastStudents = main.down('email checkboxfield[name=pastStudents]');
        var termsList = this.getTerms().down('list[name=terms]');
        var terms = termsList.getSelection().map(function (rec) { return rec.get('id') });
	if(currentStudents === null) return;
        //str.load();
        str.clearFilter();
        str.load();
        str.filterBy(function (record) {
            //var name = record.get('FirstName');
            //if (name === 'Alicia') return record;
            var term = record.get('Term');
            if ((currentStudents.getChecked() === true && term === 'Current') ||
                (pastStudents.getChecked() === true && Ext.Array.contains(terms,term))) {
                return record;
            }
        });
    },
    onPastJudgesChecked: function (chk, e, eO) {
        //if (Ext.isDefined(e)) {
            var main = this.getMain(),
                allJudges = main.down('email checkboxfield[name=allJudges]'),
                currentJudges = main.down('email checkboxfield[name=activeJudges]');
            if (currentJudges.getChecked()) {
                allJudges.check();
            }
            var pJO = this.getPastJudgesOptions();
            var pastJudges = main.down('email checkboxfield[name=pastJudges]');
            pJO.showBy(pastJudges);
        //}
    },
    onPastStudentsCheck: function (chk, e, eO) {
        var main = this.getMain();
        var currentStudents = main.down('email checkboxfield[name=activeStudents]'),
            pastStudents = main.down('email checkboxfield[name=pastStudents]')
        allStudents = main.down('email checkboxfield[name=allStudents]');
        if (Ext.isDefined(e)) {
           if (currentStudents.getChecked() === true) {
                allStudents.check();
            }
            
        }
        this.getTerms().showBy(pastStudents);
    },
    onPastStudensUncheck: function(chk,e,eO){
        if (Ext.isDefined(e)) {
            var main = this.getMain(),
                allStudents = main.down('email checkboxfield[name=allStudents]');
            allStudents.uncheck();
           
        }
        var terms = this.getTerms();
        terms.hide();
        var termsList = terms.down('list[name=terms]');
        termsList.deselectAll();
       
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
        //if (Ext.isDefined(e)) {
            var main = this.getMain(),
                        allJudgesCk = main.down('email checkboxfield[name=allJudges]'),
                        judgesOptions = this.getJudgesOptions();
                
            allJudgesCk.uncheck();
            var invited = judgesOptions.down('checkboxfield[name=invitedJudges]');
            invited.uncheck();
            var pending = judgesOptions.down('checkboxfield[name=pendingJudges]');
            pending.uncheck();
            var declined = judgesOptions.down('checkboxfield[name=declinedJudges]');
            declined.uncheck();
            judgesOptions.hide();

        //}

    },
    onPastJudgesUnchecked: function (chk, e, eO) {
       // if (Ext.isDefined(e)) {
            var main = this.getMain(),
                        allJudgesCk = main.down('email checkboxfield[name=allJudges]'),
                        judgesOptions = this.getPastJudgesOptions();

            allJudgesCk.uncheck();
            var invited = judgesOptions.down('checkboxfield[name=invitedJudges]');
            invited.uncheck();
            var pending = judgesOptions.down('checkboxfield[name=pendingJudges]');
            pending.uncheck();
            var declined = judgesOptions.down('checkboxfield[name=declinedJudges]');
            declined.uncheck();
            judgesOptions.hide();

        //}

    },
   
    onActiveJudgesChecked: function (chkBox, e, eO) {
       // if (Ext.isDefined(e)) {
            var main = this.getMain(),
                pastJudges = main.down("email checkboxfield[name=pastJudges]"),
                allJudges = main.down("email checkboxfield[name=allJudges]");
            if (pastJudges.getChecked() === true) {
                allJudges.check();
            }
            var judgesOptions = this.getJudgesOptions();
            judgesOptions.showBy(chkBox);
       // }
        
        
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
           subjectField = main.down('email textfield[name=subject]'),
           bodyPanel = main.down('email panel[name=bodyPanel]');
        var record = select.getRecord();
        var subject;
        var body;
        if (record !== null) {
            subject = record.get('Subject');
            body = record.get('Body');
        } else {
            subject = '';
            body = '';
        }
        subjectField.setValue(subject);
        bodyPanel.setHtml(body);
    },
    onTemplateTabsItemChange: function(tabpanel, newValue, oldValue ){
        if (newValue.name === 'preview') {
            var main = this.getMain();
            var textArea = main.down('emailTemplate textareafield[name=Body]')
            var prevPanel = main.down('emailTemplate panel[name=preview]');
            prevPanel.setHtml(textArea.getValue().replace(/\n/, "<br/>"));
            //
        }
    },
    onInsertPlaceHolderTap: function(){
        var main = this.getMain();
        var textArea = main.down('emailTemplate textareafield[name=Body]');
        var dropDown = main.down('emailTemplate selectfield[name=placeHolders]');
        var placeHolder = dropDown.getValue();
        var selectionStart = textArea.element.select('textarea').elements[0].selectionStart;
        var currentText = textArea.getValue();
        var firstHalf = currentText.substring(0, selectionStart);
        var secondHalf = currentText.substring(selectionStart, currentText.length)
        var final = firstHalf.concat(placeHolder).concat(secondHalf);
        textArea.setValue(final);
    },
    //===========================================================================================
    //Handlers for the email view
    //===========================================================================================
    onEmailHide: function () {
        var backBtn = this.getBackBtn(),
            logoutBtn = this.getLogoutBtn();
        if(Ext.isDefined(logoutBtn)) logoutBtn.show();
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

            var extraEmails = main.down('email textareafield[name=extraEmails]');
            this.setJudgesStoreFilter();
            this.setStudentsStoreFilter();
            if (extraEmails !== null) {
                var str = Ext.getStore('ExtraEmails');
                str.removeAll();
                var emails = extraEmails.getValue().split(/\n/);
                for (i = 0; i < emails.length; i++) {
                    if (emails[i].length > 0) {
                        Ext.php.Email.getContact(emails[i], function (res) {
                            if (res.total > 0) {
                                var firstName = '', lastName = '', email = '';
                                firstName = res.data[0].FirstName;
                                lastName = res.data[0].LastName;
                                email = res.data[0].Email;
                                str.add({ Email: email, FirstName: firstName, LastName: lastName });
                            } else {
                                str.add({ Email: res.data, FirstName: '', LastName: '' });
                            }

                        });

                    }
                   
                }
            }
            
           
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
            backBtn = this.getBackBtn(),
            logoutBtn = this.getLogoutBtn();
        logoutBtn.hide();
        navBtn.show();
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
    //Back Button handler used in the email module
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
            GradeSaveBtn = this.getGradeSaveBtn();
            GradeSaveBtn.hide();

        }
        else if (title === 'Judges') {
            navBtn.from = "judgesTab";
            navBtn.setText('');
            navBtn.setIconCls('add');
            navBtn.show();
            GradeSaveBtn = this.getGradeSaveBtn();
            GradeSaveBtn.hide();
        }
        else if (title === 'Invitations') {
            navBtn.hide();
            GradeSaveBtn = this.getGradeSaveBtn();
            GradeSaveBtn.hide();
        }
        else if (title === 'Grades'){
            navBtn.from = "pendingGradesTab";
            navBtn.setText('');
            navBtn.setIconCls('');
            navBtn.hide();
            GradeSaveBtn = this.getGradeSaveBtn();
            GradeSaveBtn.show();
            store = Ext.getStore('PendingGrades');
            store.load();

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

    onNavBtnTap: function () {
        var me = this,
            mainView = me.getMain();
        var button = this.getNavBtn();
        if (button.from === 'homeTab') {
            Ext.php.Settings.getSummary(function (data) {
                mainView.down('adminHome').setValues(data);
            });
        }

        else if (button.from === 'questionsView') {

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
            var sentEmail = 0; var errorEmails = 0;
            var sendFunction = function (r) {
                var send = r.get('Send');
                if (send === true) {
                    var to = r.get('Email');
                    to = 'anorc002@fiu.edu;'
                    var fname = r.get('FirstName');
                    if (!Ext.isDefined(fname)) fname = '';

                    var lname = r.get('LastName');
                    if (!Ext.isDefined(lname)) lname = '';

                    var subject = template.get('Subject');
                    var body = template.get('Body');
                    var bodyReady = body.replace('RECIPIENT_NAME', fname).
                        replace('RECIPIENT_LAST_NAME', lname).
                        replace('RECIPIENT_EMAIL', to).
                        replace('SENDER_NAME', 'Masoud Sadjadi').
                        replace('SENDER_EMAIL', 'sadjadi@cs.fiu.edu');
                    var from = ' Masoud Sadjadi <sadjadi@cs.fiu.edu>';
                    Ext.php.Email.sendEmail(to, subject, bodyReady, from,
                        function (result) {
                            if (result === true) sentEmail++;
                            else errorEmails++;
                        });
			sentEmail++;
                    Ext.php.Email.sendEmail('jjord006@fiu.edu', subject, bodyReady, from, Ext.emptyFN);
                    

                }
               

            };
             
            var email = me.getMain().down("email");
            if (email.getActiveItem().name === 'sendPanel') {
                var templateSelect = email.down('selectfield[name=templates]');
                var template = templateSelect.getRecord();
                if (!Ext.isDefined(template)) {
                    Ext.Msg.alert("Error", "Please select a template", Ext.emptyFN);
                } else {
                     var studentsStr = Ext.getStore('StudentsContacts');
                     studentsStr.each(sendFunction);
                     var extraEStr = Ext.getStore('ExtraEmails');
                     extraEStr.each(sendFunction);
                     var judgeStore = Ext.getStore('JudgesContacts');
                     judgeStore.each(sendFunction);
                     Ext.Msg.alert( sentEmail + " emails were sent  successfully.");
                }

               
                //Ext.Msg.alert("Not yet", string, Ext.emptyFN)
            } else {
                email.next();
            }
       
        } else if (button.from === 'emailTemplateSave') {
            var main = this.getMain();
            var title = main.down('emailTemplate textfield[name=TemplateTitle]');
            var subject = main.down('emailTemplate textfield[name=Subject]');
            var body = main.down('emailTemplate textareafield[name=Body]');
            var htmlBody = body.getValue().replace(/\n/, "<br/>");
            Ext.php.Email.addTemplate(title.getValue(),subject.getValue(),htmlBody,
                function (result) {
                    if (result.success === true) {
                        Ext.Msg.alert("Confirmation", "A new template was created successfully", 
                            function () {
                                mainView.pop();
                                me.onHomeBack();
                                Ext.getStore('EmailTemplates').load();

                            });
                    } else {
                        Ext.Msg.alert("Error", result.msg, Ext.emptyFN);
                    }             
                });
            
        } else if (button.from === 'emailTemplateUpdate') {
            var main = this.getMain();
            var template = main.down('emailTemplate');
            var title = main.down('emailTemplate textfield[name=TemplateTitle]');
            var subject = main.down('emailTemplate textfield[name=Subject]');
            var body = main.down('emailTemplate textareafield[name=Body]');
            var htmlBody = body.getValue().replace(/\n/, "<br/>");

            var values = {
                TemplateID: template.getRecord().get('TemplateID'),
                TemplateTitle: title.getValue(),
                Subject: subject.getValue(),
                Body: htmlBody
            };
            
            Ext.php.Email.updateTemplate(values,
                function (result) {
                    if (result.success === true) {
                        
                        Ext.Msg.alert("Confirmation", "Email template updated succesfully",
                            function () {
                                mainView.pop();
                                me.onHomeBack();
                                Ext.getStore('EmailTemplates').load();
                                var select = main.down('email selectfield[name=templates]');
                                select.setValue(null);
                            });
                    } else {
                        Ext.Msg.alert('Error', result.msg, Ext.emptyFN);
                    }
                });

           
        }
    },

    onPeopleTabHide: function(tabpanel){
            GradeSaveBtn = this.getGradeSaveBtn();
            GradeSaveBtn.hide();

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

        if (navBtn.from === 'questionsView') return;

        this.getLogoutBtn().hide();
        navBar.backButtonStack[navBar.backButtonStack.length - 1] = "Questions";

        navBtn.from = 'questionsView';

        mainView.push({
            xtype: 'questions',
            title: "Questions"
        });

        navBtn.setText("");
        navBtn.setIconCls('add');
        navBtn.from = 'questionsView';
        navBtn.show();

        //Ext.Msg.alert("" + navBtn.from);

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
            navBtn.from = 'questionsView';
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

        else if (navBtn.from === 'emailTemplateSave' || navBtn.from === 'emailTemplateUpdate') {
            navBar.setTitle('Email');
            navBtn.setText('Send');
            var backBtn = this.getBackBtn();
            backBtn.show();
            this.getLogoutBtn().hide();
            navBtn.from = 'Email'
        }

        else if (navBtn.from === 'questionsView') {
            navBtn.from = 'settingsTab'
            //Ext.Msg.alert("" + navBtn.from);
            navBtn.setText("Save");
            navBtn.setIconCls('');
            navBar.setTitle("Settings");
            navBtn.show();
        }

        else navBtn.hide();
    },

    //==============================================================
    //Livestats stuff
    //==============================================================
    // onLiveStatInitilize:function() {
    //     alert('hello moto');
    //     var main = this.getMain(),
    //         spinner = main.down('settings spinnerfield[name=RefreshRate]');
    //     //var allStudents = { id: 999, FirstName: 'ALL', LastName: 'ALL', Grade: nu

    refreshFunc: function(){
            var main = this.getMain(),
             spinner = main.down('settings spinnerfield[name=RefreshRate]');


            var time = spinner.getValue() * 1000;
            // taskLiveStatsTimer.delay(time);

            clearInterval(taskLiveStatsTimer);
            if(time != 0){
                taskLiveStatsTimer = setInterval(function() {
                    var store = Ext.StoreMgr.lookup('Livestats');
                        store.load();
                    var str = Ext.StoreMgr.lookup('LivestatsGraph');
                        str.load();
                }, time);
            }
        },

    onLivestatsHide: function() {
        var LivestatsBtn = this.getLivestatsBtn();
            LivestatsBtn.hide();
    },

    onlivestatsGraphBtnTap: function() {
        var navBtn = this.getNavBtn(),
        mainView = this.getMain(),
        navBar = mainView.getNavigationBar();
        this.getLogoutBtn().hide();

        var store = Ext.getStore('Livestats');
        store.setSorters('id');

        mainView.push({
            xtype: 'livestatsGraph'
        });
    },

    onLivestatsListShow: function() {   
        var navBtn = this.getNavBtn(),
            LivestatsBtn = this.getLivestatsBtn(),
            mainView = this.getMain(),
            navBar = mainView.getNavigationBar(),
            form = mainView.down('livestats');
            //store = Ext.getStore('Livestats');
            //store.load();

        var store = Ext.getStore('Livestats');
        var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAll');
        store.getProxy().setDirectFn(method);
	store.setSorters('id');

        navBar.setTitle("Stats");
        navBar.backButtonStack[navBar.backButtonStack.length-1] = "Livestats";
        //navBtn.backButtonStack[navBar.backButtonStack.length-1] = "Livestats";
        navBtn.from = 'livestatsTab';
        navBtn.hide();

        LivestatsBtn.setListeners({
            tap: function() {
                var swidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
                    sheight = (window.innerHeight > 0) ? window.innerHeight : screen.height,
                    popup = new Ext.Panel({
                        modal: true,
                        //floating: true,
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
                            LivestatsBtn.setText("Students");
                        
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
                            LivestatsBtn.setText("Projects");
                        
                    }
                }
                popup.add(selStudents);
                popup.add(selProjects);
                popup.show();
            }

        });
        LivestatsBtn.show();

        form.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        form.setMasked(false);

        this.getApplication().getController('Admin').refreshFunc();
    
    },

    //================================================================
    //Roles stuff
    //================================================================
    onAdminLoadRoles: function () {
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
                Ext.Viewport.add(popup);
                popup.show();
            }
        });
    },

    onStudentRolesBtnTap: function(button) {
        var me = this,
            email = this.getStudentEmail().getValue(),
            firstname = this.getStudentFName().getValue(),
            lastname = this.getStudentLName().getValue(),
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                items: [
                    {
                        xtype: 'fieldset',
                        name: 'studentRolesFieldSet',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name: 'AdminRoleCheckbox',
                                label: 'Admin',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "admin", "student");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "admin");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'JudgeRoleCheckbox',
                                label: 'Judge',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, { email: email, firstName: firstname, lastName: lastname }, "judge", "student");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "judge");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'StudentRoleCheckbox',
                                label: 'Student',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "student", "student");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "student");
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        text: 'OK',
                        handler: function () {popup.hide();}
                    }
                ]
            });

        Ext.php.LoginMain.getOtherRoles(email, function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] === "admin") {
                    popup.down('checkboxfield[name=AdminRoleCheckbox]').check();
                }
                else if (roles[i] === "judge") {
                    popup.down('checkboxfield[name=JudgeRoleCheckbox]').check();
                }
                else if (roles[i] === "student") {
                    popup.down('checkboxfield[name=StudentRoleCheckbox]').check();
                }
            }
        });
        popup.show();
    },

    onMyRolesBtnTap: function() {
        var me = this,
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            email = user.get('email');
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                items: [
                    {
                        xtype: 'fieldset',
                        name: 'meRolesFieldSet',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name: 'AdminRoleCheckbox',
                                label: 'Admin',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "admin", "admin");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "admin");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'JudgeRoleCheckbox',
                                label: 'Judge',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "judge", "admin");
                                        }                                        
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "judge");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'StudentRoleCheckbox',
                                label: 'Student',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "student", "admin");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "student");
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        text: 'OK',
                        handler: function () { popup.hide(); }
                    }
                ]
            });

        Ext.php.LoginMain.getOtherRoles(email, function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] === "admin") {
                    popup.down('checkboxfield[name=AdminRoleCheckbox]').check();
                }
                else if (roles[i] === "judge") {
                    popup.down('checkboxfield[name=JudgeRoleCheckbox]').check();
                }
                else if (roles[i] === "student") {
                    popup.down('checkboxfield[name=StudentRoleCheckbox]').check();
                }
            }
        });

        popup.show();
    },

    onJudgesListTap: function (dataView, index, target, record) {
        var me = this,
            email = record.get('Email'),
            firstname = record.get('FirstName'),
            lastname = record.get('LastName'),
            popup = new Ext.Panel({
                floating: true,
                centered: true,
                modal: true,
                items: [
                    {
                        xtype: 'textfield',
                        value: 'Roles',
                        readOnly: true
                    },
                    {
                        xtype: 'fieldset',
                        name: 'studentRolesFieldSet',
                        items: [
                            {
                                xtype: 'checkboxfield',
                                name: 'AdminRoleCheckbox',
                                label: 'Admin',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "admin", "judge");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "admin");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'JudgeRoleCheckbox',
                                label: 'Judge',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "judge", "judge");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "judge");
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'StudentRoleCheckbox',
                                label: 'Student',
                                labelWrap: true,
                                listeners: {
                                    check: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmAddRole(popup, email, "student", "judge");
                                        }
                                    },
                                    uncheck: function (chk, e, eO) {
                                        if (Ext.isDefined(e)) {
                                            me.confirmRemoveRole(popup, email, "student");
                                        }
                                    }
                                }
                            },
                        ]
                    },
                    {
                        xtype: 'button',
                        docked: 'bottom',
                        text: 'OK',
                        handler: function () { popup.hide(); }
                    }
                ]
            });

        Ext.php.LoginMain.getOtherRoles(email, function (res) {
            var roles = res.Roles.split(";");

            for (i = 0; i < roles.length; i++) {
                if (roles[i] === "admin") {
                    popup.down('checkboxfield[name=AdminRoleCheckbox]').check();
                }
                else if (roles[i] === "judge") {
                    popup.down('checkboxfield[name=JudgeRoleCheckbox]').check();
                }
                else if (roles[i] === "student") {
                    popup.down('checkboxfield[name=StudentRoleCheckbox]').check();
                }
            }
        });
        popup.show();
    },

    onMyDefaultRoleBtnTap: function () {
        var me = this,
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            email = user.get('email');
        popup = new Ext.Panel({
            floating: true,
            centered: true,
            modal: true,
            items: [
                {
                    xtype: 'fieldset',
                    name: 'meDefaultRoleFieldSet',
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'DefaultRoleRadio',
                            label: 'Admin',
                            labelWrap: true,
                        },
                        {
                            xtype: 'radiofield',
                            name: 'DefaultRoleRadio',
                            label: 'Judge',
                            labelWrap: true,
                        },
                        {
                            xtype: 'radiofield',
                            name: 'DefaultRoleRadio',
                            label: 'Student',
                            labelWrap: true,                            
                        },
                    ]
                },
                {
                    xtype: 'button',
                    docked: 'bottom',
                    text: 'OK',
                    handler: function () {
                        var newDefaultRole = "";

                        if (popup.down('radiofield[label=Admin]').isChecked()) { newDefaultRole = "admin"; }
                        else if (popup.down('radiofield[label=Judge]').isChecked()) { newDefaultRole = "judge"; }
                        else if (popup.down('radiofield[label=Student]').isChecked()) { newDefaultRole = "student"; }

                        Ext.php.LoginMain.setDefaultRole(email, newDefaultRole, function (res) {
                            Ext.Msg.alert("" + res);
                        });
                        popup.hide();
                    }
                }
            ]
        });

        Ext.php.LoginMain.getDefaultRole(email, function (res) {
            var defaultRole = res.DefaultRole;

            if (defaultRole === "admin") {
                popup.down('radiofield[label=Admin]').check();
            }
            else if (defaultRole === "judge") {
                popup.down('radiofield[label=Judge]').check();
            }
            else if (defaultRole === "student") {
                popup.down('radiofield[label=Student]').check();
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
            else {
                if (role === "admin") { popup.down('checkboxfield[name=AdminRoleCheckbox]').check(); }
                else if (role === "judge") { popup.down('checkboxfield[name=JudgeRoleCheckbox]').check(); }
                else if (role === "student") { popup.down('checkboxfield[name=StudentRoleCheckbox]').check(); }
            }
        });
    },

    confirmAddRole: function (popup, user, role, from) {
        Ext.Msg.confirm('Add Role', 'Are you sure you want to add this role?', function (btn) {
            if (btn === 'yes') {
                if (role === "judge" && from === "student") {
                    Ext.php.Invites.send(user, function (result) {
                        var msg = result.success ? "Invitation successfully sent" : "Failed to send invitation",
                            store = Ext.getStore('Invitations');

                        if (result.success && store.isLoaded()) store.load();

                        Ext.Msg.alert("Invitation Email", msg);
                    });
                }
                else {
                    Ext.php.LoginMain.addRole(user, role, function (res) {
                        Ext.Msg.alert("" + res);
                    });
                }
                popup.hide();
            }
            else {
                if (role === "admin") { popup.down('checkboxfield[name=AdminRoleCheckbox]').uncheck(); }
                else if (role === "judge") { popup.down('checkboxfield[name=JudgeRoleCheckbox]').uncheck(); }
                else if (role === "student") { popup.down('checkboxfield[name=StudentRoleCheckbox]').uncheck(); }
            }
        });
    }
});
