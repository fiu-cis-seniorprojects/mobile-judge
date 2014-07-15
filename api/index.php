<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL ^ E_NOTICE);

require_once 'ExtDirect.php';
require_once 'Judges.php';
require_once 'Invites.php';
require_once 'Questions.php';
//require_once 'History.php';
require_once 'Settings.php';
require_once 'Students.php';
require_once 'Livestats.php';
require_once 'Email.php';
require_once 'LoginMain.php';
require_once 'PendingGrades.php';

ExtDirect::$allowCors = true;
ExtDirect::provide( array('Settings','Judges','Students','Invites','Questions', 'Livestats','Email','LoginMain', 'PendingGrades'/*,'History'*/) );