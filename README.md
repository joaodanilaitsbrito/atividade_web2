# 📚 Catálogo de Livros

## 📖 Sobre o Projeto

O **Catálogo de Livros** é uma aplicação web para gerenciamento de acervos bibliográficos, com um painel de estatísticas, cadastro de novos títulos, edição em linha, exclusão com confirmação e busca em tempo real por título, autor ou categoria.

O projeto foi construído com a **Composition API** do Vue.js 3 (`<script setup>`) sobre o Vite, seguindo um layout em duas colunas: uma barra lateral fixa para cadastro e uma área principal com indicadores, busca e a grade de livros. Os dados do acervo são persistidos no **localStorage** do navegador, então o catálogo permanece salvo entre sessões.

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3:** Framework progressivo para construção de interfaces de usuário reativas.
- **Vite:** Ferramenta de build e servidor de desenvolvimento de alta performance.
- **JavaScript (ES6+):** Linguagem utilizada na implementação da lógica e manipulação de estados.
- **Composition API (`<script setup>`):** Paradigma moderno de organização e reutilização de lógica no Vue 3.
- **Web Storage API (`localStorage`):** Persistência do catálogo entre sessões, sem necessidade de backend.
- **CSS3:** Grid e Flexbox para um layout responsivo, com transições animadas na listagem.

---

## ✨ Funcionalidades

- **Painel de Estatísticas:** Cartões no topo mostram o total de exemplares e a contagem por status (Disponíveis, Emprestados, Reservados), atualizados automaticamente conforme o acervo muda.
- **Cadastro de Livros:** Formulário na barra lateral para inserção de título, autor, categoria, quantidade de exemplares, status inicial e URL de capa (opcional).
- **Capas com Fallback:** Quando nenhuma URL de capa é informada, uma capa placeholder é gerada automaticamente com uma cor associada à categoria do livro.
- **Busca em Tempo Real:** Filtragem dinâmica que pesquisa simultaneamente por título, autor e categoria à medida que o usuário digita, com contador de resultados.
- **Edição em Linha:** Alteração direta dos dados do livro (título, autor, categoria, quantidade, status e capa) sem sair do card nem recarregar a página.
- **Exclusão com Confirmação:** Remoção segura de registros com `confirm()` do navegador para evitar exclusões acidentais.
- **Persistência Local:** O catálogo é salvo automaticamente no `localStorage` a cada alteração, via `watch` reativo.
- **Animações de Lista:** Uso de `TransitionGroup` para animar a entrada e saída de cards ao adicionar, filtrar ou remover livros.
- **Indicadores Visuais de Status:** Identificação por tags coloridas:
  - `Disponível` (Verde)
  - `Emprestado` (Vermelho)
  - `Reservado` (Amarelo)
- **Layout Responsivo:** A barra lateral e a grade de cards se reorganizam automaticamente em telas menores.

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
git clone https://github.com/joaodanilaitsbrito/atividade_web2.git
```

2. **Acesse a pasta do projeto:**

```bash
cd atividade_web2
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

```
src/
├── assets/
│   ├── hero.png
│   ├── vite.svg
│   └── vue.svg
│
├── components/
│   ├── AddForm.vue       # Formulário de cadastro exibido na barra lateral
│   ├── Card.vue          # Card do livro: exibição, edição em linha e exclusão
│   ├── Header.vue        # Cabeçalho fixo com marca e navegação
│   ├── SearchBar.vue     # Formulário de busca/cadastro reutilizável
│   └── Stats.vue         # Cartões de estatísticas do acervo
│
├── App.vue               # Componente central, estado global e regras de negócio
├── main.js               # Ponto de inicialização da aplicação Vue
└── style.css              # Estilos globais e fonte importada
```

> **Nota:** `Header.vue`, `Stats.vue` e `SearchBar.vue` existem como componentes isolados e reutilizáveis, mas atualmente o `App.vue` implementa o cabeçalho, o painel de estatísticas e o cadastro diretamente em seu próprio template/estilo — eles ficam disponíveis para uma futura extração dessa lógica.

### Detalhamento dos Componentes

- **App.vue:** Concentra o estado principal da aplicação (lista de livros e termo de busca), calcula as estatísticas e os resultados filtrados via `computed`, define as funções de manipulação (`addItem`, `updateItem`, `deleteItem`) e sincroniza o acervo com o `localStorage`.

- **AddForm.vue:** Formulário controlado que coleta título, autor, categoria, quantidade, status e capa do novo livro, e emite o evento `add` com o objeto pronto para inclusão.

- **Card.vue:** Apresenta a capa (com fallback gerado por categoria), os detalhes do livro e a badge de status; alterna entre modo de exibição e edição em linha; emite `update` ao salvar e `delete` (com confirmação) ao remover.

- **Header.vue:** Cabeçalho fixo com a marca do sistema e links de navegação (componente independente, não conectado ao `App.vue` no momento).

- **Stats.vue:** Recebe totais via props e renderiza os cartões de estatística (componente independente, não conectado ao `App.vue` no momento).

- **SearchBar.vue:** Versão alternativa de formulário de cadastro/busca (componente independente, não conectado ao `App.vue` no momento).

---

## ⚡ Gerenciamento de Estado

O gerenciamento de dados utiliza a reatividade nativa da Composition API por meio de `ref`, `computed` e `watch`, com persistência automática no `localStorage`.

A lista de livros é inicializada a partir do que já estiver salvo no navegador, com um catálogo padrão como fallback:

```javascript
import { ref, computed, watch } from 'vue'

const defaultItems = [
  { id: 1, title: 'O Senhor dos Anéis', category: 'Fantasia', author: 'J.R.R. Tolkien', status: 'Disponível', cover: '', quantity: 1 },
  { id: 2, title: '1984', category: 'Distopia', author: 'George Orwell', status: 'Emprestado', cover: '', quantity: 2 },
  // ...
]

const saved = localStorage.getItem('catalogo-livros-sidebar')
const items = ref(saved ? JSON.parse(saved) : defaultItems)

const searchTerm = ref('')
```

As estatísticas do acervo são derivadas automaticamente da lista de livros:

```javascript
const stats = computed(() => {
  const total = items.value.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  return {
    total,
    disponivel: items.value.filter(i => i.status === 'Disponível').length,
    emprestado: items.value.filter(i => i.status === 'Emprestado').length,
    reservado: items.value.filter(i => i.status === 'Reservado').length
  }
})
```

A filtragem dos registros exibidos considera título, autor e categoria:

```javascript
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return items.value
  return items.value.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.author.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  )
})
```

Toda alteração no acervo é persistida automaticamente:

```javascript
watch(items, (newItems) => {
  localStorage.setItem('catalogo-livros-sidebar', JSON.stringify(newItems))
}, { deep: true })
```

---

## 📖 Props e Eventos

A troca de informações entre componentes segue o fluxo unidirecional de dados (_props down, events up_).

- **Envio de dados do pai para o filho via Props:**

```vue
<AddForm @add="addItem" :status-options="statusOptions" />

<Card
  v-for="item in filteredItems"
  :key="item.id"
  :item="item"
  :status-options="statusOptions"
  @update="updateItem"
  @delete="deleteItem"
/>
```

- **Notificação do filho para o pai via Emissão de Eventos (emit):**

```javascript
// AddForm.vue
const emit = defineEmits(['add'])
emit('add', { ...form, quantity: Number(form.quantity) || 1 })

// Card.vue
const emit = defineEmits(['update', 'delete'])
emit('update', { ...editForm, quantity: Number(editForm.quantity) || 1 })
emit('delete', props.item.id)
```

---

## 📖 Interface

O design foi estruturado para fornecer uma experiência de uso intuitiva e visualmente equilibrada:

- Layout em **CSS Grid** de duas colunas (barra lateral fixa + conteúdo principal), que colapsa em coluna única em telas menores.
- Painel de estatísticas com cartões que destacam contagens por status através de cores.
- Cards de livro com **capa em destaque**, badge de status e ações de editar/excluir sempre visíveis.
- Transições suaves (`TransitionGroup`) ao adicionar, filtrar ou remover itens da grade.
- Estado vazio dedicado quando a busca não retorna nenhum resultado.

---

## 📖 Desafios e Aprendizados

Durante o ciclo de desenvolvimento do projeto, foram consolidados os seguintes conhecimentos:

- Configuração de ambiente moderno de desenvolvimento front-end com **Vite** e **Vue 3**.
- Aplicação prática da **Composition API** utilizando a sintaxe simplificada `<script setup>`.
- Persistência de estado no navegador com `localStorage` combinada a `watch` reativo.
- Separação da interface em componentes reutilizáveis e desacoplados.
- Domínio do fluxo de dados através de **Props** e **Custom Events**.
- Utilização de **Computed Properties** para estatísticas e filtros dinâmicos de alta performance.
- Uso de `TransitionGroup` para animações de entrada/saída em listas reativas.
- Práticas de versionamento de código com **Git** e hospedagem no **GitHub**.

---

## 🎓 Conclusão

O projeto consolida os fundamentos essenciais do ecossistema Vue.js aplicados ao desenvolvimento front-end, evoluindo a versão anterior com um painel de estatísticas, persistência local de dados e uma interface em duas colunas. A aplicação demonstra com clareza o ciclo de vida dos dados em um ambiente reativo, oferecendo operações completas de manipulação de dados na interface, comunicação sólida entre componentes e uma experiência de uso fluida.

---

## 📖 Autor

Desenvolvido por **João Pedro Danilaits Carvalho Brito** para a disciplina de **Web 2**.

- **GitHub:** [@joaodanilaitsbrito](https://github.com/joaodanilaitsbrito)
- **Repositório do Projeto:** [atividade_web2](https://github.com/joaodanilaitsbrito/atividade_web2)
