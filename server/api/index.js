"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const EVENTS_PER_PAGE = 12;
dotenv_1.default.config();
const connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
const app = (0, express_1.default)();
const port = Number(process.env.SERVER_PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:4173", "https://etschool.vercel.app"],
}));
app.get("/", (req, res) => {
    res.send("WebSocketサーバーが動作しています");
});
app.get("/events/pagesCount", (req, res) => {
    connection.query("SELECT CEIL(COUNT(*)/?) as COUNT FROM et.event", EVENTS_PER_PAGE, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            res.send(err);
        }
    });
});
app.get("/events/:page", (req, res) => {
    connection.query("SELECT * FROM event LIMIT ? OFFSET ? ", [EVENTS_PER_PAGE, Number(req.params.page) * EVENTS_PER_PAGE], (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            res.send(err);
        }
    });
});
app.get("/event/:id", (req, res) => {
    connection.query("SELECT * FROM event WHERE id = (?)", req.params.id, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            res.send(err);
        }
    });
});
app.get("/participants/:eventId", (req, res) => {
    connection.query("SELECT * FROM participant WHERE event_id = (?)", req.params.eventId, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            res.send(err);
        }
    });
});
app.post("/participants", (req, res) => {
    const query = "INSERT INTO participant (full_name, email, date_of_birth, source, event_id) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.fullName,
        req.body.email,
        req.body.dateOfBirth,
        req.body.source,
        req.body.eventId,
    ];
    connection.query(query, values, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            res.send(err);
        }
    });
});
app.listen(port, () => {
    console.log(`サーバーがポート${port}で動作中です`);
});
