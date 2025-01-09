<?php
include 'dbConnection.php';

$sql = "SELECT * FROM news";
$result = $conn->query($sql);

$news = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
}

echo json_encode(["news" => $news]);
$conn->close();
?>
