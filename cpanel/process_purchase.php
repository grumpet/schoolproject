<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log file setup
$log_file = 'purchase_submission.log';
function log_message($message) {
    global $log_file;
    $timestamp = date('[Y-m-d H:i:s]');
    file_put_contents($log_file, $timestamp . ' ' . $message . PHP_EOL, FILE_APPEND);
}

log_message('Product purchase submission started');

// Database connection using your cPanel credentials
$host = 'localhost';
$user = "dinle_school_server";
$pass = "He74p07^Evs*V.j!";
$dbname = "dinle_school_server";

log_message('Attempting database connection');
$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    $error_msg = "Connection failed: " . mysqli_connect_error();
    log_message('Database connection error: ' . $error_msg);
    die($error_msg);
} else {
    log_message('Database connection successful');
    log_message('Processing purchase data');
    
    // Debug: Log all POST data
    log_message('POST data: ' . print_r($_POST, true));
    
    // Get and sanitize form data
    $customer_name = isset($_POST['customer_name']) ? mysqli_real_escape_string($conn, $_POST['customer_name']) : '';
    $customer_email = isset($_POST['customer_email']) ? mysqli_real_escape_string($conn, $_POST['customer_email']) : '';
    $product_name = isset($_POST['product_name']) ? mysqli_real_escape_string($conn, $_POST['product_name']) : '';
    $quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;
    $unit_price = isset($_POST['unit_price']) ? (float)$_POST['unit_price'] : 0;
    $total_amount = isset($_POST['total_amount']) ? (float)$_POST['total_amount'] : 0;
    
    log_message('Data after sanitization:');
    log_message("Customer: $customer_name, Email: $customer_email");
    log_message("Product: $product_name, Quantity: $quantity");
    log_message("Unit Price: $unit_price, Total: $total_amount");
    
    // Validate data
    if (empty($customer_name) || empty($customer_email) || empty($product_name) || $quantity <= 0 || $unit_price <= 0) {
        log_message('Validation failed - missing required fields');
        echo "<p style='color: red;'>Error: All fields are required and must be valid.</p>";
        echo "<p><a href='index.html'>Return to form</a></p>";
        exit;
    }
    
    // Create the table if it doesn't exist
    $create_table_sql = "CREATE TABLE IF NOT EXISTS product_purchases (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(150) NOT NULL,
        product_name VARCHAR(100) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        unit_price DECIMAL(8,2) NOT NULL,
        total_amount DECIMAL(8,2) NOT NULL,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!mysqli_query($conn, $create_table_sql)) {
        log_message("Error creating table: " . mysqli_error($conn));
    } else {
        log_message('Table creation/verification successful');
    }
    
    // Create SQL query for insertion
    $sql = "INSERT INTO product_purchases (customer_name, customer_email, product_name, quantity, unit_price, total_amount) 
            VALUES ('$customer_name', '$customer_email', '$product_name', $quantity, $unit_price, $total_amount)";
    
    log_message("Executing SQL query: $sql");

    // Execute query
    if (mysqli_query($conn, $sql)) {
        log_message('Purchase record inserted successfully');
        echo "<header>";
        echo "<h2>Purchase Successful!</h2>";
        echo "</header>";
        echo "<main>";
        echo "<link rel='stylesheet' href='styles.css'>";
        echo "<p><strong>Customer:</strong> $customer_name</p>";
        echo "<p><strong>Email:</strong> $customer_email</p>";
        echo "<p><strong>Product:</strong> $product_name</p>";
        echo "<p><strong>Quantity:</strong> $quantity</p>";
        echo "<p><strong>Unit Price:</strong> $$unit_price</p>";
        echo "<p><strong>Total Amount:</strong> $$total_amount</p>";
        echo "<p><strong>Purchase Date:</strong> " . date('Y-m-d H:i:s') . "</p>";
        echo "<p><a href='index.html'>Make Another Purchase</a></p>";
        echo "<p><a href='view_purchases.php'>View All Purchases</a></p>";
        echo "<button onclick=\"window.location.href='http://vmedu416.mtacloud.co.il:3000/'\">Back to Barber Shop Website</button>";
        echo "</main>";
    } else {
        $error = mysqli_error($conn);
        log_message("SQL Error: $error");
        echo "<p style='color: red;'>Error: " . $error . "</p>";
        echo "<p><a href='index.html'>Return to form</a></p>";
    }

    // Close connection
    mysqli_close($conn);
    log_message('Database connection closed');
}
?>