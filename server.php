<?php if(isset($_POST['score'])) : ?>
    <div>KEK</div>
<?php else : ?>
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
                <section>
                    <?php 
                        if(isset($_POST['login'])) {
                            echo '<h1>Login</h1>';
                            if(login($_POST['username'], $_POST['password'])){
                                echo '<p>Sie wurden erfolgreich als <b>' . $_POST['username'] . '</b> eigeloggt!</p>';
                            } else {
                                echo '<p>Etwas ist mit dem Login schief gegangen. Eventuell falsches Passwort...</p>';
                            }
                        }elseif(isset($_POST['register'])) {
                            echo '<h1>Registrierung</h1>';
                            if(register($_POST['username'], $_POST['password'])){
                                echo '<p>Sie haben sich erfolgreich als <b>' . $_POST['username'] . '</b> registriert und eigeloggt!</p>';
                            } else {
                                echo '<p>Etwas ist mit der Registrierung schief gegangen...</p>';
                            }
                        }else {
                            echo '<h1>ERROR</h1>';
                            echo '<p>You have ventured too far! You are not supposed to be here...</p>';
                        }
                    ?>

                    <a href="index.html#game"><h2>Zurück zur Startseite</h2></a>
                </section>
            </div>
        </body>
    </html>
<?php endif; 
    function login($username, $password) {
        $conn = openDbCon();

        $sql = "SELECT ID, Username, Password FROM players WHERE Username=? AND Password=?";
        $stmt = $conn->prepare($sql);

        $password = md5($password);

        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();

        $result = $stmt->get_result();
        
        if($result->num_rows == 1) {
            $user = $result->fetch_assoc();

            createCookie(md5($username . "blstr"));

            return true;
        } else {
            return false;
        }
    }

    function register($username, $password){
        $conn = openDbCon();

        $stmt = $conn->prepare("INSERT INTO players (Username, Password) VALUES (?, ?)");

        $password = md5($password);

        $stmt->bind_param("ss", $username, $password);

        $stmt->execute();

        createCookie(md5($username . "blstr"));

        getPlayers();

        $stmt->close();

        return true;
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