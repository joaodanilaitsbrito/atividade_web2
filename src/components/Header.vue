<script setup>
defineProps({
  brand: { type: String, default: 'Catálogo' }
})
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <a href="#" class="brand">
        <span class="brand-icon">▣</span>
        <span class="brand-name">{{ brand }}</span>
      </a>
      <nav class="nav">
        <a href="#" class="nav-link active">Catálogo</a>
        <a href="#" class="nav-link">Coleções</a>
        <a href="#" class="nav-link">Sobre</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e9ecef;
  height: 60px;
}
.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #1a1a2e;
}
.brand-icon {
  font-size: 1.2rem;
  color: #2c5364;
}
.brand-name {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.nav {
  display: flex;
  gap: 28px;
}
.nav-link {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6c757d;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s;
}
.nav-link:hover,
.nav-link.active {
  color: #1a1a2e;
  border-bottom-color: #2c5364;
}
@media (max-width: 768px) {
  .header-inner { padding: 0 16px; }
  .nav { display: none; }
}
</style>