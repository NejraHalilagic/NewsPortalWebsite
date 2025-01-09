<?php
include 'dbConnection.php';

// Parse JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Debug: Log raw input for debugging purposes
error_log("Raw Input: " . file_get_contents('php://input'));

// Validate input
if (!isset($input['newsID']) || !is_numeric($input['newsID'])) {
    echo json_encode(["status" => "error", "message" => "Invalid news ID."]);
    exit();
}

// Correctly cast newsID to an integer
$id = (int)$input['newsID']; // Ensure it's an integer
$title = $input['title'] ?? null;
$content = $input['content'] ?? null;
$authorsName = $input['authorsName'] ?? null;
$image = $input['image'] ?? null;
$publishedAt = $input['publishedAt'] ?? null;

// Validate required fields
if (!$title || !$content || !$authorsName || !$image || !$publishedAt) {
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    exit();
}

// Prepare SQL query for updating news
$sql = "UPDATE news SET title = ?, content = ?, authorsName = ?, image = ?, publishedAt = ? WHERE newsID = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    // Log error for debugging
    error_log("SQL Error: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Failed to prepare the SQL statement."]);
    exit();
}

// Bind parameters
$stmt->bind_param("sssssi", $title, $content, $authorsName, $image, $publishedAt, $id);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        // Success response
        echo json_encode(["status" => "success", "message" => "News updated successfully."]);
    } else {
        // No changes were made
        echo json_encode(["status" => "error", "message" => "No changes made to the news."]);
    }
} else {
    // Execution failed
    echo json_encode(["status" => "error", "message" => "Failed to update news."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
