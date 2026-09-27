export interface Lecture {
  id: number;
  sensor: string;
  lectura: number | null;
  humedad: number | null;
  sequedad: number | null;
  status: "SECO" | "HUMEDO" | "ADECUADO";
  fecha: string;
}
