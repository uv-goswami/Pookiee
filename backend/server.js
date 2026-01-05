require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://frontend-14mw.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const isLocalConnection = process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocalConnection ? false : { rejectUnauthorized: false }
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        step INTEGER,
        question TEXT,
        answer TEXT,
        captured_image TEXT,
        proposal_response TEXT,
        message TEXT,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("PostgreSQL Table initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};
initDb();

app.post('/api/deliver', async (req, res) => {
  const { type, step, question, answer, capturedImage, proposalResponse, message } = req.body;

  try {
    const query = `
      INSERT INTO responses (type, step, question, answer, captured_image, proposal_response, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [type, step, question, answer, capturedImage, proposalResponse, message];
    
    const result = await pool.query(query, values);
    res.status(200).json({ 
      message: 'Data saved to PostgreSQL successfully!', 
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error("Error saving to Postgres:", error);
    res.status(500).json({ message: 'Error saving response' });
  }
});

app.get('/responses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM responses ORDER BY timestamp DESC');
    const responses = result.rows;

    let html = `
      <html>
        <head>
          <title>Postgres Saved Responses</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f0f2f5; }
            .container { max-width: 800px; margin: auto; }
            .response { background: white; padding: 20px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            img { max-width: 100%; border-radius: 5px; margin: 10px 0; border: 1px solid #ddd; }
            .meta { color: #666; font-size: 0.8rem; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px; }
            h4 { color: #1a73e8; margin: 10px 0 5px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Proposal Submissions (PostgreSQL)</h1>
    `;

    if (responses.length === 0) {
      html += `<p>No responses found in the database.</p>`;
    } else {
      responses.forEach((resp) => {
        html += `
          <div class="response">
            <div class="meta">ID: ${resp.id} | ${new Date(resp.timestamp).toLocaleString()}</div>
            ${resp.type === 'question' ? `
              <h4>Q: ${resp.question}</h4>
              <p>A: ${resp.answer}</p>
              ${resp.captured_image ? `<img src="${resp.captured_image}" />` : ''}
            ` : ''}
            ${resp.type === 'proposal' ? `<h4>Proposal: ${resp.proposal_response}</h4>` : ''}
            ${resp.type === 'chat' ? `<h4>Message: ${resp.message}</h4>` : ''}
          </div>`;
      });
    }

    html += `</div></body></html>`;
    res.send(html);
  } catch (error) {
    console.error("Error retrieving from Postgres:", error);
    res.status(500).send("Error retrieving responses");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/ping', (req, res) => {
  res.status(200).send('awake');
});