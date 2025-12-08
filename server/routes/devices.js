const express = require('express');
const router = express.Router();
const db = require('../db'); 
const ping = require('ping'); 


router.post('/', async (req, res) => {
    const { nome, endereco_ip, tipo } = req.body;

    if (!nome || !endereco_ip || !tipo) {
        return res.status(400).json({ 
            message: "Todos os campos (nome, endereco_ip, tipo) são obrigatórios." 
        });
    }

    const sql = `
        INSERT INTO devices (nome, endereco_ip, tipo)
        VALUES (?, ?, ?);
    `;
    const values = [nome, endereco_ip, tipo];

    try {
        const [result] = await db.execute(sql, values);
        res.status(201).json({ 
            message: "Dispositivo cadastrado com sucesso!", 
            id: result.insertId 
        });
        
    } catch (error) {
        console.error("Erro ao cadastrar dispositivo:", error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Erro: O endereço IP já está cadastrado." });
        }
        
        res.status(500).json({ message: "Erro interno do servidor ao cadastrar o dispositivo." });
    }
});


router.get('/', async (req, res) => {
    const sql = `
        SELECT
            d.id, d.nome, d.endereco_ip, d.tipo,
            t.status,       
            t.latencia,     
            t.timestamp     
        FROM devices d
        LEFT JOIN (
            SELECT device_id, MAX(timestamp) AS max_timestamp
            FROM tests
            GROUP BY device_id
        ) AS latest_tests 
            ON d.id = latest_tests.device_id
        LEFT JOIN tests t 
            ON latest_tests.device_id = t.device_id AND latest_tests.max_timestamp = t.timestamp
        ORDER BY d.id ASC;
    `;

    try {
        const [devices] = await db.execute(sql);
        res.json(devices);

    } catch (error) {
        console.error("Erro ao listar dispositivos:", error);
        res.status(500).json({ message: "Erro interno do servidor ao buscar lista de dispositivos." });
    }
});


router.post('/:id/test', async (req, res) => {
    const deviceId = req.params.id;

    try {
        const [deviceResult] = await db.execute(
            'SELECT endereco_ip FROM devices WHERE id = ?',
            [deviceId]
        );

        if (deviceResult.length === 0) {
            return res.status(404).json({ message: "Dispositivo não encontrado." });
        }

        const ipAddress = deviceResult[0].endereco_ip;

        const pingResult = await ping.promise.probe(ipAddress, { timeout: 3 }); 

        let status;
        let latencia = null;

        if (pingResult.alive) {
            status = 'sucesso';
            latencia = parseFloat(pingResult.avg); 
        } else {
            status = 'falha';
        }

  
        const sqlInsert = `
            INSERT INTO tests (device_id, status, latencia)
            VALUES (?, ?, ?);
        `;
        await db.execute(sqlInsert, [deviceId, status, latencia]);

        res.json({
            status: status,
            latencia: latencia,
            message: `Teste concluído. Status: ${status}.`
        });

    } catch (error) {
        console.error(`Erro ao executar teste de PING para o dispositivo ${deviceId}:`, error);
        res.status(500).json({ message: "Erro interno do servidor ao processar o teste." });
    }
});


router.get('/:id/tests', async (req, res) => {
    const deviceId = req.params.id;

    const sql = `
        SELECT status, latencia, timestamp
        FROM tests
        WHERE device_id = ?
        ORDER BY timestamp DESC; 
    `;

    try {
        const [tests] = await db.execute(sql, [deviceId]);
        res.json(tests);

    } catch (error) {
        console.error(`Erro ao buscar histórico para o dispositivo ${deviceId}:`, error);
        res.status(500).json({ message: "Erro interno do servidor ao buscar o histórico de testes." });
    }
});

module.exports = router;