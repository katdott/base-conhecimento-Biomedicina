let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("div input");
let dados = [];
let termosAtuais = []; // Lista de termos a ser exibida (pode ser a completa ou a filtrada)

let categoriaSelecionada = 'todas'; // 'todas' ou o nome da categoria
let paginaAtual = 1;
const itensPorPagina = 9; // Defina quantos cards você quer por página

function iniciarBusca() {
  const termoPesquisado = inputBusca.value.toLowerCase();
  paginaAtual = 1; // Reinicia para a primeira página a cada nova busca

  // 1. Filtra por categoria primeiro
  let termosFiltradosPorCategoria = [];
  if (categoriaSelecionada === 'todas') {
    termosFiltradosPorCategoria = dados.termos;
  } else {
    termosFiltradosPorCategoria = dados.termos.filter(termo => termo.categoria === categoriaSelecionada);
  }

  // 2. Filtra pelo texto da busca
  termosAtuais = termosFiltradosPorCategoria.filter(termo => {
    return termo.termo.toLowerCase().includes(termoPesquisado) ||
      termo.definicao.toLowerCase().includes(termoPesquisado) ||
      termo.categoria.toLowerCase().includes(termoPesquisado);
  });

  exibirPagina();
}

function exibirPagina() {
  cardContainer.innerHTML = ""; // Limpa o container de cards

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const termosDaPagina = termosAtuais.slice(indiceInicial, indiceFinal);

  renderizarCards(termosDaPagina);
  renderizarPaginacao();
}

function renderizarCards(termos) {
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

function renderizarPaginacao() {
  let paginacaoContainer = document.querySelector(".paginacao-container");
  if (!paginacaoContainer) {
    paginacaoContainer = document.createElement("div");
    paginacaoContainer.classList.add("paginacao-container");
    cardContainer.insertAdjacentElement("afterend", paginacaoContainer);
  }
  paginacaoContainer.innerHTML = "";

  const totalPaginas = Math.ceil(termosAtuais.length / itensPorPagina);

  if (totalPaginas <= 1) return; // Não mostra a paginação se tiver 1 página ou menos

  // Botão Anterior
  if (paginaAtual > 1) {
    paginacaoContainer.appendChild(criarBotaoPaginacao('Anterior', paginaAtual - 1));
  }

  // Botões de Página
  for (let i = 1; i <= totalPaginas; i++) {
    const botao = criarBotaoPaginacao(i, i);
    if (i === paginaAtual) {
      botao.classList.add('active');
    }
    paginacaoContainer.appendChild(botao);
  }

  // Botão Próximo
  if (paginaAtual < totalPaginas) {
    paginacaoContainer.appendChild(criarBotaoPaginacao('Próximo', paginaAtual + 1));
  }
}

function criarBotaoPaginacao(texto, numeroPagina) {
  const botao = document.createElement('button');
  botao.textContent = texto;
  botao.addEventListener('click', () => {
    paginaAtual = numeroPagina;
    exibirPagina();
    window.scrollTo(0, 0); // Rola para o topo da página
  });
  return botao;
}

async function carregarDados() {
  try {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    termosAtuais = dados.termos;
    renderizarNavCategorias();
    exibirPagina(); // Exibe a primeira página dos termos inicialmente
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

function renderizarNavCategorias() {
  const header = document.querySelector('header');
  if (!header) return;

  // Contêiner principal para o dropdown
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');

  // Botão que aciona o dropdown
  const dropdownToggle = document.createElement('button');
  dropdownToggle.classList.add('dropdown-toggle');
  dropdownToggle.innerHTML = 'Categorias <span>&#9662;</span>'; // Adiciona uma seta para baixo

  // Menu com os itens
  const dropdownMenu = document.createElement('div');
  dropdownMenu.classList.add('dropdown-menu');

  const categoriasUnicas = ['todas', ...new Set(dados.termos.map(termo => termo.categoria))];

  categoriasUnicas.forEach(categoria => {
    const itemMenu = document.createElement('a');
    itemMenu.href = '#';
    const textoCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    itemMenu.textContent = textoCategoria;
    itemMenu.dataset.categoria = categoria;

    if (categoria === 'todas') {
      itemMenu.classList.add('active'); // Item "Todas" começa ativo
    }

    itemMenu.addEventListener('click', (e) => {
      e.preventDefault(); // Previne o comportamento padrão do link
      categoriaSelecionada = itemMenu.dataset.categoria;

      // Atualiza o texto do botão principal
      dropdownToggle.innerHTML = `${textoCategoria} <span>&#9662;</span>`;

      // Atualiza a classe 'active' nos itens do menu
      document.querySelectorAll('.dropdown-menu a').forEach(link => link.classList.remove('active'));
      itemMenu.classList.add('active');

      iniciarBusca();
    });
    dropdownMenu.appendChild(itemMenu);
  });

  dropdownContainer.appendChild(dropdownToggle);
  dropdownContainer.appendChild(dropdownMenu);
  header.insertAdjacentElement('afterend', dropdownContainer);
}

// Adiciona um listener para o input de busca
inputBusca.addEventListener('input', iniciarBusca);

// Carrega os dados e renderiza os cards assim que a página carrega.
carregarDados();
