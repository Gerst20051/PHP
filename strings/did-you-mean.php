<form method="get" action="">
	<input type="text" value="<?php
	if ( isset($_GET["q"]) ) {
		echo $_GET['q'];
	}
	?>" name="q" />
	<p><input type="submit" value="Find Matches" /></p>
</form>
<?php
if ( isset($_GET['q']) ) {
	// input misspelled word
	$input = stripslashes(strip_tags($_GET['q']));

	$dictionary = 'english.txt';
	$handle = fopen($dictionary, "r");

	while ( !feof($handle) ) {
		$words .= fread($handle, 8192);
	}
	fclose($handle);
	$words = explode("\n",$words);

	// no shortest distance found, yet  
	$shortest = -1;  

	// loop through words to find the closest  
	foreach ( $words as $word ) {
		// calculate the distance between the input word,  and the current word  
		$lev = levenshtein($input, $word);  

		// check for an exact match  
		if ( $lev == 0 ) {
			// closest word is this one (exact match)  
			$closest = $word;  
			$shortest = 0;  

			// break out of the loop; we've found an exact match  
			break;  
		}  

		// if this distance is less than the next found shortest distance, OR if a next shortest word has not yet been found  
		if ( $lev <= $shortest || $shortest < 0 ) {
			// set the closest match, and shortest distance  
			$closest  = $word;  
			$shortest = $lev;  
		}
	}
	echo '<p>Input: '.$input.'<br />';  
	if ( $shortest > 0 ) {
		echo 'Did you mean: <strong>'.$closest.'</strong>?';
	} else {
		echo 'No match found.';
	}
	echo '</p>';
}
?>