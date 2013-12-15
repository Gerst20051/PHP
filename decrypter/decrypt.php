<?php
header('Access-Control-Allow-Origin: *');
include 'allpasswords.php';

if (isset($_GET['string']) && !empty($_GET['string'])) {
$string = $_GET['string'];
foreach ($pass_arr as $key=>$value) {
	if ($string == $value) { echo $key; break; }
}

$char_arr = array(
'0123456789',
'abcdefghijklmnopqrstuvwxyz',
'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
'!@#$%^&*()-_+=',
'~`[]{}|\:;.<>,.?/'
);
}
?>