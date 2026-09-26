import type { Request, Response } from "express";

import db from "../db/client.js";

import { lecturesTable } from "../db/schema.js";

const postLectures = async (request: Request, response: Response) => {
  try {
    const data = request.body;

    console.log(data);

    const parsedData: typeof lecturesTable.$inferInsert = {
      sensorId: data.sensorId,
      lectura: data.lectura,
      humedad: data.humedad,
      sequedad: data.sequedad,
      status: data.status,
    };

    await db.insert(lecturesTable).values(parsedData);
    console.log("Lecture saved");

    response.status(200).end();
  } catch (error) {
    if (error instanceof Error) {
      console.error("MESSAGE", error.message);
      console.error("CAUSE", error.cause);
    }
  }
};

export default postLectures;
