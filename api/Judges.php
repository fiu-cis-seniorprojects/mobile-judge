<?php

require_once 'Database.php';
require_once 'Invites.php';

class Judges {

    public function getAll() {
        $db = new Database();
        $db->select('Users','Judges.id,Users.Email,Users.FirstName,Users.LastName,Judges.Title,Judges.Affiliation',
                    'Judges ON Users.JudgeId = id',
                    null,
                    'Users.FirstName, Users.LastName');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function getByStudent($studentId) {
        $db = new Database();

        $db->select('Users','Judges.id,Users.Email,Users.FirstName,Users.LastName,Judges.Title,Judges.Affiliation,JudgeStudentGrade.QuestionValues,JudgeStudentGrade.Grade,JudgeStudentGrade.Accepted,JudgeStudentGrade.Comments,JudgeStudentGrade.StudentId',
                    'Judges ON Users.JudgeId = Judges.id JOIN JudgeStudentGrade ON Users.JudgeId = JudgeStudentGrade.JudgeId',
                    'JudgeStudentGrade.StudentId = '.$studentId);

        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function gradeStudent($judgeId, $studentId, $questions, $comments) {
        $db = new Database();

        $db->select('JudgeStudentGrade','Accepted',null,'JudgeId = '.$judgeId.' and StudentId = '.$studentId);
        $res = $db->getResult();

        if (count($res) > 0 && $res['Accepted'] == 1) return false;

        $db->sql('UPDATE Students SET Grade = NULL WHERE id = '.$studentId.';');
        $db->delete('JudgeStudentGrade','JudgeId = '.$judgeId.' and StudentId = '.$studentId);

        $grade = 0;
        foreach($questions as $value)
            $grade += $value;

        $db->insert('JudgeStudentGrade', array(
            'JudgeId' => $judgeId,
            'StudentId' => $studentId,
            'QuestionValues' => json_encode($questions),
            'Grade' => $grade,
            'Comments' => $comments
        ));

        return $grade;
    }

    public function setGrade($judgeId, $studentId, $acceptance) {
        $db = new Database();

        $success = $db->update('JudgeStudentGrade', array('Accepted' => $acceptance ? 1 : 0), 'JudgeId = '.$judgeId.' and StudentId = '.$studentId);
        $msg = $db->getResult();
        if (!$success) return array('success'=> false, 'msg' => $msg);

        $db->select('JudgeStudentGrade', 'Grade, Accepted', null, 'StudentId = '.$studentId);
        $res = $db->getResult();
        if (array_key_exists('Grade', $res)) $res=array($res);

        $grade = 0; $reviewed = 0; $accepted = 0; $total = 0;
        foreach($res as $judge) {
            $total++;
            if (is_null($judge['Accepted'])) continue;
            if (intval($judge['Accepted']) === 1) {
                $accepted++;
                $grade += intval($judge['Grade']);
            }
            $reviewed++;
        }

        if ($total == $reviewed && $accepted > 0) {
            $grade /= $accepted;

            $db->update('Students',array('Grade'=>$grade),'id = '.$studentId);
            return array('success'=> true, 'grade' => $grade);
        }
        else {
            $db->sql('UPDATE Students SET Grade = NULL WHERE id = '.$studentId.';');
            return array('success'=> true, 'grade' => null);
        }
    }

    public function login($username, $password) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,JudgeId', null, "StudentId is null and Email ='".$username."' and Password=password('".$password."');");
        $user = $db->getResult();

        if (count($user) == 0 || !array_key_exists('JudgeId', $user)) return null;

        if ($user['JudgeId'] != null) {
            $user['Role'] = 'Judge';
            $user['id'] = intval($user['JudgeId']);
            $db->select('Judges', 'Title,Affiliation', null, 'id = '.$user['JudgeId']);
            $judge = $db->getResult();
            $user = array_merge($user, $judge);

            $db->select('Settings','AllowJudgesToLogin');
            $res = $db->getResult();
            $user['AllowLogin'] = $res['AllowJudgesToLogin'] == '1';
        }
        else $user['Role'] = 'Admin';

        unset($user['JudgeId']);

        return $user;
    }

    public function register($data) {
        $db = new Database();

        $db->update('JudgeInvitations', array(
                'Replied' => date('Y-m-d H:i:s'),
                'Response' => 1
            ), "id ='".$data->id."'");

        $res = $db->getResult();
        if ($res[0] !== 1) return "Invalid invitation link.";

        $db->insert('Judges', array(
            'Title' => $data->Title,
            'Affiliation' => $data->Affiliation
        ));

        $res = $db->getResult();
        $id = $res[0];

        foreach($data->Conflicts as $studentId)
            $db->insert('JudgeStudentConflicts', array(
                'JudgeId' => $id,
                'StudentId' => $studentId
            ));

        $db->select('Settings','StudentsPerJudge,Subject,Date,Time,Location');
        $res = $db->getResult();
        $maxStudents = $res['StudentsPerJudge'];

        $db->sql('insert into JudgeStudentGrade (JudgeId, StudentId)
                select '.$id.' as JudgeId, s.id as StudentId
                from Students as s
                left outer join JudgeStudentGrade as g on g.StudentId = s.id
                where s.id not in (select StudentId from JudgeStudentConflicts where JudgeId = '.$id.')
                group by s.id
                order by count(g.JudgeId), rand()
                limit '.$maxStudents);
                
        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$data->Email."'");
        $studentUser = $db->getResult();
        
        if (count($studentUser) > 0) {
            $newRoles = "";
            $defaultRole = "judge";
            
            if ($studentUser['Roles'] == "admin;student") {$newRoles = "admin;judge;student";}
            else if ($studentUser['Roles'] == "student") {$newRoles = "judge;student";}
            else if ($studentUser['Roles'] == "") {$newRoles = "judge";}
            
            $success = $db->update('Users', array('Roles'=>$newRoles), "Email ='".$data->Email."';");
            if (!$success) return "Roles update failed";
            $success = $db->update('Users', array('DefaultRole'=>$defaultRole), "Email ='".$data->Email."';");
            if (!$success) return "Default update failed";
        }
        else {
            $db->sql("insert into Users (Email, FirstName, LastName, Password, JudgeId, Roles, DefaultRole) VALUES ('".$data->Email."', '".$data->FirstName."', '".$data->LastName."', password('".$data->Password."'), ".$id.", judge, judge);");
        }

        $date = date_format(DateTime::createFromFormat('Y-m-d', $res['Date']), "l, F j");
        $sent = mail($data->Email,'Confirmation: '.$res['Subject'], '<html>
<body>
    <div style="width: 600px; border: 2px solid #E9EBF6; margin: auto; font-size: 16px; color: #555555;">
        <h1 style="margin: 0; padding: 8px; background-color: #E9EBF6; text-align: center;">
            Dear '.$data->FirstName.' '.$data->LastName.',
        </h1>
        <div style="overflow: hidden; padding: 8px; padding-top: 0; background-color: #F5F6FB;">
            <p>We are pleased to confirm your participation in the FIU Computer Science Senior Project Event!</p>
			<p>The day of the event will be '.$date.' '.$res['Time'].' at '.$res['Location'].'.<br /> You will be able to login on this <a href="'.Invites::getRSVPUrl().'">Web Application</a> with the following credentials:</p>
			<p>Username: '.$data->Email.' <br />Password: '.$data->Password.' <p>
			<p>Keep this information safe for the day of the event.</p>
            <br />
            <p>Sincerely,</p>
            <p>Masoud Sadjadi</p>
        </div>
    </div>
</body>
</html>', "From: Masoud Sadjadi <sadjadi@cs.fiu.edu>\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n");

        return $sent;
    }
}