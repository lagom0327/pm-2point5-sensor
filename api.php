<?php
require_once('./conn.php');
header('Content-Type: application/json; charset=UTF-8'); 
// 拿到目前最新的 pm 2.5 資料
function getNewestData($conn) {
  $stmt = $conn->prepare("SELECT pm2point5, date_time, temperature, humidity FROM PM_sensor ORDER BY date_time DESC LIMIT 1");  
  $stmt->execute();
  $result = $stmt->get_result();
  $arr = array();
  while ($row = $result->fetch_assoc()) {
    // array_push($arr, $row);
    echo json_encode($row);
  }
  // echo json_encode($arr);
  $conn->close();
}
getNewestData($conn);
?>