enum StorageKeys {
  AGENT = 'SAVED_AGENT',
  MODEL = 'SAVED_MODEL',
  PREVIOUS_THREADS = 'PREVIOUS_THREADS_',
}

export const getPersistedAgent = async (): Promise<string | null> => {
  return null;
};

export const setPersistedAgent = async (agent: string) => {
  return;
};

export const getPersistedModel = async (): Promise<string | null> => {
  return null;
};

export const setPersistedModel = async (model: string) => {
  return;
};

export const getPersistedPreviousThreads = async (): Promise<string[]> => {
  return ['c0e203da-f408-4534-90ec-e0ca0da5f651'];
};

export const addNewPersistedPreviousThreads = async (newThreadId: string) => {
  // Implement
  return;
};
