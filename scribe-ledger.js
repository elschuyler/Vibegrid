// The Scribe's Ledger: 5-Slot Save System
export const Scribe = {
  save: (romId, slot, data) => {
    const key = `VG_${romId}_S${slot}`;
    localStorage.setItem(key, 
      JSON.stringify({
        data,
        ts: Date.now()
      })
    );
    console.log(`Saved to Slot ${slot}`);
  },

  load: (romId, slot) => {
    const key = `VG_${romId}_S${slot}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },

  list: (romId) => {
    return [1, 2, 3, 4, 5].map(s => 
      Scribe.load(romId, s)
    );
  }
};
