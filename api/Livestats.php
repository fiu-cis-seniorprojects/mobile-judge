<?php

require_once 'Database.php';

class Livestats {

    //Get all: average grades, student id, First Name and last name
    public function getAll() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as Grade, u.FirstName, u.LastName
            FROM JudgeStudentGrade as j 
            inner join Users as u on j.StudentId = u.StudentId
            inner join Students as s on s.id = j.StudentId
            group by j.StudentId');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    //get all: ACCEPTED average grades, student id, First Name and last Name
    public function getAllApproved() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as Grade, u.FirstName, u.LastName
            FROM JudgeStudentGrade as j 
            inner join Users as u on j.StudentId = u.StudentId
            inner join Students as s on s.id = j.StudentId
            where j.Accepted = 1
            group by j.StudentId');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    //Get $StudentId's information
    public function getStudent($StudentId) {
        $db = new Database();
        $db->sql("select s.id, j.Grade, s.FirstName, s.LastName
            FROM JudgeStudentGrade as j 
            inner join Judges as u on j.JudgeId = u.id
            inner join Users as s on s.JudgeId = u.JudgeId
            where j.StudentId = '".$StudentId."'");
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

        public function getApprovedStudent($StudentId) {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as Grade, u.FirstName, u.LastName
            FROM JudgeStudentGrade as j 
            inner join Users as u on j.StudentId = u.StudentId
            inner join Students as s on s.id = j.StudentId
            where j.Accepted = 1 AND j.StudentId = '.$StudentId.'
            group by j.StudentId');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }
}