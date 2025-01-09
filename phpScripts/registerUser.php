<?php
include 'dbConnection.php'; 


if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $firstName = $conn->real_escape_string($input['firstName']);
    $lastName = $conn->real_escape_string($input['lastName']);
    $userName = $conn->real_escape_string($input['userName']);
    $email = $conn->real_escape_string($input['email']);
    $password = $input['password']; // Already hashed on the client

    $sql = "INSERT INTO users (firstName, lastName, userName, email, password) 
            VALUES ('$firstName', '$lastName', '$userName', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }
}

$conn->close();
?>
