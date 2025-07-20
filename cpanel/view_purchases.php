<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = "dinle_school_server";
$pass = "He74p07^Evs*V.j!";
$dbname = "dinle_school_server";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "<header>";
echo "<h1>Product Purchases History</h1>";
echo "<link rel='stylesheet' href='styles.css'>";
echo "</header>";

$sql = "SELECT * FROM product_purchases ORDER BY purchase_date DESC";
$result = mysqli_query($conn, $sql);

echo "<main>";
if (mysqli_num_rows($result) > 0) {
    echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    echo "<tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Amount</th>
            <th>Purchase Date</th>
          </tr>";
    
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['customer_name'] . "</td>";
        echo "<td>" . $row['customer_email'] . "</td>";
        echo "<td>" . $row['product_name'] . "</td>";
        echo "<td>" . $row['quantity'] . "</td>";
        echo "<td>$" . $row['unit_price'] . "</td>";
        echo "<td>$" . $row['total_amount'] . "</td>";
        echo "<td>" . $row['purchase_date'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No purchases found.</p>";
}
echo "<button onclick=\"window.location.href='http://vmedu416.mtacloud.co.il:3000/'\">Back to Barber Shop Website</button>";

echo "</main>";

mysqli_close($conn);
?>