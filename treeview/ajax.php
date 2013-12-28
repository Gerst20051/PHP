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
		$db->insert(MYSQL_TABLE, array(
			'pid'=>$node['pid'],
			'text'=>$node['text'],
			'open'=>$node['open'],
			'folder'=>$node['folder'],
			'timestamp'=>$node['timestamp']
		));
		if ($db->affectedRows()) {
			print_json(array('id'=>$db->insertID()));
		} else {
			print_json(array('error'=>true));
		}
	} elseif ($_POST['action'] === 'update') {
		$db->updateMany(MYSQL_TABLE, $_POST['nodes']);
		if ($db->affectedRows()) {
			print_json(array('error'=>false));
		} else {
			print_json(array('error'=>true));
		}
	}
	break;
case 'GET':
	$query = 'SELECT * FROM `%s` WHERE `timestamp` > "%s"';
	if ($_GET['action'] !== 'ping') {
		$query .= ' AND `pid` > -1';
	}
	$db->sfquery(array($query, MYSQL_TABLE, $_GET['timestamp']));
	if ($db->numRows()) {
		print_json(array('nodes'=>$db->fetchParsedRows()));
	} else {
		print_json(array('nodes'=>array()));
	}
	break;
}
?>
