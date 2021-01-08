<?php if(isset($_POST['score'])) : ?>
    <table>
        <?php 
            updateScoreForPlayer($_POST['score']); 
        ?>
    </table>
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
                                echo '<p>Sie wurden erfolgreich als <b>' . $_POST['username'] . '</b> eingeloggt!</p>';
                            } else {
                                echo '<p>Etwas ist mit dem Login schief gegangen. Eventuell falsches Passwort...</p>';
                            }
                        }elseif(isset($_POST['register'])) {
                            echo '<h1>Registrierung</h1>';
                            if(register($_POST['username'], $_POST['password'], $_POST['passwordRepeat'])){
                                echo '<p>Sie haben sich erfolgreich als <b>' . $_POST['username'] . '</b> registriert und eingeloggt!</p>';
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

    function register($username, $password, $passwordRepeat){
        if($password == $passwordRepeat) {
            $conn = openDbCon();

            $stmt = $conn->prepare("INSERT INTO players (Username, Password) VALUES (?, ?)");

            $password = md5($password);

            $stmt->bind_param("ss", $username, $password);

            $stmt->execute();

            createCookie(md5($username . "blstr"));

            $stmt->close();

            return true;
        }else {
            return false;
        }
    }

    function updateScoreForPlayer($score) {
        if(getCookie() != null && $score > 0) {
            $conn = openDbCon();

            $sql = "SELECT ID, Username, Highscore FROM players";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    if(md5($row["Username"] . "blstr") == getCookie()) {
                        if($score > $row["Highscore"]) {
                            $stmt = $conn->prepare("UPDATE players SET Highscore=? WHERE ID=?");
                    
                            $stmt->bind_param("ii", $score, $row["ID"]);
                            $stmt->execute();

                            break;
                        }
                    }
                }
            }
        }

        getPlayerHighscoreList();
        
    }

    function getPlayerHighscoreList(){
        $conn = openDbCon();

        $sql = "SELECT Username, Highscore FROM players ORDER BY Highscore DESC";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            echo "<tr>";
            echo "<th>Player</th><th>Highscore</th>";
            echo "</tr>";
            while($row = $result->fetch_assoc()) {
                if($row["Highscore"] > 0 ){
                    echo "<tr>";
                    echo "<td>" . $row["Username"]. "</td><td class='score'>" . $row["Highscore"]. "</td>";
                    echo "</tr>";
                }
            }
        } else {
          echo "Keine Highscores...";
        }
    }

    function destroyCookie() {
        setcookie("blaster", time() - (86400 * 7));
    }

    //Das Cookie wird verwendet um zu überprüfen, wer aktuell eingeloggt ist. 
    function createCookie($cookieValue) {
        setcookie("blaster", $cookieValue, time() + (86400 * 7), "/"); //<- Mathematische Berechnung ;)
    }

    function getCookie() {
        if (isset($_COOKIE["blaster"])){ 
            return $_COOKIE["blaster"];
         } else {
             return null;
         }
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