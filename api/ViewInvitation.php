<?php

require_once 'Invites.php';

//ini_set('display_errors', 1);
//error_reporting(E_ALL ^ E_NOTICE);

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $db = new Database();

    $db->select('JudgeInvitations','Replied,Response',null,"id = '".$id."'");
    $res = $db->getResult();

    if (count($res) == 0) http_response_code(404);
    else {
        if ($res['Response'] == null) {
            switch($_GET['rsvp']){
                case 'accept':
                    header('Location: '. Invites::getRSVPUrl(). '#/rsvp='.$id);
                    break;
                case 'decline':
                    $db->update('JudgeInvitations', array(
                            'Replied'=>date('Y-m-d H:i:s'),
                            'Response'=>0
                        ), "id ='".$id."'");
                    $res = $db->getResult();
                    if ($res[0] == 1) echo "You have successfully declined the invitation";
                    else http_response_code(404);
                    break;
                default:
                    $body = Invites::getEmailBody($id);

                    if ($body == '') http_response_code(404);
                    else echo $body;
            }
        }
        else echo 'You already '. ($res['Response'] == "1" ? 'accepted' : 'declined')  .' the invitation on '. date_format(DateTime::createFromFormat('Y-m-d H:i:s', $res['Replied']), "l, F jS Y h:i:s A");
    }
}