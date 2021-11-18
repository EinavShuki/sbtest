import express from "express";

const router = express.Router();
import {
  getAllPeople,
  getPeopleByPhone,
  getPeopleByAge,
  getPeopleByName,
} from "../controllers/peopleController.js";

router.get("/", getAllPeople);
router.get("/phone", getPeopleByPhone);
router.get("/age", getPeopleByAge);
router.get("/name", getPeopleByName);

export default router;
