<?php

require_once 'Database.php';
require_once 'google/Google_Client.php';
require_once 'google/contrib/Google_Oauth2Service.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL ^ E_NOTICE);

class Students {

    public function load(){
        $db = new Database();

        $db->delete('Users','StudentId is not null');
        $db->delete('Students','1=1');
        $db->select('Settings','SrProjectUrl,SrProjectToken');
        $settings = $db->getResult();

        $students = json_decode(file_get_contents($settings['SrProjectUrl'].'/getAll/'.$settings['SrProjectToken']));

        foreach($students as $student){
            $db->insert('Students', array(
                'id' => $student->id,
                'Project' => $student->projectTitle,
                'Location' => 'TBA'
            ));

            $db->insert('Users', array(
                'Email' => $student->email.'@fiu.edu',
                'FirstName' => ucfirst($student->firstName),
                'LastName' => ucfirst($student->lastName),
                'StudentId' => $student->id,
                'Roles' => 'student',
                'DefaultRole' => 'student'
            ));
        }

        return true;
    }

    public function getAll(){
        $db = new Database();
        $db->sql('select s.id,u.Email,u.FirstName,u.LastName,s.Project,s.Location,s.Grade
                from Users as u
                inner join Students as s ON u.StudentId = s.id
                order by u.FirstName, u.LastName');

        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function getByJudge($judgeId) {
        $db = new Database();

        $db->select('Users','Students.id,Users.Email,Users.FirstName,Users.LastName,Students.Project,Students.Location,Students.Grade, JudgeStudentGrade.Grade AS JudgeGrade, JudgeStudentGrade.QuestionValues, JudgeStudentGrade.Comments, JudgeStudentGrade.Accepted,JudgeStudentGrade.JudgeId',
            'Students ON Users.StudentId = Students.id JOIN JudgeStudentGrade ON Users.StudentId = JudgeStudentGrade.StudentId',
            'JudgeStudentGrade.JudgeId = '.$judgeId);

        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function getByEmail($email) {
        $db = new Database();
        $db->sql("select s.id,u.Email,u.FirstName,u.LastName,s.Project,s.Location, case when(select GradesPosted from Settings) = 1 then s.Grade else null end as Grade
from Users as u inner join Students as s on u.StudentId = s.id
where u.Email = '".$email."'");

        $res = $db->getResult();
        if (count($res) == 0) return null;
        return $res;
    }

    public function setLocation($id, $location) {
        $db = new Database();
        return $db->update('Students',array(
            'Location' => ($location == '' || $location == null ? 'TBA' : $location)
        ), 'id = '.$id);
    }

    public function logout($token) {
        $client = new Google_Client();
        $token = base64_decode($token);
        $client->setAccessToken($token);
        return $client->revokeToken();
    }

    public function login($token) {
        $client = new Google_Client();
        $oauth2 = new Google_Oauth2Service($client);

        if (!empty($token)) {
            $token = base64_decode($token);
            $client->setAccessToken($token);

            if (!$client->isAccessTokenExpired()) {
                $user = $oauth2->userinfo->get();

                $email = filter_var($user['email'], FILTER_SANITIZE_EMAIL);

                $student = $this->getByEmail($email);

                if ($student != null) return $student;
            }

            $this->logout($token);
        }

        $authUrl = $client->createAuthUrl();
        return $authUrl;
    }
}