<?php

require_once 'Database.php';

class Questions {
    public function getAll() {
        $db = new Database();
        $db->select('Questions');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function add($question) {
        $db = new Database();
        $success = $db->insert('Questions', array('Text'=>$question));
        $res = $db->getResult();
        if (!$success) return array('success'=>false, 'msg'=>$res);
        $data = array('id'=>intval($res[0]), 'Text'=>$question);
        return array('success'=>true, 'data'=>$data);
    }

    public function update($question) {
        $db = new Database();
        $success = $db->update('Questions', array('Text'=>$question->Text), "id = ".$question->id);
        if (!$success) return array('success'=>false, 'msg'=>$db->getResult());
        return array('success'=>$success, 'data'=>$question);
    }

    public function remove($id) {
        $db = new Database();
        $db->delete('Questions', 'id='.$id);
        $res = $db->getResult();
        return array('success' => $res[0] === 1);
    }
}