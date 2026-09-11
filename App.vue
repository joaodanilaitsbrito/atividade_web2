<script setup>
import { ref, computed, watch } from 'vue'
import Header from './components/Header.vue'
import Stats from './components/Stats.vue'
import SearchBar from './components/SearchBar.vue'
import AddForm from './components/AddForm.vue'
import Card from './components/Card.vue'

const defaultItems = [
  { id: 1, title: 'O Senhor dos Anéis', category: 'Fantasia', author: 'J.R.R. Tolkien', status: 'Disponível', cover: '', quantity: 1 },
  { id: 2, title: '1984', category: 'Distopia', author: 'George Orwell', status: 'Emprestado', cover: '', quantity: 2 },
  { id: 3, title: 'Dom Casmurro', category: 'Romance', author: 'Machado de Assis', status: 'Disponível', cover: '', quantity: 1 },
  { id: 4, title: 'Clean Code', category: 'Tecnologia', author: 'Robert C. Martin', status: 'Disponível', cover: '', quantity: 3 },
  { id: 5, title: 'O Hobbit', category: 'Fantasia', author: 'J.R.R. Tolkien', status: 'Reservado', cover: '', quantity: 1 }
]

const saved = localStorage.getItem('catalogo-livros-v4')
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
  localStorage.setItem('catalogo-livros-v4', JSON.stringify(newItems))
}, { deep: true })
</script>

<template>
  <div class="app">
    <Header brand="Biblioteca" />

    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-inner">
          <h1 class="page-title">Catálogo de Livros</h1>
          <p class="page-subtitle">Gerencie seu acervo</p>
          <AddForm @add="addItem" :status-options="statusOptions" />
        </div>
      </aside>

      <main class="main">
        <div class="main-inner">
          <Stats
            :total="stats.total"
            :disponivel="stats.disponivel"
            :emprestado="stats.emprestado"
            :reservado="stats.reservado"
          />

          <div class="toolbar">
            <SearchBar v-model="searchTerm" />
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
            <span class="empty-icon">📚</span>
            <p>Nenhum livro encontrado.</p>
          </div>
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
  -webkit-font-smoothing: antialiased;
}

.app {
  min-height: 100vh;
  padding-top: 60px;
}

.layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  min-height: calc(100vh - 60px);
}

.sidebar {
  background: #ffffff;
  border-right: 1px solid #e9ecef;
  padding: 28px;
}
.sidebar-inner {
  position: sticky;
  top: 88px;
}
.page-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a2e;
}
.page-subtitle {
  margin: 4px 0 24px;
  font-size: 0.9rem;
  color: #6c757d;
}

.main {
  background: #f5f7fa;
  padding: 28px;
}
.main-inner {
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.toolbar .search {
  max-width: 420px;
}
.count {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6c757d;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
  position: relative;
}

.empty {
  text-align: center;
  padding: 80px 24px;
  background: #ffffff;
  border: 1px dashed #dee2e6;
  border-radius: 14px;
}
.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}
.empty p {
  margin: 0;
  color: #6c757d;
  font-size: 1rem;
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
.card-list-leave-active {
  position: absolute;
  width: 220px;
}

@media (max-width: 1024px) {
  .layout { grid-template-columns: 300px 1fr; }
  .sidebar { padding: 20px; }
  .main { padding: 20px; }
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
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .toolbar .search { max-width: 100%; }
  .count { text-align: right; }
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
</style>