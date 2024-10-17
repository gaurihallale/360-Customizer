const express = require('express');
const app = express();
const port = 3000;

// In-memory store for tracking requests
const requestCounts = {};
const RATE_LIMIT = 100; // max requests
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

app.use((req, res, next) => {
    const ip = req.ip;

    // Initialize request count if not already set
    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 0, startTime: Date.now() };
    }

    const currentTime = Date.now();
    const timeElapsed = currentTime - requestCounts[ip].startTime;

    // Reset the count if the time window has passed
    if (timeElapsed > TIME_WINDOW) {
        requestCounts[ip] = { count: 1, startTime: currentTime };
    } else {
        requestCounts[ip].count += 1;
    }

    // Check if the request count exceeds the rate limit
    if (requestCounts[ip].count > RATE_LIMIT) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    next(); // Proceed to the next middleware or route handler
});

app.get('/api/some-endpoint', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
