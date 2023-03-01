import { Router } from "express";
import {
	displayUserTasks,
	taskEdit,
	addTask,
	taskDelete,
} from "../controllers/taskController";

const router = Router();

router.get("/", displayUserTasks);
router.post("/", addTask);
router.delete("/:id", taskDelete);
router.put("/", taskEdit);

export default router;
