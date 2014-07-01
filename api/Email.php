<?php

require_once 'Database.php';

class Email {
	public function getSemesters(){
		$db = new Database();
		$db->sql('select distinct Term as id from onlinejudges.history');
		$res = $db->getResult();
		if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
	}
	public function getStudentsContacts(){
		$db = new Database();
		$db->sql('select h.FirstName, h.LastName, h.Email, h.Term from history h where h.Grade is not null
					union 
					select u.FirstName, u.LastName, u.Email, \'Current\' as Term from students s
					inner join users u on u.StudentId = s.id');
		$res = $db->getResult();
		if(array_key_exists('Email',$res)) $res=array($res);
		return array('total'=>count($res), 'data'=>$res);
	}
	public function getJudgesContacts(){
		$db = new Database();
		$db->sql('select h.FirstName, h.LastName, h.Email, h.Term, h.Response from history h where h.Response is not null
					union 
					select u.FirstName, u.LastName, u.Email, \'Current\' as Term, 1 as Response from judges j
					inner join users u on u.JudgeId = j.id');
		$res = $db->getResult();
		if(array_key_exists('Email', $res)) $res=array($res);
		return array('total'=>count($res), 'data'=>$res);
	}
}