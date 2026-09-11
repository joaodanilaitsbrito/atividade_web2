<script setup>
defineProps({
  total: { type: Number, default: 0 },
  disponivel: { type: Number, default: 0 },
  emprestado: { type: Number, default: 0 },
  reservado: { type: Number, default: 0 }
})
</script>

<template>
  <div class="stats">
    <div class="stat">
      <span class="stat-value">{{ total }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat stat-green">
      <span class="stat-value">{{ disponivel }}</span>
      <span class="stat-label">Disponíveis</span>
    </div>
    <div class="stat stat-red">
      <span class="stat-value">{{ emprestado }}</span>
      <span class="stat-label">Emprestados</span>
    </div>
    <div class="stat stat-yellow">
      <span class="stat-value">{{ reservado }}</span>
      <span class="stat-label">Reservados</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.stat {
  background: #ffffff;
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.stat-value {
  display: block;
  font-size: 1.8rem;
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
@media (max-width: 768px) {
  .stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stat { padding: 14px 16px; }
  .stat-value { font-size: 1.5rem; }
}
</style>