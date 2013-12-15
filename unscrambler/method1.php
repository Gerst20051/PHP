<?php
$scrambledWords = array('39d','38sa');
$unscrambledWords = array('93d','s38a');

foreach ($scrambledWords as $scrambledWord) {
	$scrambledChars = str_split($scrambledWord);
	$scrambledCharsCount = array();

	foreach ($scrambledChars as $scrambledChar) {
		++$scrambledCharsCount[$scrambledChar];
	} 

	foreach ($unscrambledWords as $unscrambledWord) {
		$unscrambledChars = str_split($unscrambledWord);
		$unscrambledCharsCount = array();

		foreach ($unscrambledChars as $unscrambledChar) {
			++$unscrambledCharsCount[$unscrambledChar];
		}

		if (count($unscrambledCharsCount) != count($scrambledCharsCount))
			continue;

		$match = true;

		foreach ($unscrambledCharsCount as $unscrambledChar => $occurences) {
			if ($scrambledCharsCount[$unscrambledChar] != $occurences) {
				$match = false;
				break;
			}
		}

		if ($match) {
			$solutions[$scrambledWord] = $unscrambledWord;
			break;
		}
	}
}

print_r($solutions);
?>