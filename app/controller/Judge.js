Ext.define('OnlineJudges.controller.Judge', {
    extend: 'Ext.app.Controller',

    config: {
        views:[
            'judge.Home',
            'judge.Confirmation',
            'FiuMap'
        ],

        stores: [
            'Questions',
            'judge.Students'
        ],

        refs: {
            judgeHome: 'judgeHome',
            backBtn: 'judgeHome #back',
            logoutBtn: 'judgeHome #logoutBtn',
            submitBtn: 'judgeHome #submitBtn',
            showMapBtn: 'judgeHome #showMapBtn',
            wizard: 'judgeConfirmation'
        },

        control: {
            "judgeHome": {
                show: 'onJudgeStudentsListShow'
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

            Ext.Msg.alert('Registration', result, Ext.emptyFn);
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
    }
});