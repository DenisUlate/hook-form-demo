"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, type PersonalInfoData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Calendar } from "lucide-react";

interface PersonalInfoFormProps {
	onSubmit: (data: PersonalInfoData) => void;
	defaultValues?: Partial<PersonalInfoData>;
}

export function PersonalInfoForm({ onSubmit, defaultValues }: PersonalInfoFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<PersonalInfoData>({
		resolver: zodResolver(personalInfoSchema),
		mode: "onChange", // Validación en tiempo real
		defaultValues,
	});

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="text-center mb-6">
				<div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
					<User className="w-6 h-6 text-blue-600" />
				</div>
				<h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
				<p className="text-slate-600 text-sm">Please provide your personal details</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* Full Name */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* First Name */}
					<div className="space-y-2">
						<Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
							First Name
						</Label>
						<div className="relative">
							<Input
								id="firstName"
								{...register("firstName")}
								placeholder="Enter your first name"
								className={`pl-4 ${errors.firstName ? "border-red-500" : ""}`}
							/>
						</div>
						{errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
					</div>

					{/* Last Name */}
					<div className="space-y-2">
						<Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
							Last Name
						</Label>
						<Input
							id="lastName"
							{...register("lastName")}
							placeholder="Enter your last name"
							className={`pl-4 ${errors.lastName ? "border-red-500" : ""}`}
						/>
						{errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
					</div>
				</div>

				{/* Email */}
				<div className="space-y-2">
					<Label htmlFor="email" className="text-sm font-medium text-slate-700">
						Email Address
					</Label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
						<Input
							id="email"
							type="email"
							{...register("email")}
							placeholder="your.email@example.com"
							className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
						/>
					</div>
					{errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
				</div>

				{/* Phone */}
				<div className="space-y-2">
					<Label htmlFor="phone" className="text-sm font-medium text-slate-700">
						Phone Number
					</Label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
						<Input
							id="phone"
							type="tel"
							{...register("phone")}
							placeholder="+1 (555) 123-4567"
							className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
						/>
					</div>
					{errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
				</div>

				{/* Date of Birth */}
				<div className="space-y-2">
					<Label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700">
						Date of Birth
					</Label>
					<div className="relative">
						<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
						<Input
							id="dateOfBirth"
							type="date"
							{...register("dateOfBirth")}
							className={`pl-10 ${errors.dateOfBirth ? "border-red-500" : ""}`}
						/>
					</div>
					{errors.dateOfBirth && <p className="text-xs text-red-600">{errors.dateOfBirth.message}</p>}
				</div>

				{/* Hidden Submit Button - El botón real está en StepNavigation */}
				<Button type="submit" className="hidden">
					Submit
				</Button>
			</form>
		</div>
	);
}
