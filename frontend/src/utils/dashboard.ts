import type { Lecture } from "../types/lecture";

export function calculateAverageMoisture(lectures: Lecture[]): number {
  if (lectures.length === 0) {
    return 0;
  }

  const total = lectures.reduce((sum, lecture) => sum + lecture.humedad, 0);

  return total / lectures.length;
}

export function calculateMinMoisture(lectures: Lecture[]): number {
  if (lectures.length === 0) {
    return 0;
  }

  return Math.min(...lectures.map((lecture) => lecture.humedad));
}

export function calculateMaxMoisture(lectures: Lecture[]): number {
  if (lectures.length === 0) {
    return 0;
  }

  return Math.max(...lectures.map((lecture) => lecture.humedad));
}

export function calculateMinDryness(lectures: Lecture[]): number {
  if (lectures.length === 0) {
    return 0;
  }

  return Math.min(...lectures.map((lecture) => lecture.sequedad));
}

export function calculateMaxDryness(lectures: Lecture[]): number {
  if (lectures.length === 0) {
    return 0;
  }

  return Math.max(...lectures.map((lecture) => lecture.sequedad));
}
