<?php

include 'dbConnection.php';

// Check if the connection is successful
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

// Get input data
$input = json_decode(file_get_contents('php://input'), true);
$userName = $input['userName'];
$password = $input['password']; // Plain password sent from Angular

// Prepare SQL statement to retrieve the hashed password for the user
$sql = "SELECT password FROM users WHERE userName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userName);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Fetch the stored hashed password
    $stmt->bind_result($storedHashedPassword);
    $stmt->fetch();

    // Verify the plain password against the stored hashed password
    if (password_verify($password, $storedHashedPassword)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "error"]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
