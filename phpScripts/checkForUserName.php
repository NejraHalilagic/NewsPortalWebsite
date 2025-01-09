<?php

include 'dbConnection.php';

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);
$userName = $input['userName'];

// Query the database to check if the username exists
$sql = "SELECT userName FROM users WHERE userName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userName);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "exists"]);
} else {
    echo json_encode(["status" => "available"]);
}

$stmt->close();
$conn->close();
?>
