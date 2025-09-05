"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema, type PreferencesData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Palette, Globe, Clock } from "lucide-react";

//Opciones de intereses
const interestOptions = [
	{ id: "technology", label: "Technology" },
	{ id: "design", label: "Design" },
	{ id: "business", label: "Business" },
	{ id: "science", label: "Science" },
	{ id: "sports", label: "Sports" },
	{ id: "music", label: "Music" },
	{ id: "travel", label: "Travel" },
	{ id: "cooking", label: "Cooking" },
];

// Opciones de idiomas
const languageOptions = [
	{ value: "en", label: "English" },
	{ value: "es", label: "Español" },
	{ value: "fr", label: "Français" },
	{ value: "de", label: "Deutsch" },
	{ value: "it", label: "Italiano" },
];

// Opciones de zona horaria
const timezoneOptions = [
	{ value: "UTC-8", label: "Pacific Time (UTC-8)" },
	{ value: "UTC-6", label: "Central Time (UTC-6)" },
	{ value: "UTC-5", label: "Eastern Time (UTC-5)" },
	{ value: "UTC+0", label: "Greenwich Mean Time (UTC+0)" },
	{ value: "UTC+1", label: "Central European Time (UTC+1)" },
];

interface PreferencesFormProps {
	onSubmit: (data: PreferencesData) => void;
	defaultValues?: Partial<PreferencesData>;
}

export function PreferencesForm({ onSubmit, defaultValues }: PreferencesFormProps) {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isValid, isSubmitting },
	} = useForm<PreferencesData>({
		resolver: zodResolver(preferencesSchema),
		defaultValues: {
			interests: [],
			notificationPreferences: {
				email: false,
				sms: false,
				push: false,
			},
			theme: "system",
			language: "en",
			timezone: "UTC-5",
			...defaultValues,
		},
		mode: "onChange", // Validación en cada cambio
	});

	// Observar valores actuales para la UI
	const watchedInterests = watch("interests");

	return (
		<div className="space-y-6">
			{/* HEADER */}
			<div className="text-center mb-6">
				<div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rouned-full mb-4">
					<Settings className="mx-auto mb-2 h-6 w-6 text-purple-600" />
				</div>
				<h2 className="text-xl font-semibold text-slate-800">Preferences</h2>
				<p className="text-slate-600 text-sm">Customize your experience</p>
			</div>

			<form>
				{/* INTERESES SECTION */}
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Globe className="w-4 h-4 text-slate-600" />
						<Label className="text-sm font-medium text-slate-700">Interests</Label>
					</div>
					<p className="text-xs text-slate-500">Select your areas of interest (at least one)</p>

					<Controller
						name="interests"
						control={control}
						render={({ field }) => (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
								{interestOptions.map((interest) => (
									<div key={interest.id} className="flex items-center space-x-2">
										<Checkbox
											id={interest.id}
											checked={field.value?.includes(interest.id)}
											onCheckedChange={(checked) => {
												if (checked) {
													field.onChange([...(field.value || []), interest.id]);
												} else {
													field.onChange(field.value?.filter((item) => item !== interest.id));
												}
											}}
										/>
										<Label htmlFor={interest.id} className="text-sm font-normal cursor-pointer">
											{interest.label}
										</Label>
									</div>
								))}
							</div>
						)}
					/>
					{errors.interests && <p className="text-xs text-red-600">{errors.interests.message}</p>}
				</div>

				{/* NOTIFICATION PREFERENCES */}
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Bell className="w-4 h-4 text-slate-600" />
						<Label className="text-sm font-medium text-slate-700">Notification Preferences</Label>
					</div>
					<p className="text-xs text-slate-500">Choose how you'd like to receive notifications</p>

					<div className="space-y-3">
						<Controller
							name="notificationPreferences.email"
							control={control}
							render={({ field }) => (
								<div className="flex items-center space-x-2">
									<Checkbox id="email-notifications" checked={field.value} onCheckedChange={field.onChange} />
									<Label htmlFor="email-notifications" className="text-sm cursor-pointer">
										Email notifications
									</Label>
								</div>
							)}
						/>

						<Controller
							name="notificationPreferences.sms"
							control={control}
							render={({ field }) => (
								<div className="flex items-center space-x-2">
									<Checkbox id="sms-notifications" checked={field.value} onCheckedChange={field.onChange} />
									<Label htmlFor="sms-notifications" className="text-sm cursor-pointer">
										SMS notifications
									</Label>
								</div>
							)}
						/>

						<Controller
							name="notificationPreferences.push"
							control={control}
							render={({ field }) => (
								<div className="flex items-center space-x-2">
									<Checkbox id="push-notifications" checked={field.value} onCheckedChange={field.onChange} />
									<Label htmlFor="push-notifications" className="text-sm cursor-pointer">
										Push notifications
									</Label>
								</div>
							)}
						/>
					</div>
				</div>

				{/* Theme Preference */}
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Palette className="w-4 h-4 text-slate-600" />
						<Label className="text-sm font-medium text-slate-700">Theme Preference</Label>
					</div>

					<Controller
						name="theme"
						control={control}
						render={({ field }) => (
							<RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="light" id="light" />
									<Label htmlFor="light" className="cursor-pointer">
										Light
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="dark" id="dark" />
									<Label htmlFor="dark" className="cursor-pointer">
										Dark
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="system" id="system" />
									<Label htmlFor="system" className="cursor-pointer">
										System
									</Label>
								</div>
							</RadioGroup>
						)}
					/>
					{errors.theme && <p className="text-xs text-red-600">{errors.theme.message}</p>}
				</div>

				{/* Language and Timezone */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Language */}
					<div className="space-y-2">
						<Label className="text-sm font-medium text-slate-700">Language</Label>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Select language" />
									</SelectTrigger>
									<SelectContent>
										{languageOptions.map((lang) => (
											<SelectItem key={lang.value} value={lang.value}>
												{lang.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.language && <p className="text-xs text-red-600">{errors.language.message}</p>}
					</div>

					{/* Timezone */}
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-slate-600" />
							<Label className="text-sm font-medium text-slate-700">Timezone</Label>
						</div>
						<Controller
							name="timezone"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Select timezone" />
									</SelectTrigger>
									<SelectContent>
										{timezoneOptions.map((tz) => (
											<SelectItem key={tz.value} value={tz.value}>
												{tz.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.timezone && <p className="text-xs text-red-600">{errors.timezone.message}</p>}
					</div>
				</div>

				{/* Hidden Submit Button */}
				<Button type="submit" className="hidden">
					Submit
				</Button>
			</form>
		</div>
	);
}
