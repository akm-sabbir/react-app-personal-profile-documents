class Cache {
  constructor() {
    // We use a Map because it has optimal performance for dynamic additions/deletions
    this.store = new Map();
  }

  /**
   * Store data in the cache.
   * @param {string} key - Unique identifier
   * @param {*} value - Data to cache
   * @param {number} ttlInSeconds - How long the data stays valid (default 60s)
   */
  set(key, value, ttlInSeconds = 60) {
    const expiresAt = Date.now() + (ttlInSeconds * 1000);
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Retrieve data from the cache. Returns null if expired or missing.
   * @param {string} key
   */
    get(key) {
        const cachedItem = this.store.get(key);

        if (!cachedItem) return null;

        // Check if the item has expired
        if (Date.now() > cachedItem.expiresAt) {
            this.store.delete(key); // Clean up memory immediately
            return null;
        }

        return cachedItem.value;
    }

    has(key) {
        const cachedItem = this.store.get(key);

        // If it doesn't exist at all
        if (!cachedItem) return false;

        // If it exists but has expired, wipe it and return false
        if (Date.now() > cachedItem.expiresAt) {
            this.store.delete(key);
            return false;
        }

        // It exists and is valid
        return true;
    }
    /**
        * Manual eviction of a specific key
    */
    delete(key) {
        this.store.delete(key);
    }

    /**
    * Completely wipe the cache
    */
    clear() {
        this.store.clear();
    }
}

const globalCache = new Cache();

// 3. Export the INSTANCE, not the class
export default globalCache;