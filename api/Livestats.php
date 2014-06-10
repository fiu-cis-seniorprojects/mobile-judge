<?php

require_once 'Database.php';

class Livestats {
    public function getAll() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as Grade, u.FirstName, u.LastName
            FROM JudgeStudentGrade as j 
            inner join Users as u on j.StudentId = u.StudentId
            inner join Students as s on s.id = j.StudentId
            group by j.StudentId');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        //$res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }
}