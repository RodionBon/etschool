import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

const EVENTS_PER_PAGE = 12;

dotenv.config();

const app = express();
const port = Number(process.env.SERVER_PORT);
app.use(express.json());
app.use(
	cors({ origin: ["https://etschool.vercel.app", "http://localhost:5173"] })
);

app.get("/", (req, res) => {
	res.send("WebSocketサーバーが動作しています");
});

app.get("/events/pagesCount", async (req, res) => {
	const result = await supabase.from("event").select("*");
	if (result.data) {
		res.send({ count: Math.ceil(result.data.length / EVENTS_PER_PAGE) });
	} else {
		res.status(500).send(result.error);
	}
});

app.get("/events/:page", async (req, res) => {
	const page = req.params.page;

	const result = await supabase
		.from("event")
		.select("*")
		.range(
			Number(page) * EVENTS_PER_PAGE,
			(Number(page) + 1) * EVENTS_PER_PAGE
		);
	if (result.data) {
		res.send(result.data);
	} else {
		res.status(500).send(result.error);
	}
});

app.get("/event/:id", async (req, res) => {
	const id = req.params.id;

	const result = await supabase.from("event").select("*").eq("id", id);
	if (result.data) {
		res.send(result.data);
	} else {
		res.status(500).send(result.error);
	}
});

app.get("/participants/:eventId", async (req, res) => {
	const eventId = req.params.eventId;

	const result = await supabase
		.from("participant")
		.select("*")
		.eq("event_id", eventId);
	if (result.data) {
		res.send(result.data);
	} else {
		res.status(500).send(result.error);
	}
});

app.post("/participants", async (req, res) => {
	const result = await supabase
		.from("participant")
		.insert({
			full_name: req.body.fullName,
			email: req.body.email,
			date_of_birth: req.body.dateOfBirth,
			source: req.body.source,
			event_id: req.body.eventId,
		})
		.select();

	if (result.data) {
		res.send(result.data);
	} else {
		res.status(500).send(result.error);
	}
});

app.listen(port, () => {
	console.log(`サーバーがポート${port}で動作中です`);
});

export default app;
