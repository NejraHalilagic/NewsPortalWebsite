<?php
include 'dbConnection.php';

// Get the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (
    !isset($input['userName']) || empty($input['userName']) ||
    !isset($input['currentPassword']) || empty($input['currentPassword']) ||
    !isset($input['newPassword']) || empty($input['newPassword'])
) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}

$userName = $input['userName'];
$currentPassword = $input['currentPassword'];
$newPassword = $input['newPassword'];

// Check if the user exists
$sql = "SELECT password FROM users WHERE userName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "User not found."]);
    exit();
}

$row = $result->fetch_assoc();
$storedHashedPassword = $row['password'];

// Verify the current password
if (!password_verify($currentPassword, $storedHashedPassword)) {
    echo json_encode(["status" => "error", "message" => "Current password is incorrect."]);
    exit();
}

// Hash the new password
$newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// Update the password in the database
$updateSql = "UPDATE users SET password = ? WHERE userName = ?";
$updateStmt = $conn->prepare($updateSql);
$updateStmt->bind_param("ss", $newHashedPassword, $userName);

if ($updateStmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Password updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error updating password."]);
}

// Close connections
$stmt->close();
$updateStmt->close();
$conn->close();
?>
