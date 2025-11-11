// init_db.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbFile = './db/database.sqlite';
if (!fs.existsSync('./db')) fs.mkdirSync('./db');

const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users;`);
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    fullname TEXT
  );`);

  const stmt = db.prepare("INSERT INTO users (username,password,fullname) VALUES (?, ?, ?)");
  stmt.run('admin', 'adminpass', 'Administrator');
  stmt.run('alice', 'alice123', 'Alice Silva');
  stmt.run('bob', 'bob123', 'Bob Souza');
  stmt.finalize();

  console.log('DB inicializado em', dbFile);
});

db.close();
