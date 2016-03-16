<?php

$bracket_predictor = new BracketPredictor();

class BracketPredictor
{
    public static $team_rankings = [];
    public static $midwest_winner = '';
    public static $west_winner = '';
    public static $east_winner = '';
    public static $south_winner = '';
    public static $midwest_west_winner = '';
    public static $east_south_winner = '';
    public static $champion = '';

    public static $midwest_matches = [
        'Virginia',
        'Hampton',
        'Texas Tech',
        'Butler',
        'Purdue',
        'Ark.-LR',
        'Iowa State',
        'Iona',
        'Seton Hall',
        'Gonzaga',
        'Utah',
        'Fresno State',
        'Dayton',
        'Syracuse',
        'Michigan St.',
        'Mid. Tenn.'
    ];

    public static $west_matches = [
        'Oregon',
        'SOU/HC',
        'St. Joseph\'s',
        'Cincinnati',
        'Baylor',
        'Yale',
        'Duke',
        'UNC-Wilm.',
        'Texas',
        'N. Iowa',
        'Texas A&M',
        'Green Bay',
        'Oregon St.',
        'VCU',
        'Oklahoma',
        'CSU Bakers.'
    ];

    public static $east_matches = [
        'UNC',
        'FGCU/FDU',
        'USC',
        'Providence',
        'Indiana',
        'Chatt.',
        'Kentucky',
        'Stony Brook',
        'Notre Dame',
        'TLSA/MICH',
        'W. Virgina',
        'SF Austin',
        'Wisconsin',
        'Pittsburgh',
        'Xavier',
        'Weber State'
    ];

    public static $south_matches = [
        'Kansas',
        'Austin Peay',
        'Colorado',
        'UConn',
        'Maryland',
        'S. Dakota St.',
        'California',
        'Hawaii',
        'Arizona',
        'WSU/VU',
        'Miami',
        'Buffalo',
        'Iowa',
        'Temple',
        'Villanova',
        'UNC-Ash.'
    ];

    public static $first_round_matches = [
        ['SOU', 'HC'],
        ['FGCU', 'FDU'],
        ['TLSA', 'MICH'],
        ['WSU', 'VU'],
    ];

    function __construct()
    {
        $this->loadRankings();
        $this->computeFirstRoundMatches();
        echo "Men's NCAA Bracket Prediction 2016 by Andrew Gerst";
        self::$midwest_winner = $this->computeMidwestMatches();
        self::$west_winner = $this->computeWestMatches();
        self::$east_winner = $this->computeEastMatches();
        self::$south_winner = $this->computeSouthMatches();
        self::$midwest_west_winner = $this->computeMidwestWestMatch();
        self::$east_south_winner = $this->computeEastSouthMatch();
        self::$champion = $this->computeChampionshipMatch();
    }

    function loadRankings()
    {
        $team_rankings_file = file('mens_team_rankings_2016.txt');
        foreach ($team_rankings_file as $team) {
            if (!empty(trim($team))) {
                self::$team_rankings[] = trim($team);
            }
        }
    }

    function computeFirstRoundMatches()
    {
        $west_match_index = array_keys(preg_grep("/\//", self::$west_matches))[0];
        $east1_match_index = array_keys(preg_grep("/\//", self::$east_matches))[0];
        $east2_match_index = array_keys(preg_grep("/\//", self::$east_matches))[1];
        $south_match_index = array_keys(preg_grep("/\//", self::$south_matches))[0];

        foreach (self::$first_round_matches as $index => $match) {
            $team_1_index = array_search($match[0], self::$team_rankings);
            $team_2_index = array_search($match[1], self::$team_rankings);
            $winning_team_index = $team_1_index < $team_2_index ? 0 : 1;
            if ($index === 0) {
                self::$west_matches[$west_match_index] = $match[$winning_team_index];
            } elseif ($index === 1) {
                self::$east_matches[$east1_match_index] = $match[$winning_team_index];
            } elseif ($index === 2) {
                self::$east_matches[$east2_match_index] = $match[$winning_team_index];
            } elseif ($index === 3) {
                self::$south_matches[$south_match_index] = $match[$winning_team_index];
            }
        }
    }

    function computeMatches($array)
    {
        $output = [];
        for ($i = 0; $i < count($array) - 1; $i += 2) {
            $team_1_index = array_search($array[$i], self::$team_rankings);
            $team_2_index = array_search($array[$i + 1], self::$team_rankings);
            $output[] = $team_1_index < $team_2_index ? $array[$i] : $array[$i + 1];
        }
        return $output;
    }

    function computeMidwestMatches()
    {
        $result = self::$midwest_matches;
        echo "\n\n\nMidwest\n\n";
        while (1 < count($result)) {
            $result = $this->computeMatches($result);
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
        return $result[0];
    }

    function computeWestMatches()
    {
        $result = self::$west_matches;
        echo "\n\n\nWest\n\n";
        while (1 < count($result)) {
            $result = $this->computeMatches($result);
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
        return $result[0];
    }

    function computeEastMatches()
    {
        $result = self::$east_matches;
        echo "\n\n\nEast\n\n";
        while (1 < count($result)) {
            $result = $this->computeMatches($result);
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
        return $result[0];
    }

    function computeSouthMatches()
    {
        $result = self::$south_matches;
        echo "\n\n\nSouth\n\n";
        while (1 < count($result)) {
            $result = $this->computeMatches($result);
            echo json_encode($result, JSON_PRETTY_PRINT);
        }
        return $result[0];
    }

    function computeMidwestWestMatch()
    {
        $result = $this->computeMatches([
            self::$midwest_winner,
            self::$west_winner
        ]);
        echo "\n\nMidwest vs West\n\n";
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result[0];
    }

    function computeEastSouthMatch()
    {
        $result = $this->computeMatches([
            self::$east_winner,
            self::$south_winner
        ]);
        echo "\n\nEast vs South\n\n";
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result[0];
    }

    function computeChampionshipMatch()
    {
        $result = $this->computeMatches([
            self::$midwest_west_winner,
            self::$east_south_winner
        ]);
        echo "\n\nChampion\n\n";
        echo json_encode($result, JSON_PRETTY_PRINT);
        return $result[0];
    }
}
