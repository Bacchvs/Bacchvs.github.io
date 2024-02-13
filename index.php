<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Persona</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
        }
        h1, h2, p {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Perfil de Persona</h1>
        <?php
            // Información de la persona
            $nombre = "Juan Pérez";
            $edad = 30;
            $profesion = "Ingeniero de Software";
            $ciudad = "Ciudad de México";

            // Mostrar la información
            echo "<h2>$nombre</h2>";
            echo "<p>Edad: $edad años</p>";
            echo "<p>Profesión: $profesion</p>";
            echo "<p>Ciudad: $ciudad</p>";
        ?>
    </div>
</body>
</html>
