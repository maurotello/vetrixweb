<?php
// Permitir CORS básico si es necesario (cuando se sube al server)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos POST
    $nombre = filter_var(trim($_POST["nombre"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefono = filter_var(trim($_POST["telefono"]), FILTER_SANITIZE_STRING);
    $mensaje = trim($_POST["mensaje"]);

    // Recipient email address
    $to = "info@vetrixweb.com";
    
    // Asunto
    $subject = "Nuevo prospecto desde la web - $nombre";

    // Contenido del email
    $email_content = "Has recibido un nuevo mensaje de contacto desde VetrixWeb.\n\n";
    $email_content .= "================================\n";
    $email_content .= "Detalles del Contacto:\n";
    $email_content .= "================================\n\n";
    $email_content .= "Nombre: $nombre\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Teléfono: $telefono\n\n";
    $email_content .= "Mensaje/Desafío:\n$mensaje\n";

    // Headers
    $headers = "From: webmaster@vetrixweb.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar el email
    if (mail($to, $subject, $email_content, $headers)) {
        // Éxito: Devolvemos status 200 y JSON amigable
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "El correo fue remitido satisfactoriamente."]);
        exit;
    } else {
        // Fallo de mail()
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error interno al enviar el correo."]);
        exit;
    }
} else {
    // Si no es un POST, bloqueamos
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
    exit;
}
?>
