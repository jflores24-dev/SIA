import type { Lecture } from "../types/lecture";

const API_URL = "http://localhost:3000/api";

export async function getLectures(): Promise<Lecture[]> {
  const response = await fetch(`${API_URL}/lectures`);

  if (!response.ok) {
    throw new Error("Failed to fetch lectures");
  }

  return response.json();
}
