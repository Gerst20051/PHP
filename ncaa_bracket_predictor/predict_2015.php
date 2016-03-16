<?php

$team_rankings_file = file('mens_team_rankings_2015.txt');
$team_rankings = array();

foreach ($team_rankings_file as $team) {
    $team_rankings[] = trim($team);
}

$midwest_matches = array(
    'Kentucky',
    'MAN/HAM',
    'Cincinnati',
    'Purdue',
    'W. Virginia',
    'Buffalo',
    'Maryland',
    'Valparaiso',
    'Butler',
    'Texas',
    'Notre Dame',
    'NEU',
    'Wichita St.',
    'Indiana',
    'Kansas',
    'N.M. State'
);

$west_matches = array(
    'Wisconsin',
    'CCAR',
    'Oregon',
    'Okla. State',
    'Arkansas',
    'Wofford',
    'UNC',
    'Harvard',
    'Xavier',
    'MISS/BYU',
    'Baylor',
    'Georgia St.',
    'VCU',
    'Ohio St.',
    'Arizona',
    'TXSO'
);

$east_matches = array(
    'Villanova',
    'Lafayette',
    'N.C. State',
    'LSU',
    'N. Iowa',
    'Wyoming',
    'Louisville',
    'UC Irvine',
    'Providence',
    'BSU/DAY',
    'Oklahoma',
    'Albany',
    'MSU',
    'Georgia',
    'Virginia',
    'Belmont'
);

$south_matches = array(
    'Duke',
    'UNF/RMU',
    'SDSU',
    'St. John\'s',
    'Utah',
    'SF Austin',
    'Georgetown',
    'E. Wash.',
    'SMU',
    'UCLA',
    'Iowa State',
    'UAB',
    'Iowa',
    'Davidson',
    'Gonzaga',
    'N.D. State'
);

$first_round_matches = array(
    array('Boise St.', 'Dayton'),
    array('Mississippi', 'BYU'),
    array('UNF', 'RMU'),
    array('Manhattan', 'Hampton')
);

function computeFirstRoundMatches() {
    global $midwest_matches, $west_matches, $east_matches, $south_matches, $first_round_matches, $team_rankings;
    $midwest_match_index = array_keys(preg_grep("/\//", $midwest_matches))[0];
    $west_match_index = array_keys(preg_grep("/\//", $west_matches))[0];
    $east_match_index = array_keys(preg_grep("/\//", $east_matches))[0];
    $south_match_index = array_keys(preg_grep("/\//", $south_matches))[0];

    foreach ($first_round_matches as $index => $match) {
        $team_1_index = array_search($match[0], $team_rankings);
        $team_2_index = array_search($match[1], $team_rankings);
        $winning_team_index = $team_1_index < $team_2_index ? 0 : 1;
        if ($index === 0) {
            $east_matches[$east_match_index] = $match[$winning_team_index];
        } elseif ($index === 1) {
            $west_matches[$west_match_index] = $match[$winning_team_index];
        } elseif ($index === 2) {
            $south_matches[$south_match_index] = $match[$winning_team_index];
        } elseif ($index === 3) {
            $midwest_matches[$midwest_match_index] = $match[$winning_team_index];
        }
    }
}

computeFirstRoundMatches();

function computeMatches($array) {
    global $team_rankings;
    $output = array();
    for ($i = 0; $i < count($array) - 1; $i += 2) {
        $team_1_index = array_search($array[$i], $team_rankings);
        $team_2_index = array_search($array[$i + 1], $team_rankings);
        $output[] = $team_1_index < $team_2_index ? $array[$i] : $array[$i + 1];
    }
    return $output;
}

echo "Men's NCAA Bracket Prediction 2015 by Andrew Gerst";

function computeMidwestMatches() {
    global $midwest_matches;
    $result = $midwest_matches;
    echo "\n\n\nMidwest\n\n";
    while (1 < count($result)) {
        $result = computeMatches($result);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
    return $result[0];
}

$midwest_winner = computeMidwestMatches();

function computeWestMatches() {
    global $west_matches;
    $result = $west_matches;
    echo "\n\n\nWest\n\n";
    while (1 < count($result)) {
        $result = computeMatches($result);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
    return $result[0];
}

$west_winner = computeWestMatches();

function computeEastMatches() {
    global $east_matches;
    $result = $east_matches;
    echo "\n\n\nEast\n\n";
    while (1 < count($result)) {
        $result = computeMatches($result);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
    return $result[0];
}

$east_winner = computeEastMatches();

function computeSouthMatches() {
    global $south_matches;
    $result = $south_matches;
    echo "\n\n\nSouth\n\n";
    while (1 < count($result)) {
        $result = computeMatches($result);
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
    return $result[0];
}

$south_winner = computeSouthMatches();

function computeMidwestWestMatch() {
    global $midwest_winner, $west_winner;
    $result = computeMatches(array(
        $midwest_winner,
        $west_winner
    ));
    echo "\n\nMidwest vs West\n\n";
    echo json_encode($result, JSON_PRETTY_PRINT);
    return $result[0];
}

$midwest_west_winner = computeMidwestWestMatch();

function computeEastSouthMatch() {
    global $east_winner, $south_winner;
    $result = computeMatches(array(
        $east_winner,
        $south_winner
    ));
    echo "\n\nEast vs South\n\n";
    echo json_encode($result, JSON_PRETTY_PRINT);
    return $result[0];
}

$east_south_winner = computeEastSouthMatch();

function computeChampionshipMatch() {
    global $midwest_west_winner, $east_south_winner;
    $result = computeMatches(array(
        $midwest_west_winner,
        $east_south_winner
    ));
    echo "\n\nChampion\n\n";
    echo json_encode($result, JSON_PRETTY_PRINT);
    return $result[0];
}

$champion = computeChampionshipMatch();
