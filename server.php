<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="Luca Sommer">
		<meta name="description" content="WEBT MEP">
		<title>WEBT MEP - Luca Sommer</title>

		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<div id="container" class="w3-container">
			<section id="intro">

                <?php 
                    if(isset($_POST['login'])) {
                        if(login($_POST['username'], $_POST['password'])){
                            echo '<p>Sie wurden erfolgreich als ' . $_POST['username'] . ' eigeloggt!</p>';
                        } else {
                            echo '<p>Etwas ist schief gegangen...</p>';
                        }
                    }

                    if(isset($_POST['register'])) {
                        if(register($_POST['username'], $_POST['password'])){
                            echo '<p>Sie wurden erfolgreich als ' . $_POST['username'] . ' eigeloggt!</p>';
                        } else {
                            echo '<p>Etwas ist schief gegangen...</p>';
                        }
                    }

                ?>

				<h1>TEST</h1>
                <p>In ac magna tellus. Pellentesque eu cursus nunc, quis blandit nibh. Suspendisse vel risus ornare, rutrum tellus eu, convallis libero. Pellentesque mollis nisi sed nibh fermentum maximus. Duis luctus cursus quam eget aliquam. Mauris sed nibh hendrerit, sodales justo vel, commodo ante. Fusce eget tempus lectus. Duis aliquam velit ut sapien consectetur elementum. Aliquam ac tellus a metus cursus suscipit non vitae neque. Nunc ex augue, commodo sit amet magna eget, bibendum maximus nisi. Donec a egestas elit, vel dignissim lectus.</p>

                
                <a href="index.html#game"><h1>Zurück zur Startseite</h1></a>

			</section>
		</div>
	</body>
</html>


<?php

    if(isset( $_POST['register'])) {

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