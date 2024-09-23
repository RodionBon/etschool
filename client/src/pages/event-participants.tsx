import IParticipant from "@/interfaces/participant";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventParticipants = () => {
	const { eventId } = useParams();
	const [eventTitle, setEventTitle] = useState<string>("");
	const [participants, setParticipants] = useState<IParticipant[]>([]);

	useEffect(() => {
		fetch(`https://etschool-3ap3.vercel.app/event/${eventId}`)
			.then((response) => response.json())
			.then((data) => setEventTitle(data[0].title))
			.catch((error) => console.error("Error fetching data:", error));

		fetch(`https://etschool-3ap3.vercel.app/participants/${eventId}`)
			.then((response) => response.json())
			.then((data) =>
				setParticipants(
					data.map((participant: any) => {
						return {
							id: participant.id,
							fullName: participant.full_name,
							email: participant.email,
							dateOfBirth: participant.date_of_birth,
							source: participant.source,
							eventId: participant.event_id,
						};
					})
				)
			)
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<>
			<div className="flex-container">
				<main className="block">
					<h1 className="page-title">{eventTitle} participants</h1>
					<div className="grid grid-cols-4 grid-rows-3 gap-[30px]">
						{participants.map((participant) => (
							<Card key={participant.id}>
								<CardHeader>
									<CardTitle>
										{participant.fullName}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription>
										{participant.email}
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</main>
			</div>
		</>
	);
};

export default EventParticipants;
