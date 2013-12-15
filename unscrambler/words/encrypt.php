<?php
function array_to_string($var) {
	$output = "<pre>";
	$output .= "\$uWords = array(\n";
	_array_to_string($var, $output);
	$output .= ");\n";
	$output .= "</pre>";
	return $output;
}

function _array_to_string($var, &$output, $prefix="") {
	foreach ($var as $key) {
		$output .= "'".$prefix.$key."',\n";
	}
}

function TrimArray($input) {
	if (!is_array($input)) return trim($input);
	return array_map('TrimArray', $input);
}

$words = file('allwords.txt');
$english = file('english.txt');
$result = array_merge((array) $words, (array) $english);
echo array_to_string(TrimArray($result));
?>