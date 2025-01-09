<?php
include 'dbConnection.php';

// Parse JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Debug: Log the raw input
error_log("Raw Input: " . file_get_contents('php://input'));

// Check if the newsId is provided
if (!isset($input['id']) || !is_numeric($input['id'])) {
    echo json_encode(["status" => "error", "message" => "No valid news ID provided."]);
    exit();
}

$newsId = (int) $input['id']; // Cast the ID to an integer

// Debug: Log the ID being processed
error_log("Processing newsId: " . $newsId);

$sql = "DELETE FROM news WHERE newsId = ?";
$stmt = $conn->prepare($sql);

// Check if the SQL statement prepared successfully
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare the SQL statement."]);
    exit();
}

$stmt->bind_param("i", $newsId);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "News deleted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "No news found with the given ID."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Error executing the delete statement."]);
}

$stmt->close();
$conn->close();
?>
