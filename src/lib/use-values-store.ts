import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ValueStoreKey = `value-${number}`;

export interface Values {
  first: string;
  last: string;
  phoneNumber: string;
  randomEmail: string;
  country: string;
  city: string;
  zipcode: string;
  street: string;
}

interface Store {
  values: Record<ValueStoreKey, Values> | null;
  setValues: (values: Values, k: ValueStoreKey) => void;
  removeKey: (k: ValueStoreKey) => void;
  // clearStore: () => void;
}

export const useValuesStore = create<Store>()(
  persist(
    (set) => ({
      values: null,
      // clearStore: () => set(() => ({ values: null }), true),
      setValues: (v, k) => {
        return set((s) => ({
          ...s,
          values: {
            ...s.values,
            [k]: v,
          },
        }));
      },
      removeKey: (k) =>
        set((s) => {
          const values = s.values;
          if (values) {
            delete values[k];
          }
          return {
            ...s,
            values: {
              ...values,
            },
          };
        }),
    }),
    {
      name: "values",
    }
  )
);
