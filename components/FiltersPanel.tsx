"use client";
import { useEffect, useMemo, useState } from "react";
import type { UserFilter, Plant } from "@/lib/types";

type Props = {
  filter: UserFilter;
  onChange: (f: UserFilter) => void;
  onGenerate: () => void;
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
  /* ===== AUTO DENSITY by viewport height ===== */
  const [density, setDensity] = useState<"normal" | "dense" | "ultra">("normal");
  useEffect(() => {
    const decide = () => {
      const h = window.innerHeight;
      if (h < 720) setDensity("ultra");
      else if (h < 820) setDensity("dense");
      else setDensity("normal");
    };
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  /* ===== dynamic Category options ===== */
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
    <div className="space-y-2 dens:space-y-1 u:space-y-1">
      <label className="block text-sm font-medium dens:text-[13px] u:text-xs">
        {label}
      </label>
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
      className="
        w-full appearance-none rounded-xl border border-white/20 bg-white text-emerald-900
        px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-400
        dens:h-9 dens:py-1.5 dens:px-3 dens:text-[13px] dens:rounded-lg
        u:h-8 u:py-1 u:px-2.5 u:text-xs u:rounded-md
      "
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  const YEAR = new Date().getFullYear();

  return (
    <div
      className={density === "ultra" ? "u" : density === "dense" ? "dens" : ""}
    >
      {/* COPYRIGHT di atas */}
      <div className="mb-3 pt-1">
        <p className="text-[11.5px] u:text-[10.5px] leading-relaxed text-white/70 text-center">
          &copy; {YEAR}{" "}
          <span className="text-emerald-500 font-semibold">PlantMatch</span> — Find the
          Plant That Fits You
        </p>
      </div>

      {/* fields */}
      <div className="flex flex-col gap-6 dens:gap-3 u:gap-2.5">
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
          className="
            mt-1 w-full rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white
            hover:bg-emerald-600 active:scale-[0.99] transition
            dens:py-2 dens:text-[14px]
            u:py-1.5 u:text-[13px] u:rounded-lg
          "
        >
          Generate
        </button>
      </div>

      {/* util CSS: bikin varian 'dens:' & 'u:' (ultra) tanpa config tailwind */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .dens .dens\\:gap-3 { gap: .75rem !important; }
          .dens .dens\\:space-y-1 > * + * { margin-top: .25rem !important; }
          .dens .dens\\:h-9 { height: 2.25rem !important; }
          .dens .dens\\:py-1\\.5 { padding-top: .375rem !important; padding-bottom: .375rem !important; }
          .dens .dens\\:px-3 { padding-left: .75rem !important; padding-right: .75rem !important; }
          .dens .dens\\:text-\\[13px\\] { font-size: 13px !important; }
          .dens .dens\\:rounded-lg { border-radius: .5rem !important; }
          .dens .dens\\:text-\\[14px\\] { font-size: 14px !important; }

          .u .u\\:gap-2\\.5 { gap: .625rem !important; }
          .u .u\\:space-y-1 > * + * { margin-top: .25rem !important; }
          .u .u\\:h-8 { height: 2rem !important; }
          .u .u\\:py-1 { padding-top: .25rem !important; padding-bottom: .25rem !important; }
          .u .u\\:px-2\\.5 { padding-left: .625rem !important; padding-right: .625rem !important; }
          .u .u\\:text-xs { font-size: .75rem !important; }
          .u .u\\:rounded-md { border-radius: .375rem !important; }
          .u .u\\:text-\\[13px\\] { font-size: 13px !important; }
        `,
        }}
      />
    </div>
  );
}
