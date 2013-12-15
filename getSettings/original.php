<?php      
// From settings.php
$theme_name = "Classic";
$theme_version = "1.0.0";
$theme_creation_date = "1/16/2011";

// Output of function
/*
Testing
     Themes
         Classic1
Failure! serversets1.php
FunctionsLibrary
Failure!     VariabledFunctions.php
Failure!     jquery-1.4.4.min.js
Failure!     scandir.php
Failure!     area-limiter.php
Failure!     functionslist1.php
Failure!     areacode.php
Failure!     database-newuser-insertion.php
Failure!     areacodes.inc.php
Failure!     jquery.html
Failure!     .tmp_jquery.html.12329~
Failure! signup-variable.php
Failure! frontend-page-functions1.php
Failure! sqlscript1.sql
Failure! sqlcode1.php
Failure! theme_spider.php
Failure! https_header.php
*/

function getDirectory($path = '.', $level = 0){ 
$ignore = array('cgi-bin', '.', '..'); 
// Directories to ignore when listing output. Many hosts 
// will deny PHP access to the cgi-bin. 
 
$dh = @opendir($path);
// Open the directory to the handle $dh
 
while(false !== ($file = readdir($dh))){
// Loop through the directory
 
if(!in_array($file, $ignore)){
// Check that this file is not to be ignored
 
$spaces = str_repeat(' ',($level * 4));
// Just to add spacing to the list, to better
// show the directory tree.
 
if(is_dir("$path/$file")){
// Its a directory, so we need to keep reading down...
 
echo"$spaces $file";
getDirectory("$path/$file",($level+1));
// Re-call this same function but on a new directory.
// this is what makes function recursive.
            } else {
if($file == "settings.php") { // If::1
 
------THIS IS MY PROBLEM-------
// If the file is settings.php open it, read it, and manipulate its content
$pafi1 = "$path/$file";
$fopen = fopen("$pafi1", "r");
$read_data = fread($fopen, 2);
fclose($fopen);
echo $read_data;
 
if(isset($theme_name)) {
echo $theme_name;
} else { //Else::1
echo "Failure!";
} // End else::1
 
             echo"$spaces $file";
                // Just print out the filename
            }
        }
    }
closedir($dh);
    // Close the directory handle
}
getDirectory("."); 
// Get the current directory 
?>