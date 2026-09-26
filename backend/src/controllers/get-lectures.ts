import type { Request, Response } from "express";

import db from "../db/client.js";

import { lecturesTable } from "../db/schema.js";

const getLectures = async (request: Request, response: Response) => {
  const lectures = await db.select().from(lecturesTable);

  response.status(200).json(lectures);
};

export default getLectures;
