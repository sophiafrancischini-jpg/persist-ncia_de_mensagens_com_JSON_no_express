// Módulo 1 — Exercícios 1.1 e 1.2
// Serialização, desserialização e tratamento de JSON inválido.

// Exercício 1.1: serializando objetos com JSON.stringify.
const historicoMensagens = [
  { id: 1, usuario: "Ana", texto: "Bom dia, turma!" },
  { id: 2, usuario: "Pedro", texto: "Servidor online!" }
];

const conteudoSalvar = JSON.stringify(historicoMensagens, null, 2);

console.log("=== Exercício 1.1 ===");
console.log(conteudoSalvar);
console.log("Tipo da variável:", typeof conteudoSalvar);

// Exercício 1.2: desserializando um JSON válido.
console.log("\\n=== Exercício 1.2 ===");

const jsonValido = '[{"id": 10, "usuario": "Lucas", "texto": "Teste"}]';
const objetoRecuperado = JSON.parse(jsonValido);

console.log("Texto da primeira mensagem:", objetoRecuperado[0].texto);

// Simulando um JSON corrompido e tratando o erro.
const jsonQuebrado = '[{ id: 10, quebrado: sim ';

try {
  JSON.parse(jsonQuebrado);
} catch (erro) {
  console.error("Alerta: JSON corrompido! Detalhes:", erro.message);
}
