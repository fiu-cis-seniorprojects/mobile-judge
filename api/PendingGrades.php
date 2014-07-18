<?php

require_once 'Database.php';
require_once 'Invites.php';

class PendingGrades {

    public function getAll() {
        $db = new Database();
        $db->sql('SELECT j.JudgeId, SUBSTRING(s.FirstName,1,1) as JFName, s.LastName as JLName, j.StudentId, SUBSTRING(e.FirstName,1,1) as SFName, e.LastName as SLName, j.Grade, j.Accepted 
                    FROM JudgeStudentGrade as j
                    inner join Users as s on s.JudgeId = j.JudgeId
                    inner join Users as e on e.StudentId = j.StudentId
                    WHERE Grade is Not Null');
        $res = $db->getResult();
        //if (array_key_exists('JudgeId', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function setAccept($judgeId, $studentId, $acceptance) {
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
}