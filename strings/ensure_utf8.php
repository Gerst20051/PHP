#!/usr/bin/php

<?php

$some_string = file_get_contents("utf8_string_template.txt");

// reject overly long 2 byte sequences, as well as characters above U+10000 and replace with ?
$some_string = preg_replace('/[\x00-\x08\x10\x0B\x0C\x0E-\x19\x7F]' .
    '|[\x00-\x7F][\x80-\xBF]+' .
    '|([\xC0\xC1]|[\xF0-\xFF])[\x80-\xBF]*' .
    '|[\xC2-\xDF]((?![\x80-\xBF])|[\x80-\xBF]{2,})' .
    '|[\xE0-\xEF](([\x80-\xBF](?![\x80-\xBF]))|(?![\x80-\xBF]{2})|[\x80-\xBF]{3,})/S',
    '?', $some_string);

// reject overly long 3 byte sequences and UTF-16 surrogates and replace with ?
$some_string = preg_replace('/\xE0[\x80-\x9F][\x80-\xBF]' .
    '|\xED[\xA0-\xBF][\x80-\xBF]/S','?', $some_string);

file_put_contents("utf8_string.txt", $some_string);
