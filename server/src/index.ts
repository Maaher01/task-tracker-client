import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT = 3000;

//middlewares
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:4200",
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ up: true });
});

app.listen(PORT, async () => {
	console.log(`Sever has started at ${PORT}`);
});
