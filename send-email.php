<?php
// Set response headers to JSON
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
    exit;
}

// Get and sanitize inputs
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$business = isset($_POST['business']) ? strip_tags(trim($_POST['business'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($phone) || empty($business)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos requeridos.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'El formato del correo electrónico no es válido.']);
    exit;
}

// Recipient email
$to = 'maurotello73@gmail.com';

// Subject
$subject = "Nueva cotización de $name - Vetrixweb";

// Email content (HTML format for premium look)
$email_content = "
<html>
<head>
  <title>Nueva consulta de cotización</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;'>
    <h2 style='color: #006e2f; border-bottom: 2px solid #4be277; padding-bottom: 10px;'>Nueva solicitud de cotización</h2>
    <p><strong>Nombre Completo:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email de Contacto:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>
    <p><strong>Teléfono / WhatsApp:</strong> " . htmlspecialchars($phone) . "</p>
    <p><strong>Tipo de Negocio:</strong> " . htmlspecialchars($business) . "</p>
    <div style='margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #4be277; border-radius: 4px;'>
      <p style='margin-top: 0;'><strong>Mensaje Adicional:</strong></p>
      <p style='white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</p>
    </div>
  </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: Vetrixweb Form <noreply@vetrixweb.com>" . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado satisfactoriamente']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Algo salió mal. Intentá más tarde o escribinos por WhatsApp sin compromiso']);
}
