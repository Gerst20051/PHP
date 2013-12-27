<?php
require_once 'config.inc.php';
require_once 'mysql.class.php';

function print_json($data, $die = true){
	header('Content-Type: application/json; charset=utf8');
	print_r(json_encode($data));
	if ($die === true) die();
}

$db = new MySQL;

switch ($_SERVER['REQUEST_METHOD']) {
case 'POST':
	if ($_POST['action'] === 'create') {
		$node = $_POST['node'];
	} elseif ($_POST['action'] === 'update') {
		$nodes = $_POST['nodes'];
	}
	break;
case 'GET':
	$db->sfquery(array('SELECT * FROM `%s` WHERE timestamp > "%s"', MYSQL_TABLE, $_GET['timestamp']));
	if ($db->numRows()) {
		print_json(array('nodes'=>$db->fetchParsedRows()));
	} else {
		print_json(array('nodes'=>array()));
	}
	break;
}
?>
