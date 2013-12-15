<?php
set_time_limit(600); // set_time_limit(60);
$ip = array(0, 0, 0, 0);

for ($c = 0; $c < 4294967296; ++$c) {
	$ip[3] = (++$ip[3] % 256);
	if (!$ip[3]) {
		$ip[2] = (++$ip[2] % 256);
		if (!$ip[2]) {
			$ip[1] = (++$ip[1] % 256);
			if (!$ip[1]) $ip[0] = (++$ip[0] % 256);
		}
	}
	//$ip2 = "$ip[0].$ip[1].$ip[2].$ip[3]";
	echo "$ip[0].$ip[1].$ip[2].$ip[3] ..... ";
}

/*
// Actual Server Performance
51,718 ip per second
3,103,080 ip per minute
186,184,800 ip per hour
83,100 seconds for all ip
1,385 minutes for all ip
23.1 hours for all ip
24 hours = 87400 seconds

// Theoretical Performance
256^2 = 65,536 // 1,092 ip/sec in 60 sec
256^3 = 16,777,216 // 279,620 ip/sec in 60 sec
256^4 = 4,294,967,296 // 71,582,788 ip/sec in 60 sec
255^4 = 4,228,250,625
254^4 = 4,162,314,256
Total = 4,096,048,023
*/
/* B: loop through all 192.168.x.x ip addresses *//*
$ip = array(192, 168, 0, 0);

for ($c = 0; $c < 65536; ++$c) {
	$ip[3] = (++$ip[3] % 256);
	if (!$ip[3]) $ip[2] = (++$ip[2] % 256);
	echo "192.168.$ip[2].$ip[3] ..... ";
}
*//* E: loop through all 192.168.x.x ip addresses */
?>