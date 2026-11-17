// store.js — Camada de armazenamento e persistência das mensagens
import { mkdir, readFile, writeFile } from "node:fs/promises";

const PASTA_DADOS = new URL("./data/", import.meta.url);
const ARQUIVO = new URL("./data/mensagens.json", import.meta.url);

// Lê as mensagens salvas no arquivo JSON.
export async function lerMensagens() {
  try {
    const conteudo = await readFile(ARQUIVO, "utf8");
    const mensagens = JSON.parse(conteudo);

    // Garante que o conteúdo do arquivo seja um array.
    if (!Array.isArray(mensagens)) {
      throw new Error("O arquivo mensagens.json precisa conter um array.");
    }

    return mensagens;
  } catch (erro) {
    // Se o arquivo ainda não existir, a aplicação começa com uma lista vazia.
    if (erro.code === "ENOENT") {
      return [];
    }

    // Outros erros, como JSON corrompido, são repassados.
    throw erro;
  }
}

// Salva todas as mensagens no arquivo JSON.
export async function salvarMensagens(mensagens) {
  if (!Array.isArray(mensagens)) {
    throw new TypeError("As mensagens precisam ser enviadas em formato de array.");
  }

  await mkdir(PASTA_DADOS, { recursive: true });
  await writeFile(ARQUIVO, JSON.stringify(mensagens, null, 2), "utf8");
}
