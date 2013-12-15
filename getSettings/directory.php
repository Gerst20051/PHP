<?php
$config = array("os"=>"windows","directory"=>".","ignore"=>array('_vti_cnf','cgi-bin','.','..'));

function getSettings($dir, $issubdir = false) { global $config, $SETTINGS;
	if ($config['os'] == "unix") $delimiter = "/"; else if ($config['os'] == "windows") $delimiter = "\\";
	if (!file_exists($dir) || !is_dir($dir) || !is_readable($dir)) {
		echo "Error: \"$dir\" is not a directory, or I cannot read it properly.";
		return 0;
	} else if ($od = opendir($dir)) {
		while (($file = readdir($od)) !== false) {
			if (!in_array($file, $config['ignore'])) {
				$path = $dir . $delimiter . $file;
				if (is_dir($path)) getSettings($path, true);
				elseif (is_file($path) && $file == "settings.php") include ($path);
			}
		}
		closedir($od);
	}
}

ob_implicit_flush(true);
ob_end_flush();
getSettings($config['directory'], false);
echo $SETTINGS['theme_name'];
?>