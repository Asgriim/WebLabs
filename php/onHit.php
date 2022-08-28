<?php
// TODO rlr
date_default_timezone_set("Europe/Moscow");
$r = (float)$_GET["R"];
$y = (float)$_GET["Y"];
$x = (int)$_GET["X"];
$currTime = microtime(true) * 1000;
$currDate = date("d-m-y H:i:s");
$json = [];
if ($x == 0 && $y <= $r && $y >= -$r){
    echo createJSON("yes", $currDate, $currTime);
    exit();
}
if ($x < 0 && $x >= -$r / 2 && $y < 0 && $y >= -$r){
    echo createJSON("yes", $currDate, $currTime);
    exit();
}
if ($x > 0){
    if ($y <= 0){
        $rr = sqrt($x**2 + $y**2);
        if ($rr <= $r / 2){
            echo createJSON("yes", $currDate, $currTime);
            exit();
        }
    }
    else{
        //y = -2x + r
        if ($y <= -2*$x + $r ){
            echo createJSON("yes", $currDate, $currTime);
            exit();
        }
    }
}

echo createJSON("no", $currDate, $currTime);

function createJSON($hit, $date, $currTime){
    $scriptTime = microtime(true) * 1000 - $currTime;
    return json_encode(["hit" => $hit, "date" => $date, "scriptTime" => $scriptTime . " ms"]);
}
//echo $_GET["R"] . "\n";
//echo $_GET["Y"] . "\n";
//echo $_GET["X"] . "\n";

