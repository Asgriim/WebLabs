<?php
//todo добавить валидацию вводимых значений
date_default_timezone_set("Europe/Moscow");
if(!isset($_GET["R"]) || !isset($_GET["Y"]) || !isset($_GET["X"])){
    echo "not enough parameters";
    http_response_code(400);
    die();
}
$r = (float)$_GET["R"];
$y = (float)$_GET["Y"];
$x = (int)$_GET["X"];
$x_arr = [-3,-2,-1,0,1,2,3,4,5];
$r_arr = [1,1.5,2,2.5,3];
if (!in_array($x,$x_arr ) || !in_array($r,$r_arr) || ($y < -5 || $y > 5)){
    echo "invalid parameter";
    http_response_code(400);
    die();
}
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


