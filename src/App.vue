<script setup>
import { ref, computed, watch } from 'vue'
import AddForm from './components/AddForm.vue'
import Card from './components/Card.vue'

const defaultItems = [
  { id: 1, title: 'O Senhor dos Anéis', category: 'Fantasia', author: 'J.R.R. Tolkien', status: 'Disponível', cover: '', quantity: 1 },
  { id: 2, title: '1984', category: 'Distopia', author: 'George Orwell', status: 'Emprestado', cover: '', quantity: 2 },
  { id: 3, title: 'Dom Casmurro', category: 'Romance', author: 'Machado de Assis', status: 'Disponível', cover: '', quantity: 1 },
  { id: 4, title: 'Clean Code', category: 'Tecnologia', author: 'Robert C. Martin', status: 'Disponível', cover: '', quantity: 3 },
  { id: 5, title: 'O Hobbit', category: 'Fantasia', author: 'J.R.R. Tolkien', status: 'Reservado', cover: '', quantity: 1 }
]

const saved = localStorage.getItem('catalogo-livros-sidebar')
const items = ref(saved ? JSON.parse(saved) : defaultItems)

const searchTerm = ref('')
const statusOptions = ['Disponível', 'Emprestado', 'Reservado']

const stats = computed(() => {
  const total = items.value.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  return {
    total,
    disponivel: items.value.filter(i => i.status === 'Disponível').length,
    emprestado: items.value.filter(i => i.status === 'Emprestado').length,
    reservado: items.value.filter(i => i.status === 'Reservado').length
  }
})

const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return items.value
  return items.value.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.author.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  )
})

function addItem(newItem) {
  items.value.push({ id: Date.now(), ...newItem })
}

function updateItem(updatedItem) {
  const index = items.value.findIndex(i => i.id === updatedItem.id)
  if (index !== -1) items.value[index] = updatedItem
}

function deleteItem(id) {
  items.value = items.value.filter(i => i.id !== id)
}

watch(items, (newItems) => {
  localStorage.setItem('catalogo-livros-sidebar', JSON.stringify(newItems))
}, { deep: true })
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Catálogo de Livros</h1>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-inner">
          <h2 class="sidebar-title">Adicionar livro</h2>
          <p class="sidebar-subtitle">Preencha os dados do novo item</p>
          <AddForm @add="addItem" :status-options="statusOptions" />
        </div>
      </aside>

      <main class="main">
        <div class="stats">
          <div class="stat">
            <span class="stat-value">{{ stats.total }}</span>
            <span class="stat-label">Total</span>
          </div>
          <div class="stat stat-green">
            <span class="stat-value">{{ stats.disponivel }}</span>
            <span class="stat-label">Disponíveis</span>
          </div>
          <div class="stat stat-red">
            <span class="stat-value">{{ stats.emprestado }}</span>
            <span class="stat-label">Emprestados</span>
          </div>
          <div class="stat stat-yellow">
            <span class="stat-value">{{ stats.reservado }}</span>
            <span class="stat-label">Reservados</span>
          </div>
        </div>

        <div class="search-bar">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar por título, autor ou categoria..."
            class="search-input"
          />
          <span class="count">{{ filteredItems.length }} livros encontrados</span>
        </div>

        <TransitionGroup name="card-list" tag="div" class="grid">
          <Card
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            :status-options="statusOptions"
            @update="updateItem"
            @delete="deleteItem"
          />
        </TransitionGroup>

        <div v-if="filteredItems.length === 0" class="empty">
          <p>Nenhum livro encontrado.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f5f7fa;
  color: #1a1a2e;
}

.app {
  min-height: 100vh;
}

.header {
  background: #1a1a2e;
  color: white;
  padding: 24px 32px;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  min-height: calc(100vh - 70px);
}

.sidebar {
  background: #ffffff;
  border-right: 1px solid #e9ecef;
  padding: 28px;
}

.sidebar-inner {
  position: sticky;
  top: 24px;
}

.sidebar-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a2e;
}

.sidebar-subtitle {
  margin: 6px 0 20px;
  font-size: 0.85rem;
  color: #6c757d;
}

.main {
  background: #f5f7fa;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a2e;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-green .stat-value { color: #2d6a4f; }
.stat-red .stat-value { color: #9b2226; }
.stat-yellow .stat-value { color: #bc6c25; }

.search-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  max-width: 600px;
}

.search-input:focus {
  border-color: #2c5364;
}

.count {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 600;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.empty {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 14px;
  color: #6c757d;
}

.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.3s ease;
}
.card-list-enter-from,
.card-list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }
  .sidebar-inner {
    position: static;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>