<?php
/*
// •
$equiv = "aàáâãäå,eéèêë,iìîï,oòóôõö,uùúûü,yÿ,nñ,cç";
$equiv = explode(",", $equiv);
foreach ($equiv as $e) {
	$s = preg_quote(trim($f[0]));
	$s = preg_replace("/[$e]/iu", "[$e]", $s);
}
echo $s;

function prepare_search_term($str,$delim='#') {
	$search = preg_quote($str,$delim);
	$search = preg_replace('/[aàáâãåäæ]/iu', '[aàáâãåäæ]', $search);
	$search = preg_replace('/[eèéêë]/iu', '[eèéêë]', $search);
	$search = preg_replace('/[iìíîï]/iu', '[iìíîï]', $search);
	$search = preg_replace('/[oòóôõöø]/iu', '[oòóôõöø]', $search);
	$search = preg_replace('/[uùúûü]/iu', '[uùúûü]', $search);
	return $search;
}

function highlight($searchtext, $text) {
	$search = prepare_search_term($searchtext);
	return preg_replace('#' . $search . '#iu', '<span style="background-color:red">$0</span>', $text);
}

$testtext = 'cafe cáfé càfè CAFE CÁFÉ CÀFÈ càfé cáfè CÀFÉ CÁFÈ';
// echo highlight('cafe',$testtext) . '<br />';
// echo highlight('cáfé',$testtext) . '<br />';
// echo highlight('CAFE',$testtext) . '<br />';
// echo highlight('CÀFÉ',$testtext) . '<br />';
*/
/*
if ($f = fopen('playlists.txt', 'r')) do {
	$line = fgets($f);
	$line = '		"' + $line + '",';
} while (!feof($f));
fclose($f);
*/
/*
$readfile = file("playlists.txt");
for ($k = 0; $k <= count($readfile) - 1; $k++) {
	$fields = split("\n", $readfile[$k]);
	print("$fields[0] $fields[2]<br>");
}
*/
/*
// This is what the sample file contains:
//	A	B	C
//	D	E	F
//	G	H	I

$FilePath = "SampleFile.txt";// File location (URL or server path)
$Lines = file($FilePath);// Stores the content of the file
$LineCount = count($Lines);// Counts the number of lines
$Data = array();// This will be a two dimensional array that holds the content nicely organized
$i = 0;// We will use this as an index

foreach($Lines as $Value) {// Loop through each line
	$Data[$i] = explode("\t", $Value);// In the array store this line with values delimited by \t (tab) as separate array values
	$i++;// Increase the line index
}

What happens here is that when we use the foreach loop combined with the $Lines variable that holds the content of the file, we are actually looping through each line. That's because PHP is smart enough to realize what our objective is. Since we loop through each line, we don't just satifsfy with storing one line per index into a one dimensional array, but further we make use of the explode() function, which will take two parameters, the character by which we want to split, and the string that we want to split. In this case the string is the current line, and the delimiting character is a tab.
The final lines of code will just extract three sample values from our newly created array for demonstration purposes:

echo "First row, first column: ".$Data[0][0]."<br />";// Will return A
echo "Second row, second column: ".$Data[1][1]."<br />";// Will return E
echo "Third row, first column: ".$Data[2][0]."<br />";// Will return G
*/
?>