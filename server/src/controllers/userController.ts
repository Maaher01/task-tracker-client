import { Request, Response } from "express";
import { User } from "../models/users";

import { comparePassword, hashPassword } from "../utils/password_util";
import { getUser, createUser, updateUserPassword } from "../utils/user_util";

export const signup = async (req: Request, res: Response) => {
	const { firstname, lastname, email, password } = req.body;

	try {
		let user = await getUser(email);
		if (user) {
			return res
				.status(403)
				.json({ status: "Failed", error: "Email is already in use" });
		}
		const hashedPassword = await hashPassword(password);
		await createUser(firstname, lastname, email, hashedPassword);
		return res.status(200).json({
			status: "Success",
		});
	} catch (err: any) {
		console.error(err);
		res.status(500).json({
			status: "failed",
			error: err.message,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = (await getUser(email)) as User;
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "User does not exist",
			});
		}
		const compareResult = await comparePassword(password, user.password);
		if (!compareResult) {
			return res.status(404).json({
				status: "failed",
				error: "Incorrect password",
			});
		}
		return res.status(200).json({
			status: "Success",
		});
	} catch (err: any) {
		console.error(err);
		res.status(500).json({
			status: "failed",
			error: err.message,
		});
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	const { email, newPassword } = req.body;

	try {
		let user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "No user found with this email",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await updateUserPassword(user.email, hashedPassword);
		return res.status(200).json({
			status: "Success",
		});
	} catch (err: any) {
		res.status(500).json({
			status: "failed",
			error: "Failed to change password please try again later",
		});
	}
};
