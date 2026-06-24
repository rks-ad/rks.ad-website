const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL Connection
const pool = new Pool({
  connectionString: 'postgres://postgres:<YOUR_PASSWORD>@nextra-money-apps-nextramoneydata-20d36c:5432/postgres'
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Route - Atomic increment in PostgreSQL
app.get('/api/counter', async (req, res) => {
  try {
    // The random increment logic from your original file
    const increments = [44, 56, 67, 89, 102, 156, 203, 312, 87, 134];
    const randomInc = increments[Math.floor(Math.random() * increments.length)];
    
    const result = await pool.query(
      'UPDATE site_stats SET visitor_count = visitor_count + $1 WHERE id = 1 RETURNING visitor_count',
      [randomInc]
    );
    
    res.json({ count: result.rows[0].visitor_count });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Database update failed' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`RKS.Ad running on port ${PORT}`);
});
