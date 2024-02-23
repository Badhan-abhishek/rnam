"use client";
import { Generator } from "@/features/generator";
import { MAX_GEN_COUNT } from "@/lib/constant";
import { useGeneratorStore } from "@/lib/use-generator-store";

export default function Home() {
  const { addGen, gens } = useGeneratorStore();
  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3 p-6 gap-4 container mx-auto">
      {gens.map((gen) => {
        return <Generator key={gen} valueStoreKey={gen} />;
      })}
      {gens.length === MAX_GEN_COUNT ? null : (
        <div
          onClick={addGen}
          className="cursor-pointer min-h-[250px] w-full border border-dotted rounded-lg grid place-content-center"
        >
          +
        </div>
      )}
    </main>
  );
}
