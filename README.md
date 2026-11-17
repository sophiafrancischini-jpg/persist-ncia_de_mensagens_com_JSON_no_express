# Sprint 04 — Persistência de Mensagens com JSON no Express

Projeto completo da atividade prática sobre serialização JSON, `node:fs/promises`, modularização com `store.js` e persistência em arquivo.

## 1. Requisitos

- Node.js instalado.
- Visual Studio Code.
- Terminal integrado do VS Code.

## 2. Como abrir e executar

1. Extraia a pasta `sprint04_meu_servidor` do arquivo ZIP.
2. No VS Code, clique em **Arquivo > Abrir Pasta** e selecione `sprint04_meu_servidor`.
3. Abra o terminal integrado em **Terminal > Novo Terminal**.
4. Instale a dependência Express:

```bash
npm install
```

5. Inicie o servidor:

```bash
npm start
```

O servidor ficará disponível em `http://localhost:3000`.

## 3. Rotas para testar

- `http://localhost:3000/` — apresenta as rotas disponíveis.
- `http://localhost:3000/mensagens` — lista as mensagens persistidas.
- `http://localhost:3000/exemplo-salvar` — grava uma mensagem de exemplo no arquivo `data/mensagens.json`.

A cada acesso a `/exemplo-salvar`, uma nova mensagem é adicionada ao arquivo.

### Testar o cadastro POST

Com o servidor ligado, envie uma requisição `POST` para `http://localhost:3000/mensagens`, com o corpo no formato JSON:

```json
{
  "usuario": "Sophia",
  "texto": "Minha mensagem foi salva!"
}
```

Você pode fazer isso usando uma extensão de requisições HTTP ou o Thunder Client no VS Code. Depois, abra `GET /mensagens` para conferir o registro.

## 4. Executar os exercícios

Abra outro terminal (mantenha o servidor ligado, se estiver testando as rotas).

### Módulo 1 — JSON.stringify e JSON.parse

```bash
npm run teste:json
```

O script `experimento-json.js` demonstra a serialização, a desserialização e o tratamento de JSON corrompido com `try/catch`.

### Módulo 2 — fs/promises

```bash
npm run teste:fs
```

O script `teste-fs.js` cria e grava `data/mensagens-teste.json`, lê os dados e testa o tratamento de arquivo inexistente (`ENOENT`).

### Módulo 3 — store.js e Express

O arquivo `store.js` exporta `lerMensagens()` e `salvarMensagens()`. O arquivo `server.js` importa essas funções e as utiliza nas rotas assíncronas.

## 5. Estrutura do projeto

```text
sprint04_meu_servidor/
├── data/
│   ├── mensagens.json
│   └── mensagens-teste.json
├── experimento-json.js
├── package.json
├── README.md
├── server.js
├── store.js
└── teste-fs.js
```

## 6. Prova de persistência

1. Inicie o servidor com `npm start`.
2. Acesse `http://localhost:3000/exemplo-salvar`.
3. Abra `data/mensagens.json` no VS Code e confira a mensagem gravada.
4. Pare o servidor com `Ctrl + C`.
5. Inicie novamente com `npm start`.
6. Acesse `http://localhost:3000/mensagens`.

A mensagem continua salva mesmo depois de reiniciar o servidor, pois os dados ficam no arquivo JSON, e não apenas na memória RAM.

## 7. Observação

O desafio final do material original está indicado como atividade a ser demonstrada em conjunto com o professor. Este projeto implementa e permite demonstrar a persistência descrita nos módulos anteriores e a prova de sobrevivência do servidor.
