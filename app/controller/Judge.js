Ext.define('OnlineJudges.controller.Judge', {
    extend: 'Ext.app.Controller',

    config: {
        views:[
            'judge.Home',
            'judge.Confirmation',
            'FiuMap',
            'judge.JudgeGraph'
        ],

        stores: [
            'Questions',
            'judge.Students',
            'LoginInstance'
        ],

        refs: {
            judgeHome: 'judgeHome',
            backBtn: 'judgeHome #back',
            logoutBtn: 'judgeHome #logoutBtn',
            submitBtn: 'judgeHome #submitBtn',
            showMapBtn: 'judgeHome #showMapBtn',
            wizard: 'judgeConfirmation',
            rolesBtn: 'judgeHome #rolesBtnJudge',
            judgeGraphBtn: 'judgeHome #judgeGraphBtn'
        },

        control: {
            "judgeHome": {
                show: 'onJudgeLoadRoles'
            },
            "judgeHome list": {
                itemtap: 'onJudgeStudentsListTap'
            },
            "judgeHome button[ui='back']": {
                tap: 'onBackButtonTap'
            },
            "judgeHome #submitBtn":{
                tap: 'onSubmitGradeButtonTap'
            },
            "judgeConfirmation button[ui=confirm]":{
                tap: 'onJudgeConfirmationBtnTap'
            },
            "studentHome #showMapBtn": {
                tap: 'onShowMapBtnTap'
            },
            "judgeHome #showMapBtn": {
                tap: 'onShowMapBtnTap'
            },
            "adminStudentView #showMapBtn": {
                tap: 'onShowMapBtnTap'
            },
            "judgeHome #judgeGraphBtn":
            {
                tap: 'onShowJudgeGraphBtnTap'
            }
        }
    },

    onShowMapBtnTap: function() {
        Ext.php.Settings.load(function(settings) {
            if (!settings || Ext.isEmpty(settings.MapImage)) {
                Ext.Msg.alert('Show Map','Map not available yet', Ext.emptyFn);
                return;
            }
            var url = "resources/" + settings.MapImage.split('/').pop(),
                map = OnlineJudges.map;

            if (!map || OnlineJudges.mapUrl !== url) {
                OnlineJudges.mapUrl = url;
                if (map) map.destroy();
                map = Ext.Viewport.add(Ext.create('widget.fiumap', OnlineJudges.mapUrl));
            }

            (OnlineJudges.map = map).show({
                type: 'slide',
                direction: 'up'
            });
        });
    },

    onJudgeConfirmationBtnTap: function() {
        var wzd = this.getWizard(),
            judge = wzd.getValues(),
            error = false;

        if (Ext.isEmpty(judge.Password)) error = 'Password cannot be blank.';
        else if (judge.Password.length < 5) error = 'Password is too short';
        else if (Ext.isEmpty(judge.Confirm)) error = 'Please retype your password';
        else if (judge.Password !== judge.Confirm) error = "Passwords don't match";
        else if (Ext.isEmpty(judge.FirstName)) error = "Please enter your First Name";
        else if (Ext.isEmpty(judge.LastName)) error = "Please enter your Last Name";

        if (error !== false) return Ext.Msg.alert('Registration', error, Ext.emptyFn);

        wzd.setMasked({
            xtype: 'loadmask',
            message: 'Submitting...'
        });

        Ext.php.Judges.register(judge, function(result){
            wzd.setMasked(false);

            if (result === true) {
                Ext.Viewport.removeAll().add(Ext.create('widget.login'));
                result = 'Your account was created successfully';
            }

            Ext.Msg.alert('Registration', ""+result, Ext.emptyFn);
        });
    },

    onSubmitGradeButtonTap: function(){
        var me = this,
            view = me.getJudgeHome(),
            judge = OnlineJudges.user.id,
            form = view.down('formpanel'),
            student = view.student,
            questions = {},
            comments = '';

        view.setMasked({
            xtype: 'loadmask',
            message: 'Submitting...'
        });

        Ext.Object.each(form.getValues(), function(key,value){
            if (key === 'Comments') comments = value;
            else questions[key] = value;
        });

        Ext.php.Judges.gradeStudent(judge, student.get('id'), questions, comments, function(grade) {
            view.setMasked(false);

            if (!grade) Ext.Msg.alert('Error', 'Could not submit grade, the professor already accepted it', Ext.emptyFn);
            else {
                student.set('QuestionValues', Ext.encode(questions));
                student.set('JudgeGrade', grade);
                student.set('Comments', comments);
                student.set('Accepted', null);

                view.pop();
                me.onBackButtonTap();
            }
        });
    },

    onBackButtonTap: function() {
        this.getLogoutBtn().show();
        this.getShowMapBtn().show();
        this.getSubmitBtn().hide();
        this.getJudgeGraphBtn().show();
    },

    onJudgeStudentsListShow: function(view){
        var list = view.down('list'),
            store = list.getStore(),
            proxy = store.getProxy(),
            judge = OnlineJudges.user.id;

        proxy.setExtraParams({'id': judge});
        store.load();

        store = Ext.getStore('Questions');
        if(!store.isLoaded()) store.load();
    },

    onJudgeStudentsListTap: function(dataView, index, target, record){
        var btn = this.getSubmitBtn();

        if (!btn.isHidden()) return;

        var view = this.getJudgeHome(),
            store = Ext.getStore('Questions'),
            questions = Ext.decode(record.get('QuestionValues')) || {},
            values = {
                Comments: record.get('Comments')
            };

        this.getLogoutBtn().hide();
        this.getShowMapBtn().hide();
        btn.show();

        view.student = record;

        var form = {
            title: record.get('FirstName') + ' ' + record.get('LastName'),
            defaultType: 'fieldset',
            items:[]
        };

        store.each(function(q) {
            var key = 'Q' + q.get('id');
            values[key] = questions[key] || '';
            form.items.push({
                title: q.get('Text'),
                items: [
                    {
                       xtype: 'spinnerfield',
                       label: 'Grade',
                       name: key,
                       maxValue: 10,
                       stepValue: 1,
                       minValue: 1,
                       defaultValue: 10
                    }
                ]
            });
        });

        form.items.push({
            title: 'Comments',
            items:[
                {
                    xtype: 'textareafield',
                    name: 'Comments'
                }
            ]
        });

        view.push(Ext.create('widget.formpanel', form).setValues(values));
    },

    //======================================================================
    //Livestats stuff
    //======================================================================
    refreshFunc: function() {
        var store = Ext.getStore('Livestats');
        var count = 0;

        clearInterval(taskLiveStatsTimer);
            taskLiveStatsTimer = setInterval(function() {
                var count = 0;
		var store = Ext.StoreMgr.lookup('Livestats');
                    store.load();
            }, 10000);
    },

    onShowJudgeGraphBtnTap: function() {
        var mainView = this.getJudgeHome(),
        navBar = mainView.getNavigationBar();
        this.getLogoutBtn().hide();
        this.getShowMapBtn().hide();
        this.getJudgeGraphBtn().hide();


        var store = Ext.getStore('Livestats');
        var method = Ext.direct.Manager.parseMethod('Ext.php.Livestats.getAllControlled');
        store.getProxy().setDirectFn(method);
        store.load();
        store.setSorters('RawGrade', 'ApprovedGrade');
        
        this.getApplication().getController('Judge').refreshFunc();

        mainView.push({
            xtype: 'judgeGraph'
        });
    },
    //======================================================================
    //Roles stuff
    //======================================================================
    onJudgeLoadRoles: function () {
        var me = this,
            mainView = this.getJudgeHome(),
            navBar = mainView.getNavigationBar(),
            store = Ext.getStore('LoginInstance'),
            user = store.getById(0),
            rolesBtn = this.getRolesBtn();

        me.onJudgeStudentsListShow(mainView);

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
                                    me.loadMainView('adminMain', { title: 'Home' });
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
                    listeners: {
                        tap: function () {
                            popup.hide();
                        }
                    }
                });
                popup.show();
            }
        });
    },

    //======================================================================
    //Role Helper methods
    //======================================================================
    loadMainView: function (view, options) {
        Ext.Viewport.removeAll().add(Ext.create('widget.' + view, Ext.apply({
            title: 'CIS 4911 Online Judges'
        }, options || {})));
    }
});
