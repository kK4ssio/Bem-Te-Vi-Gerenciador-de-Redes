const express = require('express');
const cors = require('cors');
require('./db'); 

const devicesRoutes = require('./routes/devices'); 

const app = express();
const PORT = 3000; 


app.use(cors()); 
app.use(express.json()); 


//Rotas
app.get('/', (req, res) => {
    res.send('API Bem-te-vi! Gerenciador de Redes está online.');
});

app.use('/devices', devicesRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});