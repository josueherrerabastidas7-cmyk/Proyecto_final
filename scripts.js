// scripts.js
// Almacenamiento simple en localStorage de archivos subidos por el usuario.
// Estructura: uploadedFiles = [{id, name, size, type, dataUrl, uploadedAt, weekId}]

const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const filesView = document.getElementById('filesView');
const messages = document.getElementById('messages');
const weekSelect = document.getElementById('weekSelect');

function getUploadedFiles() {
  try {
    return JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  } catch (e) {
    console.error('Error leyendo uploadedFiles', e);
    return [];
  }
}

function saveUploadedFiles(list) {
  localStorage.setItem('uploadedFiles', JSON.stringify(list));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

function getISOWeek(date) {
  // Returns YYYY-Www (ISO week number)
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Thursday in current week decides the year.
  tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1)/7);
  return `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2,'0')}`;
}

function render() {
  const files = getUploadedFiles();
  const grouped = files.reduce((acc, f) => {
    (acc[f.weekId] = acc[f.weekId] || []).push(f);
    return acc;
  }, {});

  // Update weekSelect options
  const weekIds = Object.keys(grouped).sort().reverse();
  // clear options except 'all'
  while (weekSelect.options.length > 1) weekSelect.remove(1);
  weekIds.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w;
    opt.textContent = w;
    weekSelect.appendChild(opt);
  });

  const selected = weekSelect.value || 'all';

  filesView.innerHTML = '';
  if (selected === 'all') {
    weekIds.forEach(weekId => {
      filesView.appendChild(renderWeekBlock(weekId, grouped[weekId]));
    });
  } else {
    if (grouped[selected]) filesView.appendChild(renderWeekBlock(selected, grouped[selected]));
    else filesView.textContent = 'No hay archivos para esa semana.';
  }
}

function renderWeekBlock(weekId, items) {
  const container = document.createElement('div');
  const h = document.createElement('h3');
  h.textContent = weekId + ` (${items.length} archivo(s))`;
  container.appendChild(h);

  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'file-item';

    const meta = document.createElement('div');
    meta.innerHTML = `<strong>${escapeHtml(item.name)}</strong> <small>(${Math.round(item.size/1024)} KB) • ${new Date(item.uploadedAt).toLocaleString()}</small>`;

    const actions = document.createElement('div');
    actions.className = 'file-actions';

    const dl = document.createElement('button');
    dl.textContent = 'Descargar';
    dl.addEventListener('click', () => downloadFile(item));

    const del = document.createElement('button');
    del.textContent = 'Borrar';
    del.addEventListener('click', () => deleteFile(item.id));

    actions.appendChild(dl);
    actions.appendChild(del);

    row.appendChild(meta);
    row.appendChild(actions);
    container.appendChild(row);
  });

  return container;
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function downloadFile(item) {
  const a = document.createElement('a');
  a.href = item.dataUrl;
  a.download = item.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function deleteFile(id) {
  let files = getUploadedFiles();
  files = files.filter(f => f.id !== id);
  saveUploadedFiles(files);
  showMessage('Archivo borrado.');
  render();
}

function showMessage(msg, timeout = 3000) {
  messages.textContent = msg;
  setTimeout(() => { if (messages.textContent === msg) messages.textContent = ''; }, timeout);
}

uploadBtn.addEventListener('click', async () => {
  const list = Array.from(fileInput.files || []);
  if (list.length === 0) { showMessage('Selecciona al menos un archivo.'); return; }
  showMessage('Subiendo...');
  const store = getUploadedFiles();
  for (const f of list) {
    const dataUrl = await readFileAsDataURL(f);
    const uploadedAt = new Date().toISOString();
    const weekId = getISOWeek(new Date());
    store.push({ id: uid(), name: f.name, size: f.size, type: f.type, dataUrl, uploadedAt, weekId });
  }
  saveUploadedFiles(store);
  fileInput.value = '';
  showMessage('Archivos subidos correctamente.');
  render();
});

weekSelect.addEventListener('change', () => render());

function readFileAsDataURL(file){
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// Inicializar
render();

// Exponer función para debug en consola
window.__uploader = {getUploadedFiles, saveUploadedFiles};
