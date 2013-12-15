<?php
$type = 1;

$arr1 = file('array1.txt'); $arr1l = (count($arr1) - 1);
$arr2 = file('array2.txt'); $arr2l = (count($arr2) - 1);

switch ($type) {
case 0: // both
	$array = array_merge((array)$arr1,(array)$arr2);
break;
case 1: // unique
	$array = array_unique(array_merge((array)$arr1,(array)$arr2));
break;
case 2: // difference
	$array = array_merge(array_diff((array)$arr1,(array)$arr2));
break;
case 3: // count unique
	$array = array_count_values(array_merge((array)$arr1,(array)$arr2));
break;
case 4: // intersect
	$array = array_merge(array_intersect((array)$arr1,(array)$arr2));
break;
case 5: // xor
	function array_xor($array_a, $array_b) {
		$union_array = array_merge($array_a, $array_b);
		$intersect_array = array_intersect($array_a, $array_b);
		return array_diff($union_array, $intersect_array);
	}
	$array = array_merge(array_xor((array)$arr1,(array)$arr2));
break;
}

$string = "";
foreach($array as $item) {
	$string .= $item;
}

$fh = fopen('array_unique.txt','w') or die('can\'t open file');
fwrite($fh,$string);

echo '<script type="text/javascript"> function selectAll() { document.dform.demo.focus(); document.dform.demo.select(); } </script>';
echo '<body onload="selectAll();"><form name="dform"><textarea name="demo" style="height: 98%; width: 100%;">';
echo $string;
echo '</textarea></form></body>';
?>