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

        $password = md5($password);

        $stmt->bind_param("ss", $username, $password);

        $stmt->execute();

        createCookie(md5($username));

        getPlayers();

        echo("success");

        $stmt->close();
    }

    function getPlayers(){
        $conn = openDbCon();

        $sql = "SELECT ID, Username, Password, Highscore FROM players";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            

            echo "id: " . $row["ID"]. " - Name: " . $row["Username"]. " " . $row["Password"]. "<br>";
          }
        } else {
          echo "0 results";
        }
    }

    function createCookie($cookieValue) {
        setcookie("blaster", $cookieValue, time() + (86400 * 7), "/"); // 86400 = 1 day
    }

    function getCookie() {
        return $_COOKIE["blaster"];
    }

    function openDbCon() {
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "";
        $db = "webtlso";
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            return $conn;
        }
    }

?>