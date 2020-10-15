<?php
  $servername = 'localhost';
  $username = 'root';
  $password = 'mY*6FKYH';
  // $password = '';
  $dbname = 'esp32_pm_sensor_data';

  $conn = new mysqli($servername, $username, $password, $dbname);
  $conn->query("SET NAMES 'UTF8'");
  $conn->query("SET time_zone = '+08:00'");
  if($conn->connect_error) {
    die("connection failed:" . $conn->connect_error);
  }
?>