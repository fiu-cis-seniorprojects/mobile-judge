<?php

require_once 'Database.php';

class Settings {

    public function load() {
        $db = new Database();
        $db->select('Settings');
        $res = $db->getResult();
        if (array_key_exists('AllowJudgesToLogin', $res)) $res['AllowJudgesToLogin'] = $res['AllowJudgesToLogin'] == '1';
        return $res;
    }

    public function getSummary() {
        $db = new Database();
        $db->sql('SELECT count(*) as students, COALESCE(SUM(case when Grade is null then 1 else 0 end),0) as toGrade,
                         (select COALESCE(sum(case when replied is null then 1 else 0 end),0) from JudgeInvitations) as pending,
                         (select COALESCE(sum(case when response = 1 then 1 else 0 end),0) from JudgeInvitations) as accepted,
                         (select COALESCE(sum(case when response = 0 then 1 else 0 end),0) from JudgeInvitations) as declined
                  FROM Students');
        $summary = $db->getResult();
        return $summary;
    }

    public function save($settings) {
        $db = new Database();

        if (!file_put_contents('../resources/'.basename($settings->MapImage), file_get_contents($settings->MapImage)))
            return false;

        $db->select('Settings','Term');
        $term = $db->getResult();

        $db->update('Settings', array(
            'Term' => $settings->Term,
            'StudentsPerJudge' => $settings->StudentsPerJudge,
            'Date' => $settings->Date,
            'Time' => $settings->Time,
            'Location' => $settings->Location,
            'Subject' => $settings->Subject,
            'EmailText' => str_replace('"','\\"',$settings->EmailText),
            'SrProjectURL' => $settings->SrProjectURL,
            'SrProjectToken' => $settings->SrProjectToken,
            'MapImage' => $settings->MapImage,
            'GradesPosted' => $settings->GradesPosted ? 1 : 0,
            'AllowJudgesToLogin' => $settings->AllowJudgesToLogin ? 1 : 0
        ), "Term = '".$term['Term']."'");

        return true;
    }

    public function changePassword($pwd) {
        if (empty($pwd->current)) return 'Current password is required.';
        if (empty($pwd->new)) return 'New password cannot be blank.';
        if (empty($pwd->confirm) || $pwd->new != $pwd->confirm) return "Passwords don't match";
        if (strlen($pwd->new)<5) return 'Password is too short';

        $db = new Database();
        $db->select('Users','Email',null,"StudentId is null and Email ='".$pwd->email."' and Password=password('".$pwd->current."');");
        $res = $db->getResult();

        if (!array_key_exists('Email',$res)) return 'Wrong password';

        if (!$db->sql("UPDATE Users SET Password=password('".$pwd->new."') WHERE StudentId is null and Email ='".$pwd->email."' and Password=password('".$pwd->current."');")){
            $res = $db->getResult();
            return $res;
        }

        return true;
    }

    public function reset() {
        $db = new Database();

        $db->delete('History','Term = (SELECT Term FROM Settings)');

        $db->sql('INSERT INTO History (Term,Email,FirstName,LastName,Grade,Response)
                SELECT x.Term, u.Email, u.FirstName, u.LastName, s.Grade, NULL AS Response
                FROM Students AS s
                LEFT OUTER JOIN Users AS u ON u.StudentId = s.id AND u.StudentId IS NOT NULL
                INNER JOIN Settings AS x
                UNION
                SELECT x.Term, i.Email, COALESCE(u.FirstName,i.FirstName) AS FirstName, COALESCE(u.LastName,i.LastName) AS LastName, NULL AS Grade, i.Response
                FROM JudgeInvitations AS i
                LEFT OUTER JOIN Users u ON u.Email = i.Email AND u.JudgeId IS NOT NULL
                INNER JOIN Settings AS x');

        $db->delete('JudgeStudentGrade','1=1');
        $db->delete('JudgeStudentConflicts','1=1');
        $db->delete('Users','NOT(StudentId IS NULL AND JudgeId IS NULL) AND Email != "admin"');
        $db->delete('Judges','1=1');
        $db->delete('JudgeInvitations','1=1');
        //$db->delete('Questions','1=1');
        $db->delete('Students','1=1');

        return true;
    }
}
