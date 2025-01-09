<?php
include 'dbConnection.php';

// Read the incoming JSON payload
$input = json_decode(file_get_contents('php://input'), true);

// Debug: Log the raw input
error_log("Raw Input: " . file_get_contents('php://input'));

// Check if the ID is provided
if (!isset($input['ID']) || !is_numeric($input['ID'])) {
    echo json_encode(["status" => "error", "message" => "No valid ID provided."]);
    exit();
}

$id = (int) $input['ID']; // Cast the ID to an integer

// Debug: Log the ID being processed
error_log("Processing ID: " . $id);

// Proceed with deletion
$sql = "DELETE FROM users WHERE ID = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("Error: Failed to prepare SQL statement");
    echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
    exit();
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "User deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "No user found with the provided ID."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Failed to execute SQL query."]);
}

$stmt->close();
$conn->close();
?>
