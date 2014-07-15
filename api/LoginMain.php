<?php

require_once 'Database.php';

class LoginMain {

    public function login($username, $password) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."' and Password=password('".$password."');");
        $user = $db->getResult();

        if (count($user) == 0) return null;

        if ($user['JudgeId'] != null && $user['DefaultRole'] == 'judge') {
            $user['Role'] = 'Judge';
            $user['id'] = intval($user['JudgeId']);
            $db->select('Judges', 'Title,Affiliation', null, 'id = '.$user['JudgeId']);
            $judge = $db->getResult();
            $user = array_merge($user, $judge);

            $db->select('Settings','AllowJudgesToLogin');
            $res = $db->getResult();
            $user['AllowLogin'] = $res['AllowJudgesToLogin'] == '1';
        }
        else if ($user['JudgeId'] != null && $user['DefaultRole'] == 'admin') {
            $user['Role'] = 'Admin';
            $user['id'] = intval($user['JudgeId']);
            $db->select('Judges', 'Title,Affiliation', null, 'id = '.$user['JudgeId']);
            $judge = $db->getResult();
            $user = array_merge($user, $judge);
            
            $user['AllowLogin'] = true;
        }

        unset($user['JudgeId']);

        return $user;
    }

    public function getRoles($username, $password) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."' and Password=password('".$password."');");
        $res = $db->getResult();

        if (count($res) == 0) return null;

        return $res;
    }
    
    public function getOtherRoles($username) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."';");
        $res = $db->getResult();
        
        if (count($res) == 0) return null;

        return $res;
    }
    
    public function getDefaultRole($username) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."';");
        $res = $db->getResult();
        
        if (count($res) == 0) return null;

        return $res;
    }
    
    public function setDefaultRole($username, $newDefaultRole) {
        $db = new Database();

        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."';");
        $res = $db->getResult();
        
        if (count($res) == 0) return null;

        $success = $db->update('Users', array('DefaultRole'=>$newDefaultRole), "Email ='".$username."';");
        if (!$success) return "Set Default Failed!";
    
        return "Set Default Successful";
    }
    
    public function removeRole($username, $role) {
        $db = new Database();
        
        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."';");
        $res = $db->getResult();
        
        if (count($res) == 0) return null;
        
        $newRoles = "";
        if ($role == "admin") {
            if ($res['Roles'] == "admin;judge;student") {$newRoles = "judge;student";}
            else if ($res['Roles'] == "admin;judge") {$newRoles = "judge";}
            else if ($res['Roles'] == "admin;student") {$newRoles = "student";}
            else if ($res['Roles'] == "admin") {$newRoles = "";}
        }
        else if ($role == "judge") {
            if ($res['Roles'] == "admin;judge;student") {$newRoles = "admin;student";}
            else if ($res['Roles'] == "admin;judge") {$newRoles = "admin";}
            else if ($res['Roles'] == "judge;student") {$newRoles = "student";}
            else if ($res['Roles'] == "judge") {$newRoles = "";}
        }
        else if ($role == "student") {
            if ($res['Roles'] == "admin;judge;student") {$newRoles = "admin;judge";}
            else if ($res['Roles'] == "admin;student") {$newRoles = "admin";}
            else if ($res['Roles'] == "judge;student") {$newRoles = "judge";}
            else if ($res['Roles'] == "student") {$newRoles = "";}
        }
        
        $newDefault = $res['DefaultRole'];
        
        if($res['DefaultRole'] == $role) {  //role to be removed was default so change default
            if (strpos($newRoles, "m") != FALSE) $newDefault = "admin";
            else if (strpos($newRoles, "g") != FALSE) $newDefault = "judge";
            else if (strpos($newRoles, "t") != FALSE) $newDefault = "student";
            else $newDefault = "";
        }
        
        $success = $db->update('Users', array('Roles'=>$newRoles), "Email ='".$username."';");
        if (!$success) return "Remove failed";
        $success = $db->update('Users', array('DefaultRole'=>$newDefault), "Email ='".$username."';");
        if (!$success) return "Remove failed";
        
        return "Role removed";
    }
    
    public function addRole($username, $role) {
        $db = new Database();
        
        $db->select('Users', 'Email,FirstName,LastName,StudentId,JudgeId,Roles,DefaultRole', null, "Email ='".$username."';");
        $res = $db->getResult();
        
        if (count($res) == 0) return null;
        
        $newRoles = "";
        $defaultRole = "";
        
        if ($role == "admin") {
            if ($res['Roles'] == "judge;student") {$newRoles = "admin;judge;student";}
            else if ($res['Roles'] == "judge") {$newRoles = "admin;judge";}
            else if ($res['Roles'] == "student") {$newRoles = "admin;student";}
            else if ($res['Roles'] == "") {$newRoles = "admin"; $defaultRole = "admin";}
        }
        else if ($role == "judge") {
            if ($res['Roles'] == "admin;student") {$newRoles = "admin;judge;student";}
            else if ($res['Roles'] == "admin") {$newRoles = "admin;judge";}
            else if ($res['Roles'] == "student") {$newRoles = "judge;student";}
            else if ($res['Roles'] == "") {$newRoles = "judge"; $defaultRole = "judge";}
        }
        else if ($role == "student") {
            if ($res['Roles'] == "admin;judge") {$newRoles = "admin;judge;student";}
            else if ($res['Roles'] == "admin") {$newRoles = "admin;student";}
            else if ($res['Roles'] == "judge") {$newRoles = "judge;student";}
            else if ($res['Roles'] == "") {$newRoles = "student"; $defaultRole = "student";}
        }
        
        $success = $db->update('Users', array('Roles'=>$newRoles), "Email ='".$username."';");
        if (!$success) return "Add failed";
        if ($defaultRole != "") {
            $success = $db->update('Users', array('DefaultRole'=>$newRoles), "Email ='".$username."';");
            if (!$success) return "Add failed";
        }
        
        return "Added role";
    }
}