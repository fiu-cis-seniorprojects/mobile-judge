<?php

require_once 'Database.php';
require_once 'Invites.php';

class PendingGrades {

    public function getAll() {
        $db = new Database();
        $db->sql('SELECT j.JudgeId, SUBSTRING(s.FirstName,1,1) as JFName, s.LastName as JLName, j.StudentId, SUBSTRING(e.FirstName,1,1) as SFName, e.LastName as SLName, j.Grade, j.Accepted 
                    FROM JudgeStudentGrade as j
                    inner join Users as s on s.JudgeId = j.JudgeId
                    inner join users as e on e.StudentId = j.StudentId
                    WHERE Grade is Not Null');
        $res = $db->getResult();
        //if (array_key_exists('JudgeId', $res)) $res=array($res);
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

 
}