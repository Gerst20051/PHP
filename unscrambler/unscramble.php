<?php
header('Access-Control-Allow-Origin: *');

if (isset($_GET['string']) && !empty($_GET['string'])) $STRING = trim($_GET['string']);

if (isset($STRING)) {
	require_once('allwords.php');
	$solutions = array();
	$sWords = explode(' ', $STRING);

	foreach ($sWords as $sWord)
		foreach ($uWords as $uWord)
			if (count_chars($sWord,1) === count_chars($uWord,1))
				$solutions[$uWord] = $sWord;

	echo '<pre>'.print_r($solutions,TRUE).'</pre>';
}
?>