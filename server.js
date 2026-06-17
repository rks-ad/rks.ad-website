const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

let count = 12487;

if (fs.existsSync(COUNTER_FILE)) {
    count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 12487;
}

app.use(express.static('public'));

app.get('/api/counter', (req, res) => {
    const increments = [44, 56, 67, 89, 102, 156, 203, 312, 87, 134];
    count += increments[Math.floor(Math.random() * increments.length)];
    fs.writeFileSync(COUNTER_FILE, count.toString());
    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`RKS.Ad running on port ${PORT}`);
});
