## PROJETO - Gerenciador de Redes e Dispositivos

**Nome do Projeto**: Bem-Te-Vi! | Gerenciador de Redes e Dispositivos.

O objetivo do projeto é facilitar o **inventário de dispositivos** e o **monitoramento de status de rede**  por meio de uma interface visualmente funcional e limpa, eliminando a necessidade de usar o terminal para testes de conectividade.

**Responsáveis**:

<img src="https://avatars.githubusercontent.com/u/136630828?s=400&u=8c948ac77f850401ff504ae86cdaff67c3785828&v=4" width="75px"/>

[Kassio Monteiro](<https://github.com/kK4ssio>) - Front-End, Back-End, Banco.

<img src="https://avatars.githubusercontent.com/u/136630209?v=4" width="75px"/>

[Diogo Dilly](<https://github.com/DiogoDilly>) - Pré-Projeto, Relatório, Diagrama.

***

# **Levantamento de Requisitos**

### **1. Introdução**

### **1.1. Objetivo e Escopo**

O sistema "Bem-Te-vi!" tem como finalidade facilitar a execução de **testes de conectividade** e a **geração de relatórios de rede**.O projeto torna mais simples o inventário de dispositivos e monitoramento de status de rede , exibindo as informações de forma visualmente compreensível.

O sistema permite gerenciar:
* Cadastro, alteração e remoção de dispositivos registrados na rede (Inventário).
* Verificação do status de rede e monitoramento em tempo real.

### **2. Requisitos Funcionais**

### **2.1. Cadastro e Gerenciamento de Dispositivos**
* O sistema deve permitir o **cadastro de dispositivos**.
* O sistema deve prover ferramentas capazes de **inventariar, alterar e remover dispositivos**.
* O sistema deve exibir o **status de rede** (conectividade) do dispositivo.

### **2.2. Monitoramento de Conectividade e LOGS**
* O sistema deve permitir a realização de **testes de conectividade via PING**.
* O sistema deve **armazenar LOGS** de testes.
* O sistema deve permitir a **listagem de status de rede** e a consulta via web.

### **3. Requisitos Não Funcionais**

### **3.1. Usabilidade e Interface**
* O sistema deve possuir uma **interface simples e intuitiva**, com o objetivo de oferecer melhor legibilidade e compreensão das informações exibidas.

### **3.2. Metodologia**
* O projeto utiliza **HTML e CSS para o Front-end** e **JAVASCRIPT para o Back-end**.
* O sistema utiliza **Banco de Dados MySQL**.

***

## Tecnologias Utilizadas

* O projeto utiliza uma estrutura-base simples e minimalista, sendo baseado em Node.js para o back-end e MySQL para persistência de dados.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![HTML5](https://imgshields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Editores utilizados

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-F29111?style=for-the-badge&logo=mysql&logoColor=white)

***

# **Guia de Execução (Windows)**

Este guia detalha os passos para configurar e rodar a aplicação no ambiente Windows.

### **Pré-requisitos**

1.  **Node.js e npm:** Necessário para rodar o servidor Back-end.
2.  **MySQL Server:** Necessário para o banco de dados.
3.  **MySQL Workbench:** Ferramenta recomendada para gerenciar o banco.

### **Passos para Instalação e Execução**

### **1. Clonagem do Repositório**

Abra seu terminal (CMD ou PowerShell) e clone o projeto:

```bash
git clone https://github.com/kK4ssio/Bem-Te-Vi-Gerenciador-de-Redes.git
cd Bem-Te-Vi-Gerenciador-de-Redes


