<?php
include 'dbConnection.php';  // Ensure the connection is successful

// Read the incoming JSON data
$input = json_decode(file_get_contents('php://input'), true);

// Check if the email exists in the request
if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit();
}

$email = $input['email'];

// Insert the email into the database
$sql = "INSERT INTO emails (email) VALUES (?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare SQL query."]);
    exit();
}

$stmt->bind_param("s", $email);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Email successfully inserted."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to insert email."]);
}

$stmt->close();
$conn->close();
?>
