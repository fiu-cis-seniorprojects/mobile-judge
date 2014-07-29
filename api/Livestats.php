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
                select st.id, st.Grade as ApprovedGrade
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

    public function getAllControlled() {
        $db = new Database();
        $db->sql('select s.id, avg(j.grade) as RawGrade, k.ApprovedGrade, u.FirstName as Name, u.LastName, s.project, s.location
            FROM JudgeStudentGrade as j 
            join Users as u on j.StudentId = u.StudentId
            join Students as s on s.id = j.StudentId
            left join
            (
                select st.id, st.Grade as ApprovedGrade
                FROM JudgeStudentGrade as ju 
                inner join Users as us on ju.StudentId = us.StudentId
                inner join Students as st on st.id = ju.StudentId
                where ju.Accepted = 1 and ju.grade is not null
                group by ju.StudentId       
            ) as k on k.id = s.id
            where j.grade is not null
            group by j.StudentId');
        $res = $db->getResult();
        $cou = count($res);
        console.log($cou);
        if (array_key_exists('id', $res)) $res=array($res);
        //$res=array($res);
        //if(count($res) <= 3) return array('total'=>null, 'data'=>null);
        //return array('total'=>count($res), 'data'=>$res);
        
        if(count($res) < 4) {

            return array('total'=>count($res), 'data'=>null);
        }
        else
        {
            //if (array_key_exists('id', $res)) $res=array($res);
            return array('total'=>count($res), 'data'=>$res);
        }
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
    public function getJudges() {
        $db = new Database();
        $db->sql("select us.FirstName as Name, us.LastName, s.Grade as ApprovedGrade, s.Grade as RawGrade, uss.FirstName as StuName, uss.LastName as StuLName, s.Accepted
            FROM Users as u
            inner join JudgeStudentGrade as s on u.StudentId = s.StudentId
            inner join Users as us on us.JudgeId = s.JudgeId
            inner join Users as uss on uss.StudentId = s.StudentId
            union

            SELECT s.Project as Name, s.Project as LastName, s.Grade as ApprovedGrade, k.RawGrade,u.FirstName as StuName, u.LastName as StuLName, k.Accepted
            from Students as s
            inner join Users as u on u.StudentId = s.id

            left join
                        (
                            select st.id, avg(ju.grade) as RawGrade, ju.Accepted
                            FROM JudgeStudentGrade as ju 
                            inner join Users as us on ju.StudentId = us.StudentId
                            inner join Students as st on st.id = ju.StudentId
                            group by ju.StudentId       
                        ) as k on k.id = s.id");
        $res = $db->getResult();
        //if (array_key_exists('altId', $res) && array_key_exists('id', $res)) $res=array($res);
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