// js/fetcher.js - MÓDULO DE EXTRAÇÃO EM CASCATA (SEM TRAVAS DE NAVEGADOR)

const LISTA_PROXIES = [
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${url}`
];

async function baixarECarregarCascata(urlOriginal) {
  // 1. Tenta baixar direto primeiro
  try {
    const res = await fetch(urlOriginal);
    if (res.ok) return await res.text();
  } catch (e) {
    console.log("Navegador barrou acesso direto. Iniciando modo Cascata...");
  }

  // 2. Percorre a lista de Proxies do Gemini um por um até um funcionar
  for (const criarProxy of LISTA_PROXIES) {
    try {
      const urlProxy = criarProxy(urlOriginal);
      const res = await fetch(urlProxy);
      if (res.ok) {
        console.log("Sucesso via proxy!");
        return await res.text(); // Retorna o código limpo
      }
    } catch (err) {
      console.warn("Proxy falhou, tentando o próximo da cascata...");
    }
  }

  throw new Error("Não foi possível extrair o arquivo de nenhuma das fontes.");
}
