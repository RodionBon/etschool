import IEvent from "@/interfaces/event";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Props {
	events: IEvent[];
}

const CardList = (props: Props) => {
	return (
		<>
			<div className="grid grid-cols-4 grid-rows-3 gap-[30px]">
				{props.events.map((event) => (
					<Card key={event.id} className="">
						<CardHeader>
							<CardTitle>{event.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								{event.description}
							</CardDescription>
						</CardContent>
						<CardFooter>
							<div className="w-full flex justify-between">
								<Link to={`/registration/${event.id}`}>
									Register
								</Link>
								<Link to={`/participants/${event.id}`}>
									View
								</Link>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
};
export default CardList;
