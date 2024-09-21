import RegistrationForm from "@/components/registration-form";

const EventRegistration = () => {
	return (
		<>
			<div className="flex-container">
				<div className="block">
					<h1 className="page-title">Event registration</h1>
					<div className="self-start">
						<RegistrationForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default EventRegistration;
