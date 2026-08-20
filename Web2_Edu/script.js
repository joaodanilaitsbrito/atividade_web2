const form = document.getElementById('form');
const lista = document.getElementById('lista');
const vazio = document.getElementById('vazio');
let filtroAtual = 'todos';

function obterCompromissos() {
  return JSON.parse(localStorage.getItem('agenda')) || [];
}

function salvarCompromissos(compromissos) {
  localStorage.setItem('agenda', JSON.stringify(compromissos));
}

function renderizar() {
  const compromissos = obterCompromissos();
  lista.innerHTML = '';

  const filtrados = compromissos.filter(item => {
    if (filtroAtual === 'pendentes') return !item.concluido;
    if (filtroAtual === 'concluidos') return item.concluido;
    return true;
  });

  vazio.style.display = filtrados.length === 0 ? 'block' : 'none';

  filtrados.forEach(item => {
    const li = document.createElement('li');
    li.className = item.concluido ? 'concluido' : '';

    const dataFormatada = new Date(item.data).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    li.innerHTML = `
      <div class="titulo">${escaparHtml(item.titulo)}</div>
      <div class="data">${dataFormatada}</div>
      ${item.descricao ? `<div class="descricao">${escaparHtml(item.descricao)}</div>` : ''}
      <div class="acoes">
        <button class="concluir" onclick="toggleConcluir(${item.id})">
          ${item.concluido ? 'Desfazer' : 'Concluir'}
        </button>
        <button class="excluir" onclick="excluir(${item.id})">Excluir</button>
      </div>
    `;

    lista.appendChild(li);
  });
}

function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function adicionar(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value.trim();

  if (!titulo || !data) return;

  const compromissos = obterCompromissos();
  compromissos.push({
    id: Date.now(),
    titulo,
    data,
    descricao,
    concluido: false
  });

  compromissos.sort((a, b) => new Date(a.data) - new Date(b.data));

  salvarCompromissos(compromissos);
  form.reset();
  renderizar();
}

function toggleConcluir(id) {
  const compromissos = obterCompromissos();
  const item = compromissos.find(c => c.id === id);
  if (item) {
    item.concluido = !item.concluido;
    salvarCompromissos(compromissos);
    renderizar();
  }
}

function excluir(id) {
  const compromissos = obterCompromissos().filter(c => c.id !== id);
  salvarCompromissos(compromissos);
  renderizar();
}

function definirFiltro(filtro) {
  filtroAtual = filtro;
  document.querySelectorAll('.filtros button').forEach(btn => btn.classList.remove('ativo'));
  const ativo = Array.from(document.querySelectorAll('.filtros button')).find(btn =>
    btn.textContent.toLowerCase().includes(
      filtro === 'todos' ? 'todos' : filtro === 'pendentes' ? 'pendentes' : 'concluídos'
    )
  );
  if (ativo) ativo.classList.add('ativo');
  renderizar();
}

form.addEventListener('submit', adicionar);
renderizar();