<?php
// Include the database connection
include 'dbConnection.php';

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM news"; // Replace 'news' with your actual table name
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $data]);
    } else {
        echo json_encode(["status" => "error", "message" => "No data found"]);
    }
}

// Close the connection
$conn->close();
?>
