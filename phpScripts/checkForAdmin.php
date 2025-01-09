<?php

include 'dbConnection.php';

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

// Get input from Angular
$input = json_decode(file_get_contents('php://input'), true);
$userName = $input['userName'];
$password = $input['password'];

// SQL query to fetch the hashed password and check if the username is 'admin'
$sql = "SELECT password FROM users WHERE userName = 'admin'";
$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($storedHashedPassword);
    $stmt->fetch();

    // Verify the password
    if (password_verify($password, $storedHashedPassword)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "error"]);
}

$stmt->close();
$conn->close();
?>
