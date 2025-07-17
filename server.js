const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/preview', (req, res) => {
    res.sendFile(path.join(__dirname, 'preview-fixed.html'));
});

app.get('/preview-fixed.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'preview-fixed.html'));
});

// Handle SPA routing
app.get('*', (req, res) => {
    // Check if it's an API call or file request
    if (req.path.includes('.')) {
        res.status(404).send('File not found');
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log('🚀 Golden Balance server pokrenut!');
    console.log(`📱 Aplikacija dostupna na: http://localhost:${PORT}`);
    console.log(`📁 Serviram fajlove iz: ${__dirname}`);
    console.log('⚡ Pritisnite Ctrl+C za zaustavljanje');
    
    // Auto-open browser
    const open = require('child_process').exec;
    open(`start http://localhost:${PORT}`);
});
