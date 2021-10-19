# grindcraft
A grindcraft clone that is unblocked.

<!DOCTYPE HTML>

<html>
  <head>
    <title>Grindcraft</title>

    <link rel = "stylesheet" href = "style.css">
    <link rel = "icon" href = Assets/Images/icon.png>
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src = "Game.js"></script>
  </head>
  <body>
    <h1>Welcome to Grindcraft! Updated again !</h1>
  
    <p id = "errorlog">No errors! :D</p>
`   
    <div class = "slot">
      <img class = "slotImage" width = "100px" height = "100px" src = "Assets/Images/icon.png" alt = "Resource Image">
      <p id = "none" class = "amountLabel">99999</p>
    </div>
    <div class = "recipe">
      <div class = "slot">
        <img class = "slotImage" width = "100px" height = "100px" src = "Assets/Images/icon.png" alt = "Resource Image">
        <p id = "1" class = "amountLabel">99999</p>
      </div>
    </div>
  </body>

  <script>
    Init();
  </script>
</html>
