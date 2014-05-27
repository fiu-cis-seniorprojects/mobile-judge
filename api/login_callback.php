<?php

require_once 'google/Google_Client.php';
require_once 'google/contrib/Google_Oauth2Service.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL ^ E_NOTICE);

$client = new Google_Client();

if (isset($_GET['code'])) {
    $client->authenticate($_GET['code']);
    $token = $client->getAccessToken();

    $token = base64_encode($token);

    $page = $_SERVER['PHP_SELF'];
    $page = substr($page, 0, strrpos($page,"/api/"));
    $url = 'http'. ($_SERVER["HTTPS"] == "on" ? 's' : '') .'://'.$_SERVER['HTTP_HOST'].$page.'/#/token='.$token;

    //echo($url);
    header('Location: ' . $url);
}
else if (isset($_GET['error'])) {
    $page = $_SERVER['PHP_SELF'];
    $page = substr($page, 0, strrpos($page,"/api/"));
    $url = 'http'. ($_SERVER["HTTPS"] == "on" ? 's' : '') .'://'.$_SERVER['HTTP_HOST'].$page;

    header('Location: ' . $url);
    //echo($url);
}