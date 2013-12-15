<?php
function array_to_string($var) {
	$output = "<pre>";
	$output .= "\$pass_arr = array(\n";
	_array_to_string($var, $output);
	$output .= ");\n";
	$output .= "</pre>";
	return $output;
}

function _array_to_string($var, &$output, $prefix="") {
	foreach ($var as $key=>$value) {
		if (is_array($value)) {
			$output .= "'".$prefix.$key."' => \n";
			_array_to_string($value, $output, " ".$prefix);
		} else {
			$output .= "'".$prefix.$key."' => '".$value."',\n";
		}
	}
}


$passwords = file('allpasswords.txt');
$complete = array();

foreach ($passwords as $password) {
	$complete[trim($password)] = md5(trim($password));
}

echo array_to_string($complete);
?>