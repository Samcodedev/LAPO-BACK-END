const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();

// ... your routes and other middleware ...

// Error Handler (should be last middleware)
app.use(errorHandler); 