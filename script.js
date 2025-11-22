let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("div input");
let dados = [];

function iniciarBusca() {
  const termoPesquisado = inputBusca.value.toLowerCase();
  if (!termoPesquisado) {
    renderizarCards(dados.termos);
    return;
  }

  const termosFiltrados = dados.termos.filter(termo => {
    return termo.termo.toLowerCase().includes(termoPesquisado) ||
      termo.definicao.toLowerCase().includes(termoPesquisado) ||
      termo.categoria.toLowerCase().includes(termoPesquisado);
  });

  renderizarCards(termosFiltrados);
}

function renderizarCards(termos) {
  cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
  for (let termo of termos) {
    let article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
      <h2>${termo.termo}</h2>
      <p><strong>Definição:</strong> ${termo.definicao}</p>
      <p><strong>Categoria:</strong> ${termo.categoria}</p>
      <p><strong>Classificação:</strong> ${termo.classificacao}</p>
      <p><strong>Sigla:</strong> ${termo.sigla}</p>
      <p><strong>Frequência de Uso:</strong> ${termo.frequencia_uso}</p>
      <p><strong>Referência:</strong> <a href="${termo.referencia.url}" target="_blank">${termo.referencia.texto}</a></p>
    `;
    cardContainer.appendChild(article);
  }
}

async function carregarDados() {
  try {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados.termos); // Exibe todos os termos inicialmente
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// Carrega os dados e renderiza os cards assim que a página carrega.
carregarDados();
