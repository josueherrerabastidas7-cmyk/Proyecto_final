// scripts.js
// Almacenamiento simple en localStorage de archivos subidos por el usuario.
// Estructura: uploadedFiles = [{id, name, size, type, dataUrl, uploadedAt, weekNum}]

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

function escapeHtml(s){
  return s.replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function getFileIcon(type) {
  if (type.startsWith('image/')) return '🖼️';
  if (type === 'application/pdf') return '📄';
  if (type.includes('word') || type.includes('document')) return '📝';
  if (type.includes('sheet') || type.includes('excel')) return '📊';
  if (type.includes('presentation') || type.includes('powerpoint')) return '📽️';
  if (type.includes('video')) return '🎬';
  if (type.includes('audio')) return '🎵';
  if (type.includes('zip') || type.includes('rar') || type.includes('compress')) return '📦';
  return '📎';
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
  render();
}

function showMessage(msgEl, msg, timeout = 3000) {
  msgEl.textContent = msg;
  setTimeout(() => { if (msgEl.textContent === msg) msgEl.textContent = ''; }, timeout);
}

function renderFilesForWeek(weekNum) {
  const files = getUploadedFiles().filter(f => f.weekNum === weekNum);
  const container = document.createElement('div');
  container.className = 'files-list';

  if (files.length === 0) {
    container.innerHTML = '<p class="empty-files">No hay archivos aún</p>';
    return container;
  }

  files.forEach(item => {
    const fileCard = document.createElement('div');
    fileCard.className = 'file-card';

    if (item.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = item.dataUrl;
      img.className = 'file-preview';
      img.alt = item.name;
      img.title = item.name;
      fileCard.appendChild(img);
    } else if (item.type === 'application/pdf') {
      const pdfIcon = document.createElement('div');
      pdfIcon.className = 'file-icon';
      pdfIcon.innerHTML = '📄';
      pdfIcon.title = 'PDF';
      fileCard.appendChild(pdfIcon);
    } else {
      const fileIcon = document.createElement('div');
      fileIcon.className = 'file-icon';
      fileIcon.innerHTML = getFileIcon(item.type);
      fileCard.appendChild(fileIcon);
    }

    const meta = document.createElement('div');
    meta.className = 'file-meta';
    const date = new Date(item.uploadedAt).toLocaleString();
    meta.innerHTML = `<strong title="${item.name}">${escapeHtml(item.name)}</strong><small>${Math.round(item.size/1024)} KB • ${date}</small>`;
    fileCard.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'file-actions';

    const dl = document.createElement('button');
    dl.textContent = '⬇️';
    dl.title = 'Descargar';
    dl.className = 'btn-download';
    dl.addEventListener('click', () => downloadFile(item));

    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.title = 'Borrar';
    del.className = 'btn-delete';
    del.addEventListener('click', () => deleteFile(item.id));

    actions.appendChild(dl);
    actions.appendChild(del);
    fileCard.appendChild(actions);

    container.appendChild(fileCard);
  });

  return container;
}

function createWeekCard(weekNum) {
  const card = document.createElement('section');
  card.className = 'semana-card';
  card.id = `semana${weekNum}`;

  const header = document.createElement('div');
  header.className = 'week-header';

  const title = document.createElement('h2');
  title.textContent = `Semana ${weekNum}`;
  header.appendChild(title);

  const uploader = document.createElement('div');
  uploader.className = 'week-uploader';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.className = 'week-file-input';

  const uploadBtn = document.createElement('button');
  uploadBtn.textContent = '📤 Subir archivo';
  uploadBtn.className = 'week-upload-btn';

  const messages = document.createElement('div');
  messages.className = 'week-messages';

  uploadBtn.addEventListener('click', async () => {
    const list = Array.from(fileInput.files || []);
    if (list.length === 0) { 
      showMessage(messages, 'Selecciona al menos un archivo.');
      return; 
    }
    showMessage(messages, 'Subiendo...');
    const store = getUploadedFiles();
    for (const f of list) {
      const dataUrl = await readFileAsDataURL(f);
      const uploadedAt = new Date().toISOString();
      store.push({ id: uid(), name: f.name, size: f.size, type: f.type, dataUrl, uploadedAt, weekNum });
    }
    saveUploadedFiles(store);
    fileInput.value = '';
    showMessage(messages, 'Archivos subidos ✅');
    render();
  });

  uploader.appendChild(fileInput);
  uploader.appendChild(uploadBtn);
  uploader.appendChild(messages);
  card.appendChild(header);
  card.appendChild(uploader);

  // Archivos
  const filesContainer = renderFilesForWeek(weekNum);
  card.appendChild(filesContainer);

  return card;
}

function render() {
  const container = document.getElementById('semanas-container');
  container.innerHTML = '';
  
  for (let i = 1; i <= 16; i++) {
    container.appendChild(createWeekCard(i));
  }
}

function readFileAsDataURL(file){
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', render);

// Exponer función para debug
window.__uploader = {getUploadedFiles, saveUploadedFiles};
