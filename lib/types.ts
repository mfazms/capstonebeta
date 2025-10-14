// lib/types.ts
export type Temp = { celsius: number; fahrenheit: number };

export type Plant = {
  id: number;
  latin: string;
  family?: string;
  common?: string[];
  category?: string;
  origin?: string;
  climate?: string;
  tempmax?: Temp;
  tempmin?: Temp;
  ideallight?: string;
  toleratedlight?: string;
  watering?: string;
  insects?: string[];
  diseases?: string[];
  use?: string[];
  image?: string;
};

export type UserFilter = {
  light?: string;                         // Light Intensity
  location?: string;                      // (legacy if you use it elsewhere)
  placement?: string;                     // (legacy)
  climate?: string;                       // Local Climate
  aesthetic?: string;                     // Aesthetic Use
  watering?: "Light" | "Moderate" | "Frequent" | string; // Watering Frequency
  category?: string;                      // Category
};

// display name: prefer second common name (e.g., "Amelia")
export const displayName = (p: Plant) =>
  p.common?.[1] ?? p.common?.[0] ?? p.latin;
