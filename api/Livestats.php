<?php

require_once 'Database.php';

class Livestats {

    //Get all: average grades, student id, First Name and last name
    public function getAll() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as RawGrade, k.ApprovedGrade, u.FirstName as Name, u.LastName, s.project, s.location
            FROM JudgeStudentGrade as j 
            join Users as u on j.StudentId = u.StudentId
            join Students as s on s.id = j.StudentId
            left join
            (
                select st.id, avg(ju.grade) as ApprovedGrade
                FROM JudgeStudentGrade as ju 
                inner join Users as us on ju.StudentId = us.StudentId
                inner join Students as st on st.id = ju.StudentId
                where ju.Accepted = 1
                group by ju.StudentId       
            ) as k on k.id = s.id
            group by j.StudentId');

        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function getAllProjects() {
        $db = new Database();
        $db->sql('select s.project as Name, avg(j.grade) as RawGrade, k.ApprovedGrade
                FROM JudgeStudentGrade as j
                inner join Students as s on s.id = j.StudentId
            left join
            (
                select st.project, avg(ju.grade) as ApprovedGrade
                FROM JudgeStudentGrade as ju 
                inner join Students as st on st.id = ju.StudentId
                where ju.Accepted = 1
                group by st.project       
            ) as k on k.project = s.project
            group by s.project');

        $res = $db->getResult();
        if (array_key_exists('Name', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    //get all: ACCEPTED average grades, student id, First Name and last Name
    public function getAllApproved() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as Grade, u.FirstName as Name, u.LastName
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
    public function getJudges($StudentId) {
        $db = new Database();
        $db->sql("select j.JudgeId AS id, u.FirstName AS Name,u.LastName, j.Grade AS RawGrade, j.Accepted
      FROM      JudgeStudentGrade as j
      inner join Users  as u ON u.JudgeId = j.JudgeId
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