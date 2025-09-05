"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WizardFormData } from "@/lib/validation";
import {
	User,
	Mail,
	Phone,
	Calendar,
	Settings,
	Globe,
	Bell,
	Palette,
	Clock,
	Twitter,
	Linkedin,
	Github,
	Eye,
	EyeOff,
	Users,
	Edit,
	CheckCircle,
	Send,
} from "lucide-react";
import { useState } from "react";

interface ReviewFormProps {
	formData: Partial<WizardFormData>;
	onSubmit: () => void;
	onEdit: (step: number) => void;
}

export function ReviewForm({ formData, onSubmit, onEdit }: ReviewFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Función para manejar el envío final
	const handleFinalSubmit = async () => {
		setIsSubmitting(true);

		// Simular envío al servidor
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			console.log("Final form submission:", formData);
			onSubmit();
		} catch (error) {
			console.error("Submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Función para formatear la fecha
	const formatDate = (dateString: string) => {
		if (!dateString) return "Not provided";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Función para formatear las preferencias de notificación
	const formatNotificationPrefs = () => {
		const prefs = formData.notificationPreferences;
		if (!prefs) return [];

		const enabled = [];
		if (prefs.email) enabled.push("Email");
		if (prefs.sms) enabled.push("SMS");
		if (prefs.push) enabled.push("Push");

		return enabled;
	};

	// Función para obtener el icono de visibilidad
	const getVisibilityIcon = (visibility: string) => {
		switch (visibility) {
			case "public":
				return <Eye className="w-4 h-4" />;
			case "friends":
				return <Users className="w-4 h-4" />;
			case "private":
				return <EyeOff className="w-4 h-4" />;
			default:
				return <Eye className="w-4 h-4" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center mb-6">
				<div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
					<CheckCircle className="w-6 h-6 text-emerald-600" />
				</div>
				<h2 className="text-xl font-semibold text-slate-800">Review Your Information</h2>
				<p className="text-slate-600 text-sm">Please review all information before submitting</p>
			</div>

			{/* Personal Information Section */}
			<Card className="border-l-4 border-l-blue-500">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2">
							<User className="w-5 h-5 text-blue-600" />
							Personal Information
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onEdit(1)}
							className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
							<Edit className="w-4 h-4" />
							Edit
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex items-center gap-3">
							<User className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Full Name</p>
								<p className="font-medium">
									{formData.firstName} {formData.lastName}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Calendar className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Date of Birth</p>
								<p className="font-medium">{formatDate(formData.dateOfBirth || "")}</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Mail className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Email</p>
								<p className="font-medium">{formData.email}</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Phone className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Phone</p>
								<p className="font-medium">{formData.phone}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Preferences Section */}
			<Card className="border-l-4 border-l-purple-500">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2">
							<Settings className="w-5 h-5 text-purple-600" />
							Preferences
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onEdit(2)}
							className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
							<Edit className="w-4 h-4" />
							Edit
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Interests */}
					<div>
						<p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
							<Globe className="w-4 h-4" />
							Interests
						</p>
						<div className="flex flex-wrap gap-2">
							{formData.interests?.map((interest) => (
								<Badge key={interest} variant="secondary" className="capitalize">
									{interest}
								</Badge>
							))}
						</div>
					</div>

					<Separator />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Theme */}
						<div className="flex items-center gap-3">
							<Palette className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Theme</p>
								<p className="font-medium capitalize">{formData.theme}</p>
							</div>
						</div>

						{/* Language */}
						<div className="flex items-center gap-3">
							<Globe className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Language</p>
								<p className="font-medium">{formData.language?.toUpperCase()}</p>
							</div>
						</div>

						{/* Timezone */}
						<div className="flex items-center gap-3">
							<Clock className="w-4 h-4 text-slate-500" />
							<div>
								<p className="text-sm text-slate-600">Timezone</p>
								<p className="font-medium">{formData.timezone}</p>
							</div>
						</div>
					</div>

					<Separator />

					{/* Notifications */}
					<div>
						<p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
							<Bell className="w-4 h-4" />
							Notifications
						</p>
						<div className="flex flex-wrap gap-2">
							{formatNotificationPrefs().map((pref) => (
								<Badge key={pref} variant="outline">
									{pref}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Profile Setup Section */}
			<Card className="border-l-4 border-l-green-500">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg flex items-center gap-2">
							<User className="w-5 h-5 text-green-600" />
							Profile Setup
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onEdit(3)}
							className="flex items-center gap-1 text-green-600 hover:text-green-700">
							<Edit className="w-4 h-4" />
							Edit
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Avatar and Display Name */}
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
							{formData.avatar ? (
								<img src={formData.avatar} alt="Profile avatar" className="w-full h-full object-cover" />
							) : (
								<User className="w-8 h-8 text-slate-400" />
							)}
						</div>
						<div>
							<p className="text-sm text-slate-600">Display Name</p>
							<p className="font-medium text-lg">{formData.displayName}</p>
						</div>
					</div>

					{/* Bio */}
					{formData.bio && (
						<div>
							<p className="text-sm text-slate-600 mb-1">Bio</p>
							<p className="text-slate-700 italic">"{formData.bio}"</p>
						</div>
					)}

					<Separator />

					{/* Website and Social Media */}
					<div className="space-y-3">
						{formData.website && (
							<div className="flex items-center gap-3">
								<Globe className="w-4 h-4 text-slate-500" />
								<div>
									<p className="text-sm text-slate-600">Website</p>
									<a
										href={formData.website}
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium text-blue-600 hover:underline">
										{formData.website}
									</a>
								</div>
							</div>
						)}

						{/* Social Media Links */}
						<div className="flex gap-4">
							{formData.socialMedia?.twitter && (
								<div className="flex items-center gap-2">
									<Twitter className="w-4 h-4 text-blue-400" />
									<span className="text-sm">{formData.socialMedia.twitter}</span>
								</div>
							)}
							{formData.socialMedia?.linkedin && (
								<div className="flex items-center gap-2">
									<Linkedin className="w-4 h-4 text-blue-600" />
									<span className="text-sm">{formData.socialMedia.linkedin}</span>
								</div>
							)}
							{formData.socialMedia?.github && (
								<div className="flex items-center gap-2">
									<Github className="w-4 h-4 text-gray-700" />
									<span className="text-sm">{formData.socialMedia.github}</span>
								</div>
							)}
						</div>
					</div>

					<Separator />

					{/* Profile Visibility */}
					<div className="flex items-center gap-3">
						{getVisibilityIcon(formData.profileVisibility || "public")}
						<div>
							<p className="text-sm text-slate-600">Profile Visibility</p>
							<p className="font-medium capitalize">{formData.profileVisibility}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Submit Section */}
			<Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
				<CardContent className="pt-6">
					<div className="text-center space-y-4">
						<div className="flex items-center justify-center gap-2 text-slate-700">
							<CheckCircle className="w-5 h-5 text-green-600" />
							<span className="font-medium">Ready to submit your information?</span>
						</div>
						<p className="text-sm text-slate-600 max-w-md mx-auto">
							By submitting this form, you agree to our terms of service and privacy policy. You can always update your
							information later.
						</p>
						<Button
							onClick={handleFinalSubmit}
							disabled={isSubmitting}
							className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							size="lg">
							{isSubmitting ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Submitting...
								</>
							) : (
								<>
									<Send className="w-4 h-4 mr-2" />
									Submit Application
								</>
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
