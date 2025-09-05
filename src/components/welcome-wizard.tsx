"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import ProgressIndicator from "./ProgressIndicator";
import { StepNavigation } from "./StepNavigation";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { PreferencesForm } from "./forms/PreferencesForm";
import { ReviewForm } from "./forms/ReviewForm";
import { ProfileSetupForm } from "./forms/ProfileSetupForm";
import { PreferencesData, ProfileSetupData, WizardFormData, type PersonalInfoData } from "@/lib/validation";

const steps = [
	{ id: 1, title: "Personal Info", description: "Tell us about yourself" },
	{ id: 2, title: "Preferences", description: "Customize your experience" },
	{ id: 3, title: "Profile Setup", description: "Complete your profile" },
	{ id: 4, title: "Review", description: "Review and submit" },
];

export function WelcomeWizard() {
	// Estado para rastrear si el asistente está completo
	const [isCompleted, setIsCompleted] = useState(false);
	// Estado para rastrear el paso actual
	const [currentStep, setCurrentStep] = useState(1);
	// Estado para almacenar los datos del formulario
	const [formData, setFormData] = useState<Partial<WizardFormData>>({});

	// Función para manejar el envío del formulario del paso 1
	const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
		setFormData((prev) => ({ ...prev, ...data }));
		console.log("Personal Info Data:", data); // Para debug
		setCurrentStep((prev) => Math.min(prev + 1, steps.length));
	};

	// Función para manejar el envío del formulario del paso 2
	const handlePreferencesSubmit = (data: PreferencesData) => {
		setFormData((prev) => ({ ...prev, ...data }));
		console.log("Preferences Data:", data); // Para debug
		console.log("Combined Data:", { ...formData, ...data });
		setCurrentStep((prev) => Math.min(prev + 1, steps.length));
	};

	// Función para manejar el envío del formulario del paso 3
	const handleProfileSetupSubmit = (data: ProfileSetupData) => {
		setFormData((prev) => ({ ...prev, ...data }));
		console.log("Profile Setup Data:", data);
		console.log("Combined Data:", { ...formData, ...data });
		setCurrentStep((prev) => Math.min(prev + 1, steps.length));
	};

	// Funcion para manejar el envío del formulario del paso 4 (Revisión)
	const handleFinalSubmit = () => {
		console.log("🎉 Final submission complete!", formData);
		setIsCompleted(true);
	};

	// Función para editar un paso específico desde Review
	const handleEditStep = (step: number) => {
		setCurrentStep(step);
	};

	// Renderizar el contenido del paso actual
	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} defaultValues={formData} />;
			case 2:
				return <PreferencesForm onSubmit={handlePreferencesSubmit} defaultValues={formData} />;
			case 3:
				return <ProfileSetupForm onSubmit={handleProfileSetupSubmit} defaultValues={formData} />;
			case 4:
				return <ReviewForm formData={formData} onSubmit={handleFinalSubmit} onEdit={handleEditStep} />;
			default:
				return <div>Step not found</div>;
		}
	};

	// No mostrar navegación si está completado o en el paso de review
	const showNavigation = !isCompleted && currentStep !== 4;

	return (
		<Card className="shadow-xl border-0 bg-zinc-100">
			<CardHeader className="text-center pb-2">
				<h1 className="text-2xl font-bold text-slate-800">Welcome Wizard</h1>
				<p className="text-slate-600">Let's get you set up in just a few steps</p>

				<ProgressIndicator steps={steps} currentStep={currentStep} />
			</CardHeader>

			<CardContent className="pt-6">
				{/* Contenido dinámico del paso actual */}
				<div className="min-h-[500px]">{renderStepContent()}</div>

				{/* Mostrar navegación solo cuando sea necesario */}
				{showNavigation && (
					<StepNavigation
						currentStep={currentStep}
						totalSteps={steps.length}
						onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
						onPrevious={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
					/>
				)}
			</CardContent>
		</Card>
	);
}
