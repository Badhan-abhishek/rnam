import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Values {
  name: string;
  phoneNumber: string;
  randomEmail: string;
  country: string;
  city: string;
  zipcode: string;
  street: string;
}

interface Store {
  values: Values | null;

  setValues: (values: Values) => void;
  clearStore: () => void;
}

export const useValuesStore = create<Store>()(
  persist(
    (set) => ({
      values: null,
      clearStore: () => set(() => ({ values: null }), true),
      setValues: (values) => {
        console.log("values", values);
        return set((s) => ({ ...s, values: values }));
      },
    }),
    {
      name: "values",
    }
  )
);
