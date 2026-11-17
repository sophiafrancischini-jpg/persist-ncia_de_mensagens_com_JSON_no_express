// server.js — Servidor Express com persistência em arquivo JSON
import express from "express";
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();
const PORTA = 3000;

// Permite receber dados enviados no corpo de requisições em JSON.
app.use(express.json());

// Rota inicial para explicar como utilizar a API.
app.get("/", (req, res) => {
  res.json({
    projeto: "Sprint 04 — Persistência de Mensagens",
    rotas: {
      listar: "GET /mensagens",
      adicionarExemplo: "GET /exemplo-salvar",
      criarMensagem: "POST /mensagens"
    }
  });
});

// GET /mensagens — retorna as mensagens salvas no arquivo.
app.get("/mensagens", async (req, res) => {
  try {
    const mensagens = await lerMensagens();
    res.json(mensagens);
  } catch (erro) {
    console.error("Erro ao ler mensagens:", erro);
    res.status(500).json({ erro: "Erro na leitura das mensagens." });
  }
});

// GET /exemplo-salvar — rota didática solicitada na atividade.
app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();

    lista.push({
      id: Date.now(),
      usuario: "Aluno",
      texto: "Mensagem gravada no disco!"
    });

    await salvarMensagens(lista);
    res.json({ gravado: true, total: lista.length });
  } catch (erro) {
    console.error("Falha ao gravar mensagem:", erro);
    res.status(500).json({ erro: "Falha ao gravar." });
  }
});

// POST /mensagens — permite cadastrar uma mensagem enviada pelo usuário.
app.post("/mensagens", async (req, res) => {
  try {
    const { usuario, texto } = req.body;

    if (
      typeof usuario !== "string" || !usuario.trim() ||
      typeof texto !== "string" || !texto.trim()
    ) {
      return res.status(400).json({
        erro: "Informe usuario e texto como strings não vazias."
      });
    }

    const lista = await lerMensagens();
    const novaMensagem = {
      id: Date.now(),
      usuario: usuario.trim(),
      texto: texto.trim()
    };

    lista.push(novaMensagem);
    await salvarMensagens(lista);

    res.status(201).json({
      mensagem: "Mensagem cadastrada com sucesso!",
      dados: novaMensagem
    });
  } catch (erro) {
    console.error("Erro ao cadastrar mensagem:", erro);
    res.status(500).json({ erro: "Erro ao salvar a mensagem." });
  }
});

// Tratamento de JSON inválido enviado em uma requisição.
app.use((erro, req, res, next) => {
  if (erro instanceof SyntaxError && erro.status === 400 && "body" in erro) {
    return res.status(400).json({ erro: "O JSON enviado é inválido." });
  }
  next(erro);
});

app.listen(PORTA, () => {
  console.log(`Servidor iniciado em http://localhost:${PORTA}`);
});

