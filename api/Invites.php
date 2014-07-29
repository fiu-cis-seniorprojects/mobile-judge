<?php

require_once 'Database.php';

class Invites {

    public function getAll() {
        $db = new Database();
        $db->select('JudgeInvitations');
        $res = $db->getResult();
        if (array_key_exists('id', $res)) $res=array($res);
        return array('total'=>count($res), 'data'=>$res);
    }

    public function getById($id) {
        $db = new Database();
        $db->select('JudgeInvitations','*',null,"id = '".$id."'");
        $res = $db->getResult();
        if (count($res) == 0) return null;
        return $res;
    }

    public function send($rec) {
        $db = new Database();

        $db->select('JudgeInvitations','id',null,"Email = '".$rec->email."'", 'Sent DESC', '1');

        $invite = $db->getResult();

        $isNew = !(array_key_exists('id', $invite));

        $id = $isNew ? trim($db->getGUID(),"{}") : $invite['id'];

        if (!$isNew) $db->delete('JudgeInvitations', "id='".$id."'");
        $db->insert('JudgeInvitations', array('id'=>$id, 'Email'=>$rec->email, 'FirstName'=>$rec->firstName, 'LastName'=>$rec->lastName ));

        $db->select('JudgeInvitations','JudgeInvitations.*,Settings.Subject','Settings ON 1=1',"id = '".$id."'");
        $invite = null;
        $invite = $db->getResult();

        $sent = mail($rec->email,$invite['Subject'], self::getEmailBody($id), "From: Masoud Sadjadi <sadjadi@cs.fiu.edu>\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n");

        if ($isNew && !$sent)
        {
            $db->delete('JudgeInvitations', "id = '".$id."'");
            $invite = null;
        }

        return array('success'=>$sent, 'data'=>$invite);
    }

    public static function getRSVPUrl() {
        $pageURL = 'http';
        if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
        $pageURL .= "://";
        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }

        $pageURL = strtok($pageURL,'?');

        return substr($pageURL,0,strpos($pageURL,'api/'));
    }

    public static function getEmailBody($id){
        $db = new Database();

        $db->select('Settings',"Settings.*,JudgeInvitations.*","JudgeInvitations ON JudgeInvitations.id = '".$id."'",'JudgeInvitations.Replied is null',null,'1');
        $res = $db->getResult();

        if (count($res) == 0) return '';

        $url = self::getRSVPUrl();

        $date = date_format(DateTime::createFromFormat('Y-m-d', $res['Date']), "l, F j");

        return '<!DOCTYPE><html style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<head style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<meta name="viewport" content="width=device-width" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<title style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">CIS 4911: Judge Invitation</title>
</head>
<body bgcolor="#FFFFFF" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;height:100%;width:100%">
<table class="head-wrap" bgcolor="#f2f2f2" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
<td class="header container" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0 auto;padding:0;display:block;max-width:600px;clear:both">
<div class="contentpre" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0 auto;padding:0;max-width:600px;display:block">
<table bgcolor="#f2f2f2" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<table bgcolor="#f2f2f2" class="preheader" width="100%" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;background-color:#f2f2f2">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<div style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:280px;float:left;min-width:279px">
<table bgcolor="#f2f2f2" cellpadding="" align="" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td align="" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:5px">
<p style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-bottom:10px;font-weight:400;font-size:9.5px;line-height:1.6;color:#acacac">Cannot read the content below? <a href="'.$url.'api/ViewInvitation.php?id='.$id.'" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;color:#2ba6cb">View email in browser</a>.</p>
</td>
</tr>
</table>
</div>
<div class="clear" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;display:block;clear:both"></div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</td>
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
</tr>
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
</td>
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
</tr>
</table>
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
<table class="body-wrap" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
<td class="container" bgcolor="#FFFFFF" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0 auto;padding:0;display:block;max-width:600px;clear:both">
<div class="content" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0 auto;padding:15px;max-width:600px;display:block">
<table style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tbody style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"><tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td align="center" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<p style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-bottom:10px;font-weight:400;font-size:14px;line-height:1.6"><img height="300" width="600" src="https://c2.staticflickr.com/4/3475/3230851751_b596f68f7b.jpg" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;max-width:100%"></p>
</td>
</tr>
</tbody></table>
</div>
<div class="column-wrap" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0 auto;padding:0;max-width:600px">
<div class="column" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:300px;float:left">
<table style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:15px">
<h2 style="font-family:HelveticaNeue-Light,&quot;Helvetica Neue Light&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,&quot;Lucida Grande&quot;,sans-serif;margin:0;padding:0;line-height:1.1;margin-bottom:15px;color:#000;font-weight:700;font-size:37px">You\'re Invited!</h2>
<p style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-bottom:10px;font-weight:400;font-size:14px;line-height:1.6">Dear '.$res['FirstName'] .' '. $res['LastName'].',</p>
<p style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-bottom:10px;font-weight:400;font-size:14px;line-height:1.6">'.$res['EmailText'].'</p>
</td>
</tr>
</table>
</div>
<div class="column" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:300px;float:left">
<table style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;width:100%">
<tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:15px">
<ul class="sidebar" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-bottom:10px;font-weight:400;font-size:14px;line-height:1.6;background:#ebebeb;display:block;list-style-type:none">
<li style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-left:5px;list-style-position:inside;display:block"><a style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:10px 16px;color:#666;text-decoration:none;cursor:pointer;border-bottom:1px solid #777;border-top:1px solid #FFF;display:block"><b style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">Date:</b> '.$date.'</a></li>
<li style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-left:5px;list-style-position:inside;display:block"><a style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:10px 16px;color:#666;text-decoration:none;cursor:pointer;border-bottom:1px solid #777;border-top:1px solid #FFF;display:block"><b style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">Time:</b> '.$res['Time'].'</a></li>
<li style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;margin-left:5px;list-style-position:inside;display:block"><a class="last" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:10px 16px;color:#666;text-decoration:none;cursor:pointer;border-bottom:1px solid #777;border-top:1px solid #FFF;display:block;border-bottom-width:0"><b style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0">@</b>: '.$res['Location'].'</a></li>
</ul>
<div style="text-align:center">
<a class="btn" href="'.$url.'api/ViewInvitation.php?id='.$id.'&rsvp=accept" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:10px 16px;color:#FFF;text-decoration:none;background-color:#666;font-weight:700;margin-right:10px;text-align:center;cursor:pointer;display:inline-block">Accept</a>
<a class="btn" href="'.$url.'api/ViewInvitation.php?id='.$id.'&rsvp=decline" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:10px 16px;color:#FFF;text-decoration:none;background-color:#666;font-weight:700;margin-right:10px;text-align:center;cursor:pointer;display:inline-block">Decline</a>
</div>
</td>
</tr>
</table>
</div>
<div class="clear" style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0;display:block;clear:both"></div>
</div>
</td>
<td style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Helvetica,Arial,sans-serif;margin:0;padding:0"></td>
</tr>
</table>
</body>
</html>';
    }
} 