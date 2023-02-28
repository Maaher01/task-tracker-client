import { Request, Response } from "express";
import { Task } from "../models/task";

import {
	getTaskById,
	getTasks,
	createTask,
	editTask,
	deleteTask,
} from "../utils/task_util";

export const displayTasks = async (res: Response) => {
	try {
		(await getTasks()) as Task;
		return res.status(200).json({
			status: "Success",
		});
	} catch (error) {
		return res.status(500).json({
			status: "failed",
			error: "Unexpected error occured.",
		});
	}
};

export const taskEdit = async (req: Request, res: Response) => {
	const { title, content, status, id } = req.body;
	try {
		const response = (await editTask(title, content, status, id)) as Task;
		if (!response) {
			return res.status(404).json({
				status: "failed",
				error: "Task not found",
			});
		}
		return res.status(200).json({
			status: "Success",
		});
	} catch (error: any) {
		res.status(500).json({
			status: "failed",
			error: error.message,
		});
	}
};

export const addTask = async (req: Request, res: Response) => {
	const { title, content, status } = req.body;
	try {
		(await createTask(title, content, status)) as Task;
		return res.status(200).json({
			status: "Success",
		});
	} catch (error: any) {
		res.status(500).json({
			ststus: "failed",
			error: error.message,
		});
	}
};

export const taskDelete = async (req: Request, res: Response) => {
	const { id } = req.body;
	try {
		(await getTaskById(id)) as Task;
		const response = (await deleteTask(id)) as Task;
		if (!response) {
			return res.status(404).json({
				status: "failed",
				error: "Task does not exist",
			});
		}
		return res.status(200).json({
			status: "Success",
		});
	} catch (error: any) {
		res.status(500).json({
			status: "failed",
			error: error.message,
		});
	}
};
