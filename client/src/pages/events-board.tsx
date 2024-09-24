import CardList from "../components/card-list";
import CardsPagination from "../components/cards-pagination";
import IEvent from "../interfaces/event";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventsBoard = () => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const { page } = useParams();
	const pageNumber = Number(page);
	const [pagesCount, setPagesCount] = useState<number>(0);

	useEffect(() => {
		fetch(`https://etschool-3ap3.vercel.app/events/${page}`)
			.then((response) => response.json())
			.then((data) => setEvents(data))
			.catch((error) => console.error("Error fetching data:", error));

		fetch(`https://etschool-3ap3.vercel.app/events/pagesCount`)
			.then((response) => response.json())
			.then((data) => setPagesCount(data["COUNT"]))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<>
			<div className="flex-container">
				<main className="block">
					<h1 className="page-title">Events</h1>

					<div className="block">
						<CardList events={events} />
					</div>
					<div className="block">
						<CardsPagination
							currentPage={pageNumber}
							pagesCount={pagesCount}
						/>
					</div>
				</main>
			</div>
		</>
	);
};

export default EventsBoard;
