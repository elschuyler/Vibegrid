// The Vault: Persistent IndexedDB Storage
const DB_NAME = 'VibeGrid_Vault';
const STORE_NAME = 'romz_files';

export const Vault = {
  db: null,

  async init() {
    return new Promise((resolve) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore(STORE_NAME, 
          { keyPath: 'id' });
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };
    });
  },

  async save(id, name, blob) {
    const tx = this.db.transaction(
      STORE_NAME, 'readwrite'
    );
    tx.objectStore(STORE_NAME).put({
      id, name, blob, 
      added: Date.now()
    });
  },

  async getAll() {
    return new Promise((resolve) => {
      const tx = this.db.transaction(
        STORE_NAME, 'readonly'
      );
      const req = tx.objectStore(
        STORE_NAME).getAll();
      req.onsuccess = () => 
        resolve(req.result);
    });
  },

  async remove(id) {
    const tx = this.db.transaction(
      STORE_NAME, 'readwrite'
    );
    tx.objectStore(STORE_NAME).delete(id);
  }
};
