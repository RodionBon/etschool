import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import IEventRegistrationFields from "@/interfaces/event-registration-fields";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const RegistrationForm = () => {
	const { eventId } = useParams();
	const form = useForm<IEventRegistrationFields>({
		// resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
			dateOfBirth: "",
			source: "",
		},
	});
	const onSubmit = (values: IEventRegistrationFields) => {
		fetch(`http://localhost:3001/participants`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				fullName: values.fullName,
				email: values.email,
				dateOfBirth: values.dateOfBirth,
				source: values.source,
				eventId: Number(eventId),
			}),
		});
	};
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-[400px]"
				>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full name</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date of birth</FormLabel>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="source"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Where did you hear about this event?
								</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="socialMedia"
														id="socialMedia"
													/>
													<Label htmlFor="socialMedia">
														Social media
													</Label>
												</div>
											</FormControl>
										</FormItem>

										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="friends"
														id="friends"
													/>
													<Label htmlFor="friends">
														Friends
													</Label>
												</div>
											</FormControl>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="foundMyself"
														id="foundMyself"
													/>
													<Label htmlFor="foundMyself">
														Found myself
													</Label>
												</div>
											</FormControl>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
};
export default RegistrationForm;
