/** Зоны выкупа на карте Читы [широта, долгота] */
export interface ServiceDistrict {
  id: string;
  name: string;
  color: string;
  fillOpacity: number;
  polygon: [number, number][];
}

export const SERVICE_DISTRICTS: ServiceDistrict[] = [
  {
    id: "central",
    name: "Центральный",
    color: "#d4af37",
    fillOpacity: 0.35,
    polygon: [
      [52.026, 113.488],
      [52.026, 113.512],
      [52.04, 113.512],
      [52.04, 113.488],
    ],
  },
  {
    id: "severny",
    name: "Северный",
    color: "#2AABEE",
    fillOpacity: 0.32,
    polygon: [
      [52.04, 113.478],
      [52.04, 113.528],
      [52.058, 113.528],
      [52.058, 113.478],
    ],
  },
  {
    id: "chernovsky",
    name: "Черновский",
    color: "#34c759",
    fillOpacity: 0.32,
    polygon: [
      [52.008, 113.458],
      [52.008, 113.492],
      [52.028, 113.492],
      [52.028, 113.458],
    ],
  },
  {
    id: "ingodinsky",
    name: "Ингодинский",
    color: "#bf5af2",
    fillOpacity: 0.32,
    polygon: [
      [52.018, 113.512],
      [52.018, 113.558],
      [52.048, 113.558],
      [52.048, 113.512],
    ],
  },
];

export const CHITA_MAP_CENTER: [number, number] = [52.033, 113.505];
export const CHITA_MAP_ZOOM = 12;
