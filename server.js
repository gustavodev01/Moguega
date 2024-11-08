const express = require('express');
const { Pool } = require('pg'); //reutilizo a configuração do PostgreSQL
const bcrypt = require('bcrypt');
const pool = require('./db'); //arquivo db.js para o pool de conexão

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

  //rota para acessar a página de cadastro de cliente
app.get('/cadastro/cliente', (req, res) => {
  res.sendFile(path.join(__dirname, 'cadastro/Cliente/cadastroCliente.html'));
});

// Endpoint para salvar cliente no banco de dados
app.post('/api/clientes', async (req, res) => {
  const { nome, sobrenome, email, sexo, celular, ativo, recebe_novidade, senha } = req.body;

  try {
      // Criptografar a senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(senha, 10);

      const query = `
          INSERT INTO BRB_CAD_CLIENTE
          (BCC_PRIMEIRO_NOME, BCC_SOBRENOME, BCC_EMAIL, BCC_SEXO, BCC_CELULAR, BCC_ATIVO, BCC_RECEBE_NOVIDADES, BCC_SENHA)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
      `;
      const values = [nome, sobrenome, email, sexo, celular, ativo, recebe_novidade || false, hashedPassword];

      const result = await pool.query(query, values);
      res.status(201).json({
          message: 'Cliente salvo com sucesso!',
          cliente: result.rows[0]
      });
  } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      res.status(500).json({ error: 'Erro ao salvar cliente' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});