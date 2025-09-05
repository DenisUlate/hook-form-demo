"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSetupSchema, type ProfileSetupData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { User, Upload, Globe, Twitter, Linkedin, Github, Eye, EyeOff, Users } from "lucide-react";
import { useState, useRef } from "react";

interface ProfileSetupFormProps {
	onSubmit: (data: ProfileSetupData) => void;
	defaultValues?: Partial<ProfileSetupData>;
}

export function ProfileSetupForm({ onSubmit, defaultValues }: ProfileSetupFormProps) {
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isValid, isSubmitting },
	} = useForm<ProfileSetupData>({
		resolver: zodResolver(profileSetupSchema),
		defaultValues: {
			displayName: "",
			bio: "",
			website: "",
			socialMedia: {
				twitter: "",
				linkedin: "",
				github: "",
			},
			profileVisibility: "public",
			avatar: "",
			...defaultValues,
		},
		mode: "onChange",
	});

	// Función para manejar la carga de avatar
	const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validar tamaño (máximo 5MB)
			if (file.size > 5 * 1024 * 1024) {
				alert("File size must be less than 5MB");
				return;
			}

			// Validar tipo de archivo
			if (!file.type.startsWith("image/")) {
				alert("Please select an image file");
				return;
			}

			// Crear preview
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				setAvatarPreview(result);
				setValue("avatar", result); // Guardar en el formulario
			};
			reader.readAsDataURL(file);
		}
	};

	// Función para remover avatar
	const handleRemoveAvatar = () => {
		setAvatarPreview(null);
		setValue("avatar", "");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Observar el bio para contar caracteres
	const bioValue = watch("bio");

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center mb-6">
				<div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
					<User className="w-6 h-6 text-green-600" />
				</div>
				<h2 className="text-xl font-semibold text-slate-800">Profile Setup</h2>
				<p className="text-slate-600 text-sm">Complete your profile information</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Avatar Upload Section */}
				<div className="space-y-4">
					<Label className="text-sm font-medium text-slate-700">Profile Picture</Label>
					<div className="flex items-center gap-4">
						{/* Avatar Preview */}
						<div className="relative">
							<div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50">
								{avatarPreview ? (
									<img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
								) : (
									<User className="w-8 h-8 text-slate-400" />
								)}
							</div>
						</div>

						{/* Upload Controls */}
						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => fileInputRef.current?.click()}
								className="flex items-center gap-2">
								<Upload className="w-4 h-4" />
								Upload
							</Button>
							{avatarPreview && (
								<Button type="button" variant="outline" size="sm" onClick={handleRemoveAvatar}>
									Remove
								</Button>
							)}
						</div>

						{/* Hidden File Input */}
						<input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
					</div>
					<p className="text-xs text-slate-500">Upload a profile picture (JPG, PNG, max 5MB)</p>
				</div>

				{/* Display Name */}
				<div className="space-y-2">
					<Label htmlFor="displayName" className="text-sm font-medium text-slate-700">
						Display Name <span className="text-red-500">*</span>
					</Label>
					<Input
						id="displayName"
						{...register("displayName")}
						placeholder="How should we call you?"
						className={errors.displayName ? "border-red-500" : ""}
					/>
					{errors.displayName && <p className="text-xs text-red-600">{errors.displayName.message}</p>}
				</div>

				{/* Bio */}
				<div className="space-y-2">
					<Label htmlFor="bio" className="text-sm font-medium text-slate-700">
						Bio
					</Label>
					<Textarea
						id="bio"
						{...register("bio")}
						placeholder="Tell us a bit about yourself..."
						rows={4}
						className={`resize-none ${errors.bio ? "border-red-500" : ""}`}
					/>
					<div className="flex justify-between items-center">
						{errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
						<p className="text-xs text-slate-500 ml-auto">{bioValue?.length || 0}/500 characters</p>
					</div>
				</div>

				{/* Website */}
				<div className="space-y-2">
					<Label htmlFor="website" className="text-sm font-medium text-slate-700">
						Website
					</Label>
					<div className="relative">
						<Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
						<Input
							id="website"
							{...register("website")}
							placeholder="https://yourwebsite.com"
							className={`pl-10 ${errors.website ? "border-red-500" : ""}`}
						/>
					</div>
					{errors.website && <p className="text-xs text-red-600">{errors.website.message}</p>}
				</div>

				{/* Social Media Links */}
				<div className="space-y-4">
					<Label className="text-sm font-medium text-slate-700">Social Media (Optional)</Label>

					<div className="grid grid-cols-1 gap-4">
						{/* Twitter */}
						<div className="space-y-2">
							<Label htmlFor="twitter" className="text-xs text-slate-600">
								Twitter
							</Label>
							<div className="relative">
								<Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
								<Input
									id="twitter"
									{...register("socialMedia.twitter")}
									placeholder="@yourusername"
									className="pl-10"
								/>
							</div>
						</div>

						{/* LinkedIn */}
						<div className="space-y-2">
							<Label htmlFor="linkedin" className="text-xs text-slate-600">
								LinkedIn
							</Label>
							<div className="relative">
								<Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
								<Input
									id="linkedin"
									{...register("socialMedia.linkedin")}
									placeholder="linkedin.com/in/yourusername"
									className="pl-10"
								/>
							</div>
						</div>

						{/* GitHub */}
						<div className="space-y-2">
							<Label htmlFor="github" className="text-xs text-slate-600">
								GitHub
							</Label>
							<div className="relative">
								<Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
								<Input
									id="github"
									{...register("socialMedia.github")}
									placeholder="github.com/yourusername"
									className="pl-10"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Profile Visibility */}
				<div className="space-y-4">
					<Label className="text-sm font-medium text-slate-700">
						Profile Visibility <span className="text-red-500">*</span>
					</Label>

					<Controller
						name="profileVisibility"
						control={control}
						render={({ field }) => (
							<RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-3">
								<Card className="p-4 border-2 hover:border-blue-200 transition-colors">
									<div className="flex items-center space-x-3">
										<RadioGroupItem value="public" id="public" />
										<div className="flex-1">
											<Label htmlFor="public" className="cursor-pointer font-medium">
												<div className="flex items-center gap-2">
													<Eye className="w-4 h-4" />
													Public
												</div>
											</Label>
											<p className="text-xs text-slate-500 mt-1">Anyone can view your profile</p>
										</div>
									</div>
								</Card>

								<Card className="p-4 border-2 hover:border-blue-200 transition-colors">
									<div className="flex items-center space-x-3">
										<RadioGroupItem value="friends" id="friends" />
										<div className="flex-1">
											<Label htmlFor="friends" className="cursor-pointer font-medium">
												<div className="flex items-center gap-2">
													<Users className="w-4 h-4" />
													Friends Only
												</div>
											</Label>
											<p className="text-xs text-slate-500 mt-1">Only your friends can view your profile</p>
										</div>
									</div>
								</Card>

								<Card className="p-4 border-2 hover:border-blue-200 transition-colors">
									<div className="flex items-center space-x-3">
										<RadioGroupItem value="private" id="private" />
										<div className="flex-1">
											<Label htmlFor="private" className="cursor-pointer font-medium">
												<div className="flex items-center gap-2">
													<EyeOff className="w-4 h-4" />
													Private
												</div>
											</Label>
											<p className="text-xs text-slate-500 mt-1">Only you can view your profile</p>
										</div>
									</div>
								</Card>
							</RadioGroup>
						)}
					/>
					{errors.profileVisibility && <p className="text-xs text-red-600">{errors.profileVisibility.message}</p>}
				</div>

				{/* Hidden Submit Button */}
				<Button type="submit" className="hidden">
					Submit
				</Button>
			</form>
		</div>
	);
}
