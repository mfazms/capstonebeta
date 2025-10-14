import { Plant } from "@/lib/types";
import PlantCard from "./PlantCard";

export default function PlantList({
  plants,
  selectedIds = [],
  onToggleSelect,
}: {
  plants: Plant[];
  selectedIds?: number[];
  onToggleSelect?: (id: number) => void;
}) {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {plants.map((p) => (
        <PlantCard
          key={p.id}
          plant={p}
          selected={selectedIds.includes(p.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}
