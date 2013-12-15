<?php

function getSettings($path = '.', $level = 0) {
	$ignore = array('_vti_cnf','cgi-bin','.','..');
	$dh = @opendir($path);
	while(($file = readdir($dh)) !== false) {
		if (!in_array($file, $ignore)) {
			if (is_dir("$path/$file")) getSettings("$path/$file", ($level + 1));
			elseif ($file == "settings.php") { include ("$path/$file"); return $SETTINGS; }
		}
	}
	closedir($dh);
}

$SETTINGS = getSettings();
echo $SETTINGS['theme_name'];

?>