<!DOCTYPE html>
<html>
<head>
    <title>Low Stock Alert</title>
</head>
<body>
    <h1>Low Stock Alert for {{ $productName }}</h1>
    <p>The stock for the product "{{ $productName }}" is critically low.</p>
    <p>Current Stock: {{ $productStock }}</p>
    <p>Minimum Stock Quantity: {{ $minimumStock }}</p>
    <p>Please restock this product as soon as possible.</p>
</body>
</html>
