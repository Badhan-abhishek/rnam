import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_GEN_COUNT, MAX_GEN_COUNT } from "./constant";
import { ValueStoreKey } from "./use-values-store";

interface GeneratorStore {
  gens: ValueStoreKey[];
  deleteGen: (k: ValueStoreKey) => void;
  addGen: () => void;
}

const getNewKey = (
  allKeys: GeneratorStore["gens"],
  inc: number
): ValueStoreKey => {
  const newKey = `value-${inc}` as ValueStoreKey;
  if (!allKeys.includes(newKey)) {
    return newKey;
  }
  return getNewKey(allKeys, inc + 1);
};

export const useGeneratorStore = create<GeneratorStore>()(
  persist(
    (set) => ({
      gens: ["value-1"],
      deleteGen: (k: ValueStoreKey) => {
        return set((s) => {
          if (s.gens.length > INITIAL_GEN_COUNT) {
            const idx = s.gens.findIndex((g) => g === k);
            s.gens.splice(idx, 1);
            return {
              ...s,
              gens: s.gens,
            };
          } else {
            return {
              ...s,
            };
          }
        });
      },
      addGen: () => {
        return set((s) => {
          if (s.gens.length < MAX_GEN_COUNT) {
            const newKey = getNewKey(s.gens, s.gens.length + 1);
            s.gens.push(newKey);
            return {
              ...s,
              gens: s.gens,
            };
          } else {
            return {
              ...s,
            };
          }
        });
      },
    }),
    {
      name: "generatorStore",
    }
  )
);
