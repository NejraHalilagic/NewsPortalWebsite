<?php
include 'dbConnection.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $newsID = $_GET['id'];

        // Prepare the SQL statement using newsID
        $stmt = $conn->prepare("SELECT * FROM news WHERE newsID = ?");
        $stmt->bind_param("i", $newsID);  // "i" is for integer type
    } else {
        // Fetch all news
        $stmt = $conn->prepare("SELECT * FROM news");
    }

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $data]);
    } else {
        echo json_encode(["status" => "error", "message" => "No data found"]);
    }

    $stmt->close();
}

$conn->close();
?>
