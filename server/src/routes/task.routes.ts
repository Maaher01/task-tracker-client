import { Router } from "express";
import {
	displayTasks,
	taskEdit,
	addTask,
	taskDelete,
} from "../controllers/taskController";

const router = Router();

router.get("/", displayTasks);
router.post("/add", addTask);
router.delete("/:id", taskDelete);
router.put("/", taskEdit);

export default router;
