<script setup>
import { reactive } from 'vue'

const props = defineProps({
  statusOptions: {
    type: Array,
    default: () => ['Disponível', 'Emprestado', 'Reservado']
  }
})

const emit = defineEmits(['add'])

const form = reactive({
  title: '',
  author: '',
  category: '',
  status: 'Disponível',
  cover: '',
  quantity: 1
})

function submit() {
  if (!form.title.trim() || !form.author.trim()) return
  emit('add', { ...form, quantity: Number(form.quantity) || 1 })
  form.title = ''
  form.author = ''
  form.category = ''
  form.status = 'Disponível'
  form.cover = ''
  form.quantity = 1
}
</script>

<template>
  <form @submit.prevent="submit" class="form">
    <h3 class="form-title">Novo livro</h3>
    <div class="field">
      <label>Título</label>
      <input v-model="form.title" type="text" placeholder="Título do livro" required />
    </div>
    <div class="field">
      <label>Autor</label>
      <input v-model="form.author" type="text" placeholder="Nome do autor" required />
    </div>
    <div class="field">
      <label>Categoria</label>
      <input v-model="form.category" type="text" placeholder="Ex: Fantasia" />
    </div>
    <div class="field-row">
      <div class="field field-small">
        <label>Qtd</label>
        <input v-model.number="form.quantity" type="number" min="1" />
      </div>
      <div class="field">
        <label>Status</label>
        <select v-model="form.status">
          <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label>URL da capa</label>
      <input v-model="form.cover" type="url" placeholder="https://... (opcional)" />
    </div>
    <button type="submit" class="btn-submit">Adicionar ao catálogo</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-title {
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6c757d;
}
.field input,
.field select {
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1a1a2e;
  background: #ffffff;
  outline: none;
}
.field input:focus,
.field select:focus {
  border-color: #2c5364;
}
.field-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
}
.field-small input {
  text-align: center;
}
.btn-submit {
  margin-top: 6px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #1a1a2e;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover {
  background: #2c5364;
}
</style>