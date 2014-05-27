<?php

require_once 'Database.php';

class History {
    public function getAll() {
        $db = new Database();
        $db->select('History');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }
}