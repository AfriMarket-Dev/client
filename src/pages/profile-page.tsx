import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/app/api/users";
import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [image, setImage] = useState("");
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (profile) {
			setName((profile as { name?: string }).name ?? "");
			setPhoneNumber((profile as { phoneNumber?: string }).phoneNumber ?? "");
			setImage((profile as { image?: string }).image ?? "");
		} else if (user) {
			setName(user.name ?? "");
			setPhoneNumber("");
			setImage("");
		}
	}, [profile, user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const id = (profile as { id?: string })?.id ?? user?.id;
		if (!id) return;
		try {
			await updateProfile({
				id,
				data: {
					name: name.trim() || undefined,
					phoneNumber: phoneNumber.trim() || undefined,
					image: image.trim() || undefined,
				},
			}).unwrap();
			setSaved(true);
			setTimeout(() => setSaved(false), 3000);
		} catch (err) {
			console.error(err);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="animate-pulse text-muted-foreground">
					Loading profile...
				</div>
			</div>
		);
	}

	const profileId = (profile as { id?: string })?.id ?? user?.id;
	const email = (profile as { email?: string })?.email ?? user?.email;

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-xl mx-auto px-4 py-8">
				<h1 className="text-2xl font-heading font-bold uppercase text-foreground mb-2">
					Profile
				</h1>
				<p className="text-muted-foreground mb-8">
					Update your account details
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
							Name
						</label>
						<Input
							value={name}
							onChange={(e: any) => setName(e.target.value)}
							className="h-11"
							placeholder="Your name"
						/>
					</div>

					<div>
						<label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
							Email
						</label>
						<Input
							value={email ?? ""}
							disabled
							className="h-11 bg-muted"
							title="Email cannot be changed here"
						/>
						<p className="mt-1 text-xs text-muted-foreground">
							Email cannot be changed from this page.
						</p>
					</div>

					<div>
						<label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
							Phone
						</label>
						<Input
							value={phoneNumber}
							onChange={(e: any) => setPhoneNumber(e.target.value)}
							className="h-11"
							placeholder="+250 ..."
						/>
					</div>

					<div>
						<label className="block text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground mb-2">
							Profile image URL
						</label>
						<Input
							value={image}
							onChange={(e: any) => setImage(e.target.value)}
							className="h-11"
							placeholder="https://..."
						/>
					</div>

					<div className="flex gap-3">
						<Button type="submit" disabled={updating || !profileId}>
							{updating ? "Saving..." : saved ? "Saved" : "Save changes"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
