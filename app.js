// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/database.sqlite');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota vulnerable ao SQL injection via login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ! Vulnerable: concatena diretamente valores do usuário na query
  const sql = `SELECT id, username, fullname FROM users WHERE username = '${username}' AND password = '${password}';`;
  console.log('[VULNERABLE SQL]', sql);

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Erro no banco');
    }
    if (rows.length > 0) {
      return res.json({ success: true, user: rows[0] });
    } else {
      return res.json({ success: false, message: 'Credenciais inválidas' });
    }
  });

  // Versão segura usando prepared statements:
  // const secureSql = `SELECT id, username, fullname FROM users WHERE username = ? AND password = ?`;
  // db.get(secureSql, [username, password], (err, row) => { ... });
});

// Rota vulnerable ao SQL injection via query string
app.get('/search', (req, res) => {
  const q = req.query.q || '';

  // Vulnerable: concatenação direta
  const sql = `SELECT id, username, fullname FROM users WHERE username LIKE '%${q}%' OR fullname LIKE '%${q}%';`;
  console.log('[VULNERABLE SQL]', sql);
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send('Erro no banco');
    res.json(rows);
  });

  // Versão segura:
  // const secureSql = `SELECT id, username, fullname FROM users WHERE username LIKE ? OR fullname LIKE ?`;
  // db.all(secureSql, [`%${q}%`, `%${q}%`], (err, rows) => { ... });
});

app.listen(3000, () => {
  console.log('App rodando em http://localhost:3000');
});
