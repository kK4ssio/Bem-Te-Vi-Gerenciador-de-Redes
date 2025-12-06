// /web/script.js

const API_URL = 'http://localhost:3000'; 

// Elementos DOM
const listaDispositivos = document.getElementById('lista-dispositivos');
const formCadastro = document.getElementById('form-cadastro');
const feedbackCadastro = document.getElementById('feedback-cadastro');
const divPainel = document.getElementById('painel');
const divHistorico = document.getElementById('historico');
const historicoNomeDispositivo = document.getElementById('historico-nome-dispositivo');
const listaHistorico = document.getElementById('lista-historico');
const btnVoltarPainel = document.getElementById('voltar-painel');


// --- 1. FUNÇÃO DE CARREGAMENTO E RENDERIZAÇÃO ---
async function carregarDispositivos() {
    listaDispositivos.innerHTML = '<tr><td colspan="8">Carregando dispositivos...</td></tr>';
    
    try {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) throw new Error('Falha na resposta da API.');
        
        const devices = await response.json();
        
        listaDispositivos.innerHTML = '';
        
        if (devices.length === 0) {
            listaDispositivos.innerHTML = '<tr><td colspan="8">Nenhum dispositivo cadastrado.</td></tr>';
            return;
        }

        devices.forEach(device => {
            const row = criarLinhaDispositivo(device);
            listaDispositivos.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao carregar dispositivos:", error);
        listaDispositivos.innerHTML = `<tr><td colspan="8" class="status-falha">❌ Erro ao conectar à API. Verifique se o Back-end está rodando.</td></tr>`;
    }
}

function criarLinhaDispositivo(device) {
    const row = document.createElement('tr');
    
    const statusText = device.status ? device.status.toUpperCase() : 'N/A';
    const statusClass = device.status === 'sucesso' ? 'status-sucesso' : 'status-falha';
    
    const latencia = device.latencia ? `${device.latencia} ms` : '-';
    const ultimoTeste = device.timestamp ? new Date(device.timestamp).toLocaleString('pt-BR') : 'Nunca';
    
    row.innerHTML = `
        <td>${device.id}</td>
        <td>${device.nome}</td>
        <td>${device.endereco_ip}</td>
        <td>${device.tipo}</td>
        <td class="${statusClass}">${statusText}</td>
        <td>${latencia}</td>
        <td>${ultimoTeste}</td>
        <td>
            <button class="btn-teste" data-id="${device.id}">Testar Agora</button>
            <button class="btn-historico" data-id="${device.id}" data-nome="${device.nome}">Histórico</button>
        </td>
    `;
    
    const btnTeste = row.querySelector('.btn-teste');
    btnTeste.addEventListener('click', () => executarTeste(device.id));

    const btnHistorico = row.querySelector('.btn-historico');
    btnHistorico.addEventListener('click', () => exibirHistorico(device.id, device.nome));

    return row;
}

// --- 2. FUNCIONALIDADE DE CADASTRO ---
formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const novoDispositivo = {
        nome: document.getElementById('nome').value,
        endereco_ip: document.getElementById('endereco_ip').value,
        tipo: document.getElementById('tipo').value
    };

    try {
        const response = await fetch(`${API_URL}/devices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoDispositivo)
        });

        const data = await response.json();
        
        if (response.ok) {
            feedbackCadastro.className = 'status-sucesso';
            feedbackCadastro.textContent = `✅ ${data.message}`;
            formCadastro.reset(); 
            carregarDispositivos(); 
        } else {
            feedbackCadastro.className = 'status-falha';
            feedbackCadastro.textContent = `❌ Erro: ${data.message}`;
        }
    } catch (error) {
        feedbackCadastro.className = 'status-falha';
        feedbackCadastro.textContent = '❌ Erro de conexão com o servidor.';
        console.error('Erro de conexão:', error);
    }
});


// --- 3. FUNCIONALIDADE DE TESTE DE CONECTIVIDADE ---
async function executarTeste(deviceId) {
    const btn = document.querySelector(`.btn-teste[data-id="${deviceId}"]`);
    const originalText = btn.textContent;
    btn.textContent = 'Testando...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/devices/${deviceId}/test`, { method: 'POST' });
        const data = await response.json();

        if (response.ok) {
            carregarDispositivos(); 
            alert(`Teste realizado: ${data.status.toUpperCase()} (Latência: ${data.latencia} ms)`);
        } else {
            alert(`Falha no teste: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao executar teste:', error);
        alert('Erro de comunicação com o servidor ao executar o teste.');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}


// --- 4. FUNCIONALIDADE DE HISTÓRICO ---
async function exibirHistorico(deviceId, deviceNome) {
    divPainel.style.display = 'none';
    divHistorico.style.display = 'block';

    historicoNomeDispositivo.textContent = deviceNome;
    listaHistorico.innerHTML = '<tr><td colspan="3">Carregando histórico...</td></tr>';

    try {
        const response = await fetch(`${API_URL}/devices/${deviceId}/tests`);
        if (!response.ok) throw new Error('Erro ao buscar histórico.');
        
        const tests = await response.json();
        
        listaHistorico.innerHTML = '';

        if (tests.length === 0) {
            listaHistorico.innerHTML = '<tr><td colspan="3">Nenhum teste encontrado para este dispositivo.</td></tr>';
            return;
        }

        tests.forEach(test => {
            const row = document.createElement('tr');
            const statusClass = test.status === 'sucesso' ? 'status-sucesso' : 'status-falha';
            const latencia = test.latencia ? `${test.latencia} ms` : '-';
            const dataHora = new Date(test.timestamp).toLocaleString('pt-BR');
            
            row.innerHTML = `
                <td class="${statusClass}">${test.status.toUpperCase()}</td>
                <td>${latencia}</td>
                <td>${dataHora}</td>
            `;
            listaHistorico.appendChild(row);
        });

    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        listaHistorico.innerHTML = `<tr><td colspan="3" class="status-falha">Erro ao carregar histórico: ${error.message}</td></tr>`;
    }
}

// 5. Controle de Navegação
btnVoltarPainel.addEventListener('click', () => {
    divHistorico.style.display = 'none';
    divPainel.style.display = 'block';
});


// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', carregarDispositivos);