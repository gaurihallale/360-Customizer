const express = require('express');
const app = express();
const port = 3000;

// Mock database
const products = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, name: `Product ${i + 1}` }));

app.get('/api/products', (req, res) => {
    // Extract limit and offset from query parameters
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const offset = parseInt(req.query.offset) || 0; // Default offset to 0

    // Get paginated products
    const paginatedProducts = products.slice(offset, offset + limit);
    
    // Create response object
    const response = {
        total: products.length,
        limit: limit,
        offset: offset,
        products: paginatedProducts,
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
