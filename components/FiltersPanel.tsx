"use client";
import { useMemo } from "react";
import type { UserFilter, Plant } from "@/lib/types";

type Props = {
  /** current filter state (lifted up) */
  filter: UserFilter;
  /** setFilter from parent */
  onChange: (f: UserFilter) => void;
  /** click Generate */
  onGenerate: () => void;
  /** optional: pass all plants so we can build Category options dynamically  */
  allPlants?: Plant[];
};

const LIGHT_OPTIONS = [
  "-",
  "6 or more hours of direct sunlight per day.",
  "Bright light",
  "Diffused",
  "Direct sunlight.",
  "Prefers bright, indirect sunlight.",
];

const CLIMATE_OPTIONS = ["-", "Tropical", "Subtropical", "Temperate", "Arid"];

const AESTHETIC_OPTIONS = ["-", "Table top", "Hanging", "Colors / forms"];

const WATERING_OPTIONS = ["-", "Light", "Moderate", "Frequent"];

export default function FiltersPanel({
  filter,
  onChange,
  onGenerate,
  allPlants,
}: Props) {
  // Build category options from data (fallback to a small list if no data)
  const CATEGORY_OPTIONS = useMemo(() => {
    if (!allPlants?.length) return ["-", "Aglaonema", "Alocasia", "Monstera"];
    const set = new Set<string>();
    allPlants.forEach((p) => p.category && set.add(p.category));
    return ["-", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allPlants]);

  const set = (key: keyof UserFilter, v: string) =>
    onChange({ ...filter, [key]: v === "-" ? undefined : v });

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {children}
    </div>
  );

  const Select = ({
    value,
    onChange,
    options,
  }: {
    value?: string;
    onChange: (v: string) => void;
    options: string[];
  }) => (
    <select
      value={value ?? "-"}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-white/20 bg-white text-emerald-900 px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-col gap-6">
      <Field label="Light Intensity">
        <Select
          value={filter.light}
          onChange={(v) => set("light", v)}
          options={LIGHT_OPTIONS}
        />
      </Field>

      <Field label="Local Climate">
        <Select
          value={filter.climate}
          onChange={(v) => set("climate", v)}
          options={CLIMATE_OPTIONS}
        />
      </Field>

      <Field label="Aesthetic Use">
        <Select
          value={filter.aesthetic}
          onChange={(v) => set("aesthetic", v)}
          options={AESTHETIC_OPTIONS}
        />
      </Field>

      <Field label="Category">
        <Select
          value={filter.category}
          onChange={(v) => set("category", v)}
          options={CATEGORY_OPTIONS}
        />
      </Field>

      <Field label="Watering Frequency">
        <Select
          value={filter.watering as string | undefined}
          onChange={(v) => set("watering", v)}
          options={WATERING_OPTIONS}
        />
      </Field>

      <button
        onClick={onGenerate}
        className="mt-2 w-full rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-600 active:scale-[0.99] transition"
      >
        Generate
      </button>
    </div>
  );
}
