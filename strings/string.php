<?php
function is_odd($int) { return($int & 1); }
$f = file("string.txt"); $l = (count($f) - 1); $textarea = true; $capitalize = false; $id = 25;
if ($capitalize) { echo '<style type="text/css"> textarea { text-transform: capitalize; } </style>'; }
if ($textarea) {
echo '<script type="text/javascript"> function selectAll() { document.dform.demo.focus(); document.dform.demo.select(); } </script>';
echo '<body onload="selectAll();"><form name="dform"><textarea name="demo" style="height: 98%; width: 100%;">';
}
switch ($id) {
case 0:
for ($k = 0; $k <= $l; $k++) { // Numbered w/ Title (Add Tab)
	if ($k > 0) { if ($k < 10) $int = 3; elseif ($k < 100) $int = 4; elseif ($k < 1000) $int = 5; else $int = 6; } else $int = 0;
	echo "&#09;\"" . substr(trim($f[$k]), $int) . "\",&#13;";
}
break;
case 1:
$json = false;
$nojson = false;
for ($k = 0; $k <= $l; $k++) { // Numbered w/o Title (Add Tab)
	$s = str_replace("\"","'", trim($f[$k]));
	if ($k < (10 - 1)) $int = 3; elseif ($k < (100 - 1)) $int = 4; elseif ($k < (1000 - 1)) $int = 5; else $int = 6;
	if (trim($s) != "") { if ($nojson) { echo "&#09;" . trim(substr($s, $int)); if ($k !== $l) echo ",&#13;"; } else { if ($json) { echo "&#09;\"" . trim(substr($s, $int)) . "\""; if ($k !== $l) echo ",&#13;"; } else echo trim(substr($s, $int)) . "&#13;"; }}
}
break;
case 2:
for ($k = 0; $k <= $l; $k++) { // Skip Even w/ Title
	if ($k > 0) { if ($k < 10) $int = 3; elseif ($k < 100) $int = 4; elseif ($k < 1000) $int = 5; else $int = 6; } else $int = 0;
	if (is_odd($k)) echo "&#09;\"" . substr(trim($f[$k]), $int) . "\",&#13;";
}
break;
case 3:
for ($k = 0; $k <= $l; $k++) { // Only Names (Add Tab)
	$s = str_replace("\"","'", trim($f[$k]));
	echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 4:
for ($k = 0; $k <= $l; $k++) { // Only Names (No Tab)
	echo "\"" . trim($f[$k]) . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 5: /* Create JSON From List */
for ($k = 0; $k <= $l; $k++) {
	echo "&#09;], \"" . trim($f[$k]) . "\": [&#13;\"Celebration - Kool and The Gang\"&#13;";
}
break;
case 6:
for ($k = 0; $k <= $l; $k++) { // Numbered w/o Title (Add Tab) + Remove Additional Info
	if ($k < (10 - 1)) $int = 3; elseif ($k < (100 - 1)) $int = 4; elseif ($k < (1000 - 1)) $int = 5; else $int = 6;
	if (trim($f[$k]) != "") { echo "&#09;\"" . substr(trim(substr(trim($f[$k]), $int)), 13) . "\""; if ($k !== $l) echo ",&#13;"; }
}
break;
case 7: /* Reformat JSON */
for ($k = 0; $k <= $l; $k++) {
	if ($k < (10 - 1)) $int = 3; elseif ($k < (100 - 1)) $int = 4; elseif ($k < (1000 - 1)) $int = 5; else $int = 6;
	if (trim($f[$k]) != "") { echo "&#09;\"" . substr(trim(substr(trim($f[$k]), $int)), 13) . "\""; if ($k !== $l) echo ",&#13;"; }
}
break;
case 8: /* Reverse Array (Backwards Numbered List) */
$a = array();
for ($k = 0; $k <= $l; $k++) {
	if (trim($f[$k]) != "") { array_push($a, trim($f[$k])); }
}
$a = array_reverse($a);
$l = (count($a) - 1);
for ($k = 0; $k <= $l; $k++) {
	if ($k < (10 - 1)) $int = 3; elseif ($k < (100 - 1)) $int = 4; elseif ($k < (1000 - 1)) $int = 5; else $int = 6;
	echo "&#09;\"" . substr($a[$k], $int) . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 9: /* Append String */
$stringtoadd = " - Christian Music";
for ($k = 0; $k <= $l; $k++) { // Only Names (Add Tab & String)
	$s = str_replace("\"","'", trim($f[$k]));
	echo "&#09;\"" . $s . $stringtoadd . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 10:
$char = "(";
for ($k = 0; $k <= $l; $k++) { // Only Names (Add Tab & Remove After FO of Character)
	$s = str_replace("\"","'", trim($f[$k]));
	if (strpos($s,$char)) {
		$s = strrev(strrchr(strrev($s),$char));
		$s = trim(substr($s,0,strlen($s)-1));
	}
	echo $s . "&#13;";
	//echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 11:
$char = "-";
for ($k = 0; $k <= $l; $k++) { // Only Names (Add Tab & Remove After LO of Character)
	$s = str_replace("\"","'", trim($f[$k]));
	if (strpos($s,$char)) {
		$s = strrev(strchr(strrev($s),$char));
		$s = trim(substr($s,0,strlen($s)-1));
	}
	echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 12:
for ($k = 0; $k <= $l; $k++) { // Only Names (Add Tab & Remove Strings Without Character)
	$s = str_replace("\"","'", trim($f[$k]));
	$s = strrev(strchr(strrev($s),"-"));
	$s = substr($s,0,strlen($s)-1);
	echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;";
}
break;
case 13:
function get_between($input, $start, $end) { /* Get String Between 2 Strings */
	$substr = substr($input, strlen($start) + strpos($input, $start), (strlen($input) - strpos($input, $end)) * (-1));
	return $substr;
}
echo get_between($string, $a, $b); 
break;
case 14:
function right($string,$chars) { /* Get Right Side Of String */
	$vright = substr($string, strlen($string)-$chars, $chars);
	return $vright;
}
echo right($string,4);
break;
case 15: /*Replace Non ASCII Characters */
for ($k = 0; $k <= $l; $k++) {
	$s = str_replace(array("à","á","â","ã","å","ä","æ"), 'a', $f[$k]);
	$s = str_replace(array("è","é","ê","ë"), 'e', $s);
	$s = str_replace(array("ì","í","î","ï"), 'i', $s);
	$s = str_replace(array("ò","ó","ô","õ","ö","ø"), 'o', $s);
	$s = str_replace(array("ù","ú","û","ü"), 'u', $s);
	$s = str_replace(array("À","Á","Â","Ã","Ä","Å"), 'A', $s);
	$s = str_replace(array("ÿ","ñ","ç","Ç","ß","Ž","¥","É","Ë","Í","°","×","¡","’","–","—","\"","½","²","·"), array("y","n","c","C","B","Z","Y","E","E","I"," Degrees"," x ","!","'","-","-","'","1/2","2","-"), $s);
	echo $s;
}
break;
case 16: /* Wikipedia To Name String */
for ($k = 0; $k <= $l; $k++) { // Only Names (No Quotes / Tab & Remove Line w/ Character & Empty Lines)
	$s = str_replace("\"","'", trim($f[$k]));
	if (!strpos($s,"]") && $s != "" && $s != "Title") echo $s . "&#13;";
}
break;
case 17: /* Wikipedia To String */
for ($k = 0; $k <= $l; $k++) { // Only Names (Replace Non ASCII / No Quotes / Add Tab / Add JSON & Remove Line w/ Character & Empty Lines)
	$s = str_replace(array("à","á","â","ã","å","ä","æ"), 'a', trim($f[$k]));
	$s = str_replace(array("è","é","ê","ë"), 'e', $s);
	$s = str_replace(array("ì","í","î","ï"), 'i', $s);
	$s = str_replace(array("ò","ó","ô","õ","ö","ø"), 'o', $s);
	$s = str_replace(array("ù","ú","û","ü"), 'u', $s);
	$s = str_replace(array("À","Á","Â","Ã","Ä","Å"), 'A', $s);
	$s = str_replace(array("ÿ","ñ","ç","Ç","ß","Ž","¥","É","Ë","Í","°","×","¡","’","–","—","\"","½","²","·"), array("y","n","c","C","B","Z","Y","E","E","I"," Degrees"," x ","!","'","-","-","'","1/2","2","-"), $s);
	if (!strpos($s,"]") && $s != "" && $s != "Title") echo $s . "&#13;";
}
break;
case 18: /* Wikipedia To JSON */
for ($k = 0; $k <= $l; $k++) { // Only Names (Replace Non ASCII / No Quotes / Add Tab / Add JSON & Remove Line w/ Character & Empty Lines)
	$s = str_replace(array("à","á","â","ã","å","ä","æ"), 'a', trim($f[$k]));
	$s = str_replace(array("è","é","ê","ë"), 'e', $s);
	$s = str_replace(array("ì","í","î","ï"), 'i', $s);
	$s = str_replace(array("ò","ó","ô","õ","ö","ø"), 'o', $s);
	$s = str_replace(array("ù","ú","û","ü"), 'u', $s);
	$s = str_replace(array("À","Á","Â","Ã","Ä","Å"), 'A', $s);
	$s = str_replace(array("ÿ","ñ","ç","Ç","ß","Ž","¥","É","Ë","Í","°","×","¡","’","–","—","\"","½","²","·"), array("y","n","c","C","B","Z","Y","E","E","I"," Degrees"," x ","!","'","-","-","'","1/2","2","-"), $s);
	if (!strpos($s,"]") && $s != "" && $s != "Title") { echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;"; }
}
break;
case 19: /* Wikipedia To JSON */
$char = ",";
$rchar = false;
$json = true;
$nojson = false;
for ($k = 0; $k <= $l; $k++) { // Only Names (Replace Non ASCII / No Quotes / Add Tab / Add JSON & Remove Line w/ Character & Empty Lines) / Remove FO of Character / Remove Ending Commas
	$s = trim($f[$k]);
	if (!strpos($s,"]") && $s != "" && $s != "Title") {
		if ($rchar && strpos($s,$char)) {
			$s = strrev(strrchr(strrev($s),$char));
			$s = trim(substr($s,0,strlen($s)-1));
		}
		$s = rtrim($s,",");
		//$s = str_replace(array('\r\n', '\r', '\n'), ' ', $s);
		$s = str_replace(array("à","á","â","ã","å","ä","æ"), 'a', $s);
		$s = str_replace(array("è","é","ê","ë"), 'e', $s);
		$s = str_replace(array("ì","í","î","ï"), 'i', $s);
		$s = str_replace(array("ò","ó","ô","õ","ö","ø"), 'o', $s);
		$s = str_replace(array("ù","ú","û","ü"), 'u', $s);
		$s = str_replace(array("À","Á","Â","Ã","Ä","Å"), 'A', $s);
		$s = str_replace(array("ÿ","ñ","ç","Ç","ß","Ž","¥","É","Ë","Í","°","×","¡","’","–","—","\"","½","²","·"), array("y","n","c","C","B","Z","Y","E","E","I"," Degrees"," x ","!","'","-","-","'","1/2","2","-"), $s);
		if ($nojson) { echo "&#09;" . $s; if ($k !== $l) echo ",&#13;"; } else { if ($json) { echo "&#09;\"" . $s . "\""; if ($k !== $l) echo ",&#13;"; } else echo $s . "&#13;"; }
	}
}
break;
case 20: /* Count Lines */
echo count($f);
break;
case 21: /* Remove Single Alphabet Characters */
for ($k = 0; $k <= $l; $k++) {
	$s = trim($f[$k]);
	if (strlen($s) > 1) echo $s . "&#13;";
}
break;
case 22: /* Append Odd Lines To Even */
$yeararr = array();
$namearr = array();
for ($k = 0; $k <= $l; $k++) {
	$line = trim($f[$k]);
	if (!is_odd($k)) array_push($yeararr, $line); else array_push($namearr, $line);
}
for ($k = 0; $k <= $l/2; $k++) {
	echo "&#09;\"" . $namearr[$k] . " (" . $yeararr[$k] . ")\",&#13;";
}
break;
case 23: /* Insert In Middle Of Array */
function insertItem($newItem, $location) {
$i;
for ($i = $lastItem; $i >= $location; $i--) {
	$a[$i+1] = $a[$i];
}
$a[$location] = $newItem;
$lastItem++;
}
break;
case 24: /* String Before Character */
$char = "-";
for ($k = 0; $k <= $l; $k++) { // Numbered w/ Title (Add Tab)
	if (strpos(trim($f[$k]),$char)) echo substr(trim($f[$k]), 0, strpos(trim($f[$k]),$char)) . "&#13;";
	else echo trim($f[$k]) . "&#13;";
}
break;
case 25: /* String After Character */
$char = "-";
for ($k = 0; $k <= $l; $k++) { // Numbered w/ Title (Add Tab)
	if (strpos(trim($f[$k]),$char)) echo substr(trim($f[$k]), strpos(trim($f[$k]),$char)+1) . "&#13;";
	else echo trim($f[$k]) . "&#13;";
}
break;
}
if ($textarea) { echo '</textarea></form></body>'; }
?>