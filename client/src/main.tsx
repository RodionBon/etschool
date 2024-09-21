import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EventsBoard from "./pages/events-board.tsx";
import "./index.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import EventRegistration from "./pages/event-registration.tsx";
import EventParticipants from "./pages/event-participants.tsx";

const router = createBrowserRouter([
	{
		path: "/events/:page",
		element: <EventsBoard />,
	},
	{
		path: "/registration/:eventId",
		element: <EventRegistration />,
	},
	{
		path: "/participants/:eventId",
		element: <EventParticipants />,
	},
	{
		path: "/",
		element: <Navigate to="/events/0" />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
