# 📚 Catálogo de Livros

## 📖 Sobre o Projeto

O **Catálogo de Livros** é uma aplicação web desenvolvida para facilitar o gerenciamento, organização e controle de acervos bibliográficos. O sistema permite cadastrar novos títulos, editar informações existentes, remover registros obsoletos e realizar consultas dinâmicas em tempo real, além de fornecer identificação visual imediata sobre o estado de cada exemplar.

O projeto foi construído com foco em boas práticas de componentização e reatividade, utilizando a **Composition API** do Vue.js 3 com a sintaxe `<script setup>`, proporcionando uma estrutura de código limpa, modular e de alto desempenho sobre o ferramental do Vite.

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3:** Framework progressivo para construção de interfaces de usuário reativas.
- **Vite:** Ferramenta de build e servidor de desenvolvimento de alta performance.
- **JavaScript (ES6+):** Linguagem utilizada na implementação da lógica e manipulação de estados.
- **Composition API (`<script setup>`):** Paradigma moderno de organização e reutilização de lógica no Vue 3.
- **CSS3:** Estilização componentizada com suporte a layouts modernos e responsivos.

---

## ✨ Funcionalidades

- **Cadastro de Livros:** Formulário dedicado para inserção de títulos com campos para título, autor, categoria e status inicial.
- **Busca em Tempo Real:** Filtragem dinâmica que pesquisa simultaneamente por título e nome do autor à medida que o usuário digita.
- **Edição em Linha:** Alteração direta das propriedades do livro (dados e disponibilidade) sem recarregar a interface.
- **Exclusão com Confirmação:** Remoção segura de registros com solicitação de confirmação para evitar perdas acidentais.
- **Indicadores Visuais de Status:** Identificação por tags coloridas para monitoramento rápido:
  - `Disponível` (Verde)
  - `Emprestado` (Vermelho)
  - `Reservado` (Amarelo)

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu ambiente:

- **Node.js:** Versão 18.x ou superior recomendada.
- **npm:** Gerenciador de pacotes do ecossistema Node.js.

Para verificar se as ferramentas estão instaladas, execute no terminal:

```bash
node -v
npm -v
```

---

## 📖 Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/joaodanilaitsbrito/catalogo-vue.git
```

2. **Acesse a pasta do projeto:**

```bash
cd catalogo-vue
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

5. **Acesse a aplicação no navegador:**

Abra o endereço gerado pelo Vite no terminal, geralmente:

```
http://localhost:5173
```

---

## 📖 Estrutura de Componentes

A interface foi estruturada de forma modular, delegando responsabilidades específicas para cada componente:

```
src/
├── components/
│   ├── AddForm.vue       # Formulário para inclusão de novos livros
│   ├── Card.vue          # Cartão com exibição, edição e exclusão de cada exemplar
│   └── SearchBar.vue     # Campo de busca e filtragem reativa
│
├── App.vue               # Componente central, estado global e regras de negócio
├── main.js               # Ponto de inicialização da aplicação Vue
└── style.css              # Folha de estilos globais
```

### Detalhamento dos Componentes

- **App.vue:** Concentra o estado principal da aplicação (array de livros e termo de pesquisa), além das funções de manipulação (adicionar, editar, excluir).

- **AddForm.vue:** Formulário controlado que coleta os dados do novo livro e dispara um evento com o novo objeto para inclusão.

- **Card.vue:** Apresenta os detalhes do livro, gerencia o estado interno de edição em linha e solicita exclusões via emissão de eventos.

- **SearchBar.vue:** Input de busca controlado que emite atualizações para sincronizar o filtro no componente pai.

---

## ⚡ Gerenciamento de Estado

O gerenciamento de dados utiliza a reatividade nativa da Composition API por meio de `ref` e propriedades computadas com `computed`.

A lista de livros e o termo de pesquisa são definidos como variáveis reativas:

```javascript
import { ref, computed } from 'vue'

const busca = ref('')

const livros = ref([
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Romance',
    status: 'Disponível'
  },
  {
    id: 2,
    titulo: 'O Hobbit',
    autor: 'J.R.R. Tolkien',
    categoria: 'Fantasia',
    status: 'Emprestado'
  }
])
```

A filtragem dos registros exibidos é realizada de maneira reativa:

```javascript
const livrosFiltrados = computed(() => {
  const termo = busca.value.toLowerCase().trim()
  if (!termo) return livros.value

  return livros.value.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)
  )
})
```

---

## 📖 Props e Eventos

A troca de informações entre componentes segue o fluxo unidirecional de dados (_props down, events up_).

- **Envio de dados do pai para o filho via Props:**

```vue
<Card
  v-for="livro in livrosFiltrados"
  :key="livro.id"
  :livro="livro"
/>
```

- **Notificação do filho para o pai via Emissão de Eventos (emit):**

```vue
<AddForm @add-livro="adicionarLivro" />
<SearchBar @update:busca="busca = $event" />
<Card
  @updatelivro="atualizarLivro"
  @delete-livro="excluirLivro"
/>
```

---

## 📖 Interface

O design foi estruturado para fornecer uma experiência de uso intuitiva e visualmente equilibrada:

- Disposição em **CSS Grid** e **Flexbox** para adaptação automática a diferentes resoluções.
- Cards informativos com contraste visual bem definido.
- Feedback imediato de preenchimento e busca sem travamentos na interface.

---

## 📖 Desafios e Aprendizados

Durante o ciclo de desenvolvimento do projeto, foram consolidados os seguintes conhecimentos:

- Configuração de ambiente moderno de desenvolvimento front-end com **Vite** e **Vue 3**.
- Aplicação prática da **Composition API** utilizando a sintaxe simplificada `<script setup>`.
- Separação da interface em componentes reutilizáveis e desacoplados.
- Domínio do fluxo de dados através de **Props** e **Custom Events**.
- Utilização de **Computed Properties** para filtros dinâmicos de alta performance.
- Práticas de versionamento de código com **Git** e hospedagem no **GitHub**.

---

## 🎓 Conclusão

O projeto consolida os fundamentos essenciais do ecossistema Vue.js aplicados ao desenvolvimento front-end. A aplicação demonstra com clareza o ciclo de vida dos dados em um ambiente reativo, oferecendo operações completas de manipulação de dados na interface, comunicação sólida entre componentes e uma experiência de uso fluida.

---

## 📖 Autor

Desenvolvido por **João Pedro Danilaits Carvalho Brito** para a disciplina de **Web 2**.

- **GitHub:** [@joaodanilaitsbrito](https://github.com/joaodanilaitsbrito)
- **Repositório do Projeto:** [catalogo-vue](https://github.com/joaodanilaitsbrito/catalogo-vue)