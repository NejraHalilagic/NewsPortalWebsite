<?php
include 'dbConnection.php';

// Parse JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Debug: Log raw and parsed input
error_log("Raw Input: " . file_get_contents('php://input'));
error_log("Parsed Input: " . print_r($input, true));

// Validate input
if (!isset($input['ID']) || !is_numeric($input['ID'])) {
    echo json_encode(["status" => "error", "message" => "Invalid user ID."]);
    exit();
}

$id = (int)$input['ID'];
$firstName = $input['firstName'] ?? null;
$lastName = $input['lastName'] ?? null;
$userName = $input['userName'] ?? null;
$email = $input['email'] ?? null;
$createdAt = $input['createdAt'] ?? null;

// Validate required fields
if (!$firstName || !$lastName || !$userName || !$email || !$createdAt) {
    error_log("Missing fields: " . print_r($input, true));
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}

// Update user query
$sql = "UPDATE users SET firstName = ?, lastName = ?, userName = ?, email = ?, createdAt = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("SQL Error: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Failed to prepare the SQL statement."]);
    exit();
}

$stmt->bind_param("sssssi", $firstName, $lastName, $userName, $email, $createdAt, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "User updated successfully."]);
    } else {
        error_log("No rows affected for ID: $id");
        echo json_encode(["status" => "error", "message" => "No changes made to the user."]);
    }
} else {
    error_log("SQL Execution Error: " . $stmt->error);
    echo json_encode(["status" => "error", "message" => "Failed to update user."]);
}

$stmt->close();
$conn->close();
?>
