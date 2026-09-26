import { Router } from "express";

import getLectures from "../controllers/get-lectures.js";
import postLectures from "../controllers/post-lectures.js";

const router = Router();

router.get("/lectures", getLectures);
router.post("/lectures", postLectures);

export default router;
