// Módulo 2 — Exercícios 2.1 e 2.2
// Criando, gravando e lendo arquivos com node:fs/promises.

import { mkdir, writeFile, readFile } from "node:fs/promises";

async function salvarHistorico() {
  const lista = [
    { id: 1, usuario: "Mariana", texto: "Primeira mensagem salva!" },
    { id: 2, usuario: "Rafael", texto: "Aprendendo persistência com JSON." }
  ];

  await mkdir(new URL("./data/", import.meta.url), { recursive: true });

  const caminhoArquivo = new URL("./data/mensagens-teste.json", import.meta.url);

  await writeFile(
    caminhoArquivo,
    JSON.stringify(lista, null, 2),
    "utf8"
  );

  console.log("Arquivo mensagens-teste.json criado com sucesso!");
}

// Exercício 2.2: leitura segura e tratamento de arquivo ausente (ENOENT).
async function lerDadosSeguros(nomeArquivo) {
  try {
    const conteudo = await readFile(nomeArquivo, "utf8");
    return JSON.parse(conteudo);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return [];
    }
    throw erro;
  }
}

async function executarTestes() {
  await salvarHistorico();

  const caminhoExistente = new URL("./data/mensagens-teste.json", import.meta.url);
  const mensagens = await lerDadosSeguros(caminhoExistente);
  console.log("Mensagens lidas do arquivo:", mensagens);

  const caminhoInexistente = new URL("./data/arquivo-fantasma.json", import.meta.url);
  const dados = await lerDadosSeguros(caminhoInexistente);
  console.log("Resultado com arquivo ausente:", dados);
}

executarTestes().catch((erro) => {
  console.error("Erro ao executar os testes:", erro);
});
