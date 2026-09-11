<script setup>
import { reactive } from 'vue'

defineProps({
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
  <form @submit.prevent="submit" class="add-form">
    <h3 class="form-title">Novo livro</h3>

    <div class="field">
      <label for="title">Título</label>
      <input id="title" v-model="form.title" type="text" placeholder="Ex: O Senhor dos Anéis" required />
    </div>

    <div class="field">
      <label for="author">Autor</label>
      <input id="author" v-model="form.author" type="text" placeholder="Ex: J.R.R. Tolkien" required />
    </div>

    <div class="field">
      <label for="category">Categoria</label>
      <input id="category" v-model="form.category" type="text" placeholder="Ex: Fantasia" />
    </div>

    <div class="field-row">
      <div class="field field-small">
        <label for="quantity">Qtd</label>
        <input id="quantity" v-model.number="form.quantity" type="number" min="1" />
      </div>
      <div class="field">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="cover">URL da capa</label>
      <input id="cover" v-model="form.cover" type="url" placeholder="https://... (opcional)" />
    </div>

    <button type="submit" class="btn-submit">Adicionar ao catálogo</button>
  </form>
</template>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-title {
  margin: 0 0 4px;
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
  padding: 11px 14px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1a1a2e;
  background: #ffffff;
  outline: none;
  width: 100%;
}

.field input::placeholder {
  color: #adb5bd;
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