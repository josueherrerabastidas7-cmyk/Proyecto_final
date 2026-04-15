document.addEventListener('DOMContentLoaded', async function () {
    const fileInputs = document.querySelectorAll('.file-upload-input');
    const dbName = 'uploadFilesDB';
    const storeName = 'files';
    const db = await openDb();

    let savedFiles = [];

    fileInputs.forEach(async input => {
        const listId = input.dataset.list;
        const list = document.getElementById(listId);
        if (!list) return;

        const storageKey = `upload-list:${window.location.pathname}`;
        let selectedFiles = [];

        const renderSelectedFiles = (files, note = '') => {
            list.innerHTML = '';
            if (!files.length) {
                const emptyItem = document.createElement('li');
                emptyItem.textContent = 'Ningún archivo seleccionado.';
                list.appendChild(emptyItem);
                return;
            }

            files.forEach(file => {
                const item = document.createElement('li');
                item.textContent = file.name;

                const downloadButton = document.createElement('button');
                downloadButton.type = 'button';
                downloadButton.textContent = 'Descargar';
                downloadButton.className = 'btn';
                downloadButton.style.marginLeft = '0.75rem';
                downloadButton.addEventListener('click', () => {
                    const url = URL.createObjectURL(file);
                    triggerDownload(url, file.name);
                });

                item.appendChild(downloadButton);
                list.appendChild(item);
            });

            if (note) {
                const noteItem = document.createElement('li');
                noteItem.textContent = note;
                noteItem.style.fontStyle = 'italic';
                noteItem.style.color = '#5a5a5a';
                list.appendChild(noteItem);
            }
        };

        const renderSavedFiles = async (savedRecords, note = '') => {
            list.innerHTML = '';
            if (!savedRecords.length) {
                const emptyItem = document.createElement('li');
                emptyItem.textContent = 'Ningún archivo guardado.';
                list.appendChild(emptyItem);
                return;
            }

            for (const record of savedRecords) {
                const item = document.createElement('li');
                item.textContent = record.name;

                const downloadButton = document.createElement('button');
                downloadButton.type = 'button';
                downloadButton.textContent = 'Descargar';
                downloadButton.className = 'btn';
                downloadButton.style.marginLeft = '0.75rem';
                downloadButton.addEventListener('click', async () => {
                    const stored = await getSavedFile(record.id);
                    if (!stored) return;
                    const url = URL.createObjectURL(stored.blob);
                    triggerDownload(url, stored.name);
                });

                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.textContent = 'Eliminar';
                deleteButton.className = 'btn btn-secondary';
                deleteButton.style.marginLeft = '0.75rem';
                deleteButton.addEventListener('click', async () => {
                    await deleteSavedFile(record.id);
                    savedFiles = await getSavedFiles(storageKey);
                    await renderSavedFiles(savedFiles, 'Archivo eliminado.');
                });

                item.appendChild(downloadButton);
                item.appendChild(deleteButton);
                list.appendChild(item);
            }

            if (note) {
                const noteItem = document.createElement('li');
                noteItem.textContent = note;
                noteItem.style.fontStyle = 'italic';
                noteItem.style.color = '#5a5a5a';
                list.appendChild(noteItem);
            }
        };

        savedFiles = await getSavedFiles(storageKey);
        await renderSavedFiles(savedFiles);

        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = 'Guardar archivos';
        saveButton.className = 'btn save-upload-btn';
        saveButton.style.marginLeft = '1rem';
        saveButton.disabled = true;

        input.parentNode.insertBefore(saveButton, input.nextSibling);

        input.addEventListener('change', () => {
            if (!input.files.length) {
                selectedFiles = [];
                saveButton.disabled = true;
                renderSavedFiles(savedFiles);
                return;
            }

            selectedFiles = Array.from(input.files);
            saveButton.disabled = false;
            renderSelectedFiles(selectedFiles, 'Haz clic en Guardar para almacenar los archivos.');
        });

        saveButton.addEventListener('click', async () => {
            if (!selectedFiles.length) return;

            await saveFiles(storageKey, selectedFiles);
            selectedFiles = [];
            input.value = '';
            savedFiles = await getSavedFiles(storageKey);
            await renderSavedFiles(savedFiles, 'Archivos guardados correctamente.');
            saveButton.disabled = true;
        });
    });

    function openDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);
            request.onupgradeneeded = function () {
                const db = request.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = function () {
                resolve(request.result);
            };
            request.onerror = function () {
                reject(request.error);
            };
        });
    }

    function requestToPromise(request) {
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getSavedFiles(storageKey) {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const allRecords = await requestToPromise(store.getAll());
        return allRecords.filter(record => record.path === storageKey);
    }

    async function saveFiles(storageKey, files) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            files.forEach(file => {
                const id = `${storageKey}:${file.name}`;
                store.put({ id, path: storageKey, name: file.name, blob: file });
            });
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    async function getSavedFile(id) {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        return await requestToPromise(store.get(id));
    }

    async function deleteSavedFile(id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    function triggerDownload(url, fileName) {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
});
