import bcrypt from "bcrypt";

export function hashPassword(password: string) {
	return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hashPassword: string) {
	return bcrypt.compare(password, hashPassword);
}
