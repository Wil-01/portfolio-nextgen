import { vi } from 'vitest';

export type QueryResult = { data: unknown; error: unknown };

/** Réponses renvoyées par `from(table).select().order()`, par table. */
export const tableResults: Record<string, QueryResult> = {};

/** Écritures reçues, pour vérifier ce que l'interface envoie réellement. */
export const writes = {
  insert: vi.fn(async () => ({ data: null, error: null })),
  update: vi.fn(() => ({ eq: async () => ({ data: null, error: null }) })),
  remove: vi.fn(() => ({ eq: async () => ({ data: null, error: null }) })),
};

export const auth = {
  getSession: vi.fn(async () => ({ data: { session: null as unknown } })),
  onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: () => undefined } } })),
  signInWithPassword: vi.fn(async () => ({ error: null as null | { message: string } })),
  signOut: vi.fn(async () => ({ error: null })),
};

export const supabaseMock = {
  auth,
  from: (table: string) => ({
    select: () => ({
      order: async () => tableResults[table] ?? { data: [], error: null },
    }),
    insert: writes.insert,
    update: writes.update,
    delete: writes.remove,
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://cdn.test/file' } }),
    }),
  },
};

export function resetSupabaseMock() {
  Object.keys(tableResults).forEach((k) => delete tableResults[k]);
  auth.getSession.mockImplementation(async () => ({ data: { session: null } }));
  auth.onAuthStateChange.mockImplementation(() => ({
    data: { subscription: { unsubscribe: () => undefined } },
  }));
  auth.signInWithPassword.mockImplementation(async () => ({ error: null }));
  auth.signOut.mockImplementation(async () => ({ error: null }));
  writes.insert.mockImplementation(async () => ({ data: null, error: null }));
  writes.update.mockImplementation(() => ({ eq: async () => ({ data: null, error: null }) }));
  writes.remove.mockImplementation(() => ({ eq: async () => ({ data: null, error: null }) }));
}
