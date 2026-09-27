import type { Lecture } from "../types/lecture";

export interface Alert {
  sensor: string;
  humidity: number;
  dryness: number;
  status: "SECO";
  fecha: string;
}

type DryLecture = Lecture & {
  status: "SECO";
};

function isDryLecture(lecture: Lecture): lecture is DryLecture {
  return lecture.status === "SECO";
}

export function generateAlerts(lectures: Lecture[]): Alert[] {
  const dryLectures = lectures.filter(isDryLecture);

  const latestBySensor = new Map<string, DryLecture>();

  for (const lecture of dryLectures) {
    const existing = latestBySensor.get(lecture.sensor);

    if (!existing || new Date(lecture.fecha) > new Date(existing.fecha)) {
      latestBySensor.set(lecture.sensor, lecture);
    }
  }

  return Array.from(latestBySensor.values()).map((lecture) => ({
    sensor: lecture.sensor,
    humidity: lecture.humedad,
    dryness: lecture.sequedad,
    status: lecture.status,
    fecha: lecture.fecha,
  }));
}
