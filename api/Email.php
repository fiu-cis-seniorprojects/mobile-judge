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
	public function getEmailTemplates(){
		$db = new Database();
		$db->sql('select * from onlinejudges.emailtemplates');
		$res = $db->getResult();
		if(array_key_exists('TemplateID', $res)) $res = array($res);
		return array('total'=>count($res), 'data'=>$res);
	}

	public function addTemplate($templateTitle, $subject, $body){
		$db = new Database();
		$success = $db->insert('emailTemplates', 
			array('TemplateTitle'=>$templateTitle,
				'Subject'=>$subject,
				'Body'=>$body));
		$res = $db->getResult();
		if(!$success) return array('success'=>false,'msg'=>$res);
		$data = array('id'=>intval($res[0]), 
			'TemplateTitle'=>$templateTile,
			'Subject'=>$subject,
			'Body'=>$body);
		return array('success'=>$success, 'data'=>$data);
	}

	public function updateTemplate($template){
		$db = new Database();
		$success = $db->update('emailTemplates',
			array('TemplateTitle'=>$template->TemplateTitle,
				'Subject'=>$template->Subject,
				'Body'=>$template->Body), "TemplateID = ".$template->TemplateID);
		if(!$success) return array('success'=>false,'msg'=>$db->getResult());
		return array('success'=>true, 'data'=>$template);
	}
	public function sendEmail($to, $subject, $body, $from){
		$sent = mail($to, $subject, $body, "From: ".$from);
		return $sent;
	}
}