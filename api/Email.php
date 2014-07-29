<?php

require_once 'Database.php';

class Email {
	public function getSemesters(){
		$db = new Database();
		$db->sql('select distinct Term as id from onlinejudges.History');
		$res = $db->getResult();
		if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
	}
	public function getStudentsContacts(){
		$db = new Database();
		$db->sql('select h.FirstName, h.LastName, h.Email, h.Term from History h where h.Grade is not null
					union 
					select u.FirstName, u.LastName, u.Email, \'Current\' as Term from Students s
					inner join Users u on u.StudentId = s.id');
		$res = $db->getResult();
		if(array_key_exists('Email',$res)) $res=array($res);
		return array('total'=>count($res), 'data'=>$res);
	}
	public function getJudgesContacts(){
		$db = new Database();
		$db->sql('select sq.FirstName, sq.LastName, sq.Email, group_concat(sq.Term) as Term, group_concat(sq.Response) as Response
						from (select h.FirstName, h.LastName, h.Email, h.Term,  ifnull(h.Response,-1) as Response from History h where h.Grade is null
										union 
										select u.FirstName, u.LastName, u.Email, \'Current\' as Term, 1 as Response from Judges j
										inner join Users u on u.JudgeId = j.id
										union
										select ji.FirstName, ji.LastName, ji.Email, \'Current\' as Term, ifnull(ji.Response,-1) as Response  from JudgeInvitations ji
										where ji.Response is null) as sq
					group by sq.FirstName, sq.LastName, sq.Email');
		$res = $db->getResult();
		if(array_key_exists('Email', $res)) $res=array($res);
		return array('total'=>count($res), 'data'=>$res);
	}
	public function getEmailTemplates(){
		$db = new Database();
		$db->sql('select * from onlinejudges.emailTemplates');
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
		$sent = mail($to, $subject, $body, "From: ".$from."\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n");
		return $sent;
	}
	public function getContact($email){
		$db = new Database();
		$db->sql('select FirstName, LastName, Email from Users where Email = \''.$email.'\'' );
		$res = $db->getResult();
		$total = 0;
		if(array_key_exists('LastName', $res)){ 
			$res = array($res);
			$total = count($res);

		}else{
			$res = $email;
		} 
		return array('total'=>$total, 'data'=>$res);
	}
}
