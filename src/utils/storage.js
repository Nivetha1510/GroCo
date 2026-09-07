export const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/* One-time migration for data saved before per-account storage existed:
   the first namespace to read a key claims whatever is under `legacyKey`
   and the legacy key is deleted immediately, so a second account can't
   also inherit the same leftover data. */
export const readNamespaced = (nsKey, legacyKey, fallback) => {
  try {
    if (localStorage.getItem(nsKey) !== null) return read(nsKey, fallback);
    const legacyRaw = localStorage.getItem(legacyKey);
    localStorage.removeItem(legacyKey);
    const value = legacyRaw ? JSON.parse(legacyRaw) : fallback;
    write(nsKey, value);
    return value;
  } catch {
    return fallback;
  }
};
