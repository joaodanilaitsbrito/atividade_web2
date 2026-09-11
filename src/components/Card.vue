<script setup>
import { reactive, computed, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  statusOptions: {
    type: Array,
    default: () => ['Disponível', 'Emprestado', 'Reservado']
  }
})

const emit = defineEmits(['update', 'delete'])

const isEditing = ref(false)
const editForm = reactive({ ...props.item })

const categoryColors = {
  'Fantasia': '#4a4e69',
  'Distopia': '#7c2d12',
  'Romance': '#bc6c25',
  'Tecnologia': '#2c5364',
  'Ficção': '#264653',
  'Aventura': '#2a9d8f',
  'default': '#6c757d'
}

const coverColor = computed(() => {
  return categoryColors[props.item.category] || categoryColors.default
})

const coverUrl = computed(() => {
  if (props.item.cover && props.item.cover.trim()) return props.item.cover
  return `https://placehold.co/160x240/${coverColor.value.replace('#', '')}/ffffff?text=${encodeURIComponent(props.item.category || 'Livro')}`
})

const statusClass = computed(() => {
  return {
    'Disponível': 'green',
    'Emprestado': 'red',
    'Reservado': 'yellow'
  }[props.item.status] || ''
})

function startEdit() {
  Object.assign(editForm, props.item)
  isEditing.value = true
}

function save() {
  emit('update', { ...editForm, quantity: Number(editForm.quantity) || 1 })
  isEditing.value = false
}

function cancel() {
  isEditing.value = false
}

function remove() {
  if (confirm('Excluir este livro?')) {
    emit('delete', props.item.id)
  }
}
</script>

<template>
  <article class="card">
    <div class="cover">
      <img :src="coverUrl" alt="Capa" />
      <span class="status-badge" :class="statusClass">{{ item.status }}</span>
    </div>

    <div class="content">
      <div v-if="!isEditing" class="info">
        <p class="category">{{ item.category }}</p>
        <h3 class="title">{{ item.title }}</h3>
        <p class="author">por {{ item.author }}</p>
        <p class="quantity">{{ item.quantity || 1 }} exemplar(es)</p>
      </div>

      <form v-else @submit.prevent="save" class="edit-form">
        <input v-model="editForm.title" type="text" required />
        <input v-model="editForm.author" type="text" required />
        <input v-model="editForm.category" type="text" />
        <div class="edit-row">
          <input v-model.number="editForm.quantity" type="number" min="1" />
          <select v-model="editForm.status">
            <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <input v-model="editForm.cover" type="url" placeholder="URL da capa" />
      </form>

      <div class="actions">
        <button v-if="!isEditing" @click="startEdit" class="btn btn-secondary">Editar</button>
        <button v-else @click="save" class="btn btn-primary">Salvar</button>
        <button v-if="isEditing" @click="cancel" class="btn btn-secondary">Cancelar</button>
        <button @click="remove" class="btn btn-danger">Excluir</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}
.cover {
  position: relative;
  height: 220px;
  background: #f1f4f6;
  overflow: hidden;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 5px 10px;
  border-radius: 99px;
  color: #ffffff;
}
.status-badge.green { background: #2d6a4f; }
.status-badge.red { background: #9b2226; }
.status-badge.yellow { background: #bc6c25; }
.content {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.category {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6c757d;
}
.title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.author {
  margin: 0;
  font-size: 0.85rem;
  color: #6c757d;
}
.quantity {
  margin: 6px 0 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: #adb5bd;
}
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.edit-form input,
.edit-form select {
  padding: 8px 10px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.85rem;
}
.edit-row {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 8px;
}
.actions {
  margin-top: auto;
  display: flex;
  gap: 8px;
}
.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.85; }
.btn-primary { background: #1a1a2e; color: #fff; }
.btn-secondary { background: #f1f4f6; color: #1a1a2e; }
.btn-danger { background: #ffdede; color: #9b2226; margin-left: auto; }
</style>