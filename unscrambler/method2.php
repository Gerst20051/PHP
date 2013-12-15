<?php
$solutions = array();
$sWords = array('word123','unscrambled');
$uWords = array('2dwo3r1','mnaubesrdlc');

foreach ($sWords as $sWord)
	foreach ($uWords as $uWord)
		if (count_chars($sWord,1) === count_chars($uWord,1))
			$solutions[$sWord] = $uWord;

echo '<pre>'.print_r($solutions,TRUE).'</pre>';
?>