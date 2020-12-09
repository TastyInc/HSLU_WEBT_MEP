<?php

function OpenCon() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "webtlso";
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die($conn -> error);

    return $conn;
}

function CloseCon($conn) {
    $conn -> close();
}

$conn = OpenCon();
echo "YES";
CloseCon($conn);


?>