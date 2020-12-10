<?php

    switch ($_POST['type']) {
        case "login":
            login($_POST['username'], $_POST['password']);
            break;
        case "register":
            register($_POST['username'], $_POST['password']);
            break;
        default:
            print_r("error");
            break;
    }


    function login($username, $password) {

    }

    function register($username, $password){
        $conn = openDbCon();
        $stmt = $conn->prepare("INSERT INTO players (Username, Password) VALUES (?, ?)");

        $stmt->bind_param("ss", $username, $password);

        $stmt->execute();

        createCookie($username);
        print_r("success");

        $stmt->close();
    }

    function createCookie($value) {
        $cookie_name = "blaster_usr";
        $cookie_value = $value;
        setcookie($cookie_name, $cookie_value, time() + (86400 * 7), "/"); // 86400 = 1 day
    }

    function openDbCon() {
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "";
        $db = "webtlso";
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        if ($conn->connect_error) {
            print_r("Connection failed: " . $conn->connect_error);
        } else {
            return $conn;
        }
    }

    /*
    $conn = OpenCon();
    echo "YES";
    CloseCon($conn);
    */


    
?>