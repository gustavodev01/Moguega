const express = require('express');
const { Pool } = require('pg'); // Reutilizando a configuração do PostgreSQL
const pool = require('./db'); // Arquivo db.js para o pool de conexão

const app = express();
const port = 8080;
const path = require('path');

// Middleware para lidar com requisições do tipo JSON
app.use(express.json());
app.use(express.static(path.join(__dirname)));


//////////////////////////////////////////////////////
//Definicação de Rotas para o app

//rota de teste - pego os dados atuais do banco de dados
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao realizar a consulta:', error);
    res.status(500).json({ error: 'Erro ao realizar a consulta' });
  }
});

//rota para acessar a pagina home do projeto (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});