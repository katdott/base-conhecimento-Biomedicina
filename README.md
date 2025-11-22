# Base de Conhecimento - Glossário de Biomedicina

Este é um projeto de front-end que cria uma base de conhecimento interativa para termos de biomedicina, desenvolvido durante a **Imersão Dev da Alura com o Google**. Funciona como um glossário dinâmico, permitindo que os usuários pesquisem, filtrem e explorem uma vasta lista de termos técnicos de forma fácil e intuitiva.

## ✨ Funcionalidades

- **Busca Dinâmica**: Filtra os termos em tempo real conforme o usuário digita no campo de busca.
- **Layout em Cards**: Cada termo é apresentado em um card individual, com um design limpo e moderno, facilitando a leitura.
- **Filtro por Categoria**: Um menu suspenso permite filtrar os termos por categoria (ex: Biologia Molecular, Imunologia, Hematologia).
- **Paginação**: Navegue facilmente por várias páginas de resultados quando a lista de termos é longa.
- **Tema Claro/Escuro (Dark/Light Mode)**: Um botão de alternância com ícones de sol/lua permite ao usuário escolher o tema visual. A preferência é salva no navegador para visitas futuras.
- **Design Responsivo**: A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
- **Dados Carregados de JSON**: Os termos são carregados dinamicamente a partir de um arquivo `data.json`, o que facilita a manutenção e a expansão do glossário sem a necessidade de alterar o código HTML.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Para a estrutura semântica do conteúdo.
- **CSS3**: Para estilização, utilizando recursos modernos como:
  - Variáveis CSS para fácil gerenciamento de temas.
  - Flexbox e Grid Layout para um layout responsivo e alinhado.
  - Media Queries para adaptar a interface a diferentes dispositivos.
- **JavaScript (ES6+)**: Para toda a interatividade e manipulação do DOM, incluindo:
  - Busca e filtragem de dados.
  - Renderização dinâmica dos cards e da paginação.
  - Criação do menu de categorias e do botão de tema.
  - Gerenciamento do estado do tema (claro/escuro) com `localStorage`.

## 📂 Estrutura do Projeto

```
./
├── 📄 index.html         # Arquivo principal da estrutura HTML
├── 🎨 style.css          # Folha de estilos principal
├── ⚙️ script.js          # Lógica de interatividade e manipulação de dados
├── 📦 data.json          # Arquivo com a lista de termos biomédicos
└── 🖼️ src/
    └── img/
        └── bg_biomed.png  # Imagem de fundo
```

- **`index.html`**: Contém a estrutura base da página, incluindo o cabeçalho, a área de busca e o contêiner principal onde os cards são inseridos.
- **`style.css`**: Responsável por toda a aparência visual do projeto. Inclui os estilos para os modos claro e escuro, o layout dos cards, a responsividade e as animações.
- **`script.js`**: O cérebro da aplicação. Ele carrega os dados do `data.json`, gerencia a busca, a filtragem por categoria, a paginação e a lógica do modo claro/escuro.
- **`data.json`**: Armazena os dados do glossário em um formato estruturado, permitindo que o conteúdo seja facilmente atualizado.

## 🏁 Como Executar Localmente

Como este é um projeto de front-end puro, não há necessidade de um servidor complexo ou de instalação de dependências.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd seu-repositorio
    ```
3.  **Abra o arquivo `index.html`** no seu navegador de preferência.

E pronto! A aplicação estará funcionando.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT.

---

*Feito por Agatha Katherine*
