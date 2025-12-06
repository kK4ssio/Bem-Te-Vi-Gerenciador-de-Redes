// /server/server.js
const express = require('express');
const cors = require('cors');
require('./db'); // Conexão com o banco

const devicesRoutes = require('./routes/devices'); 

const app = express();
const PORT = 3000; 

// --- Middlewares ---
app.use(cors()); 
app.use(express.json()); 
// -------------------

// --- Rotas ---
app.get('/', (req, res) => {
    res.send('API Bem-te-vi! Gerenciador de Redes está online.');
});

// Rotas da aplicação
app.use('/devices', devicesRoutes);
// -------------

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});