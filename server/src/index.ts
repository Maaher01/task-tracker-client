import Express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./routes/user.routes";
import { connectToDatabase } from "./config/db";

const app: Application = Express();

const PORT = 3000;

//middlewares
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(Express.json());

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, async () => {
	await connectToDatabase();
	console.info(`Sever has started at http://localhost:${PORT}`);
});
