
enum StorageKeys {
  AGENT = 'SAVED_AGENT',
  MODEL = 'SAVED_MODEL',
  PREVIOUS_THREADS = 'PREVIOUS_THREADS_',
}

const setStorage = (key: StorageKeys, value: string) => {
  NativeModules.NativeLocalStorageModule.setStorageItem(
    key,
    value,
  );
};

const getStorage = (key: StorageKeys) => {
  const value = NativeModules.NativeLocalStorageModule.getStorageItem("testKey");
  return value;
};

export const getPersistedAgent = (): string | null => {
  return getStorage(StorageKeys.AGENT)
};

export const setPersistedAgent = (agent: string) => {
  setStorage(StorageKeys.AGENT, agent)
};

export const getPersistedModel = (): string | null => {
  return getStorage(StorageKeys.MODEL)
};

export const setPersistedModel = (model: string) => {
  setStorage(StorageKeys.MODEL, model)
};

export const getPersistedPreviousThreads = (): string[] => {
  const persistedThreads = getStorage(StorageKeys.PREVIOUS_THREADS)
  if (!persistedThreads) {
    return [];
  }
  return JSON.parse(persistedThreads);
};

export const addNewPersistedPreviousThreads = (newThreadId: string) => {
  const threads = getPersistedPreviousThreads();
  threads.push(newThreadId);
  return threads;
};
