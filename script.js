let cardContainer = document.querySelector("main");
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
    cardContainer.classList.add('card-container');
    termosAtuais = dados.termos;
    renderizarNavCategorias();
    inicializarModoEscuro(); // Adiciona o toggle de tema
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


  const dropdownToggle = document.createElement('button');
  dropdownToggle.classList.add('dropdown-toggle');
  dropdownToggle.innerHTML = 'Categorias <span>&#9662;</span>';

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
      e.preventDefault();
      categoriaSelecionada = itemMenu.dataset.categoria;


      dropdownToggle.innerHTML = `${textoCategoria} <span>&#9662;</span>`;


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

function inicializarModoEscuro() {
  const header = document.querySelector('header');
  if (!header) return;

  const toggleContainer = document.createElement('div');
  toggleContainer.classList.add('theme-switch-container');
  toggleContainer.innerHTML = `
      <label class="theme-switch" for="theme-checkbox">
          <input type="checkbox" id="theme-checkbox" />
          <div class="slider round">
              <span class="icon sun-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span>
              <span class="icon moon-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>
          </div>
      </label>
  `;
  header.appendChild(toggleContainer);

  const themeCheckbox = document.getElementById('theme-checkbox');

  // Função para aplicar o tema
  const aplicarTema = (tema) => {
    if (tema === 'light') {
      document.body.classList.add('light-mode');
      themeCheckbox.checked = true;
    } else {
      document.body.classList.remove('light-mode');
      themeCheckbox.checked = false;
    }
  };

  // Verifica o tema salvo no localStorage
  const temaSalvo = localStorage.getItem('theme') || 'dark';
  aplicarTema(temaSalvo);

  // Adiciona o listener para a mudança
  themeCheckbox.addEventListener('change', () => {
    const novoTema = themeCheckbox.checked ? 'light' : 'dark';
    localStorage.setItem('theme', novoTema);
    aplicarTema(novoTema);
  });
}

// Adiciona um listener para o input de busca
inputBusca.addEventListener('input', iniciarBusca);

// Carrega os dados e renderiza os cards assim que a página carrega.
carregarDados();
