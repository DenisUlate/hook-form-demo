"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import ProgressIndicator from "./ProgressIndicator";

const steps = [
	{ id: 1, title: "Personal Info", description: "Tell us about yourself" },
	{ id: 2, title: "Preferences", description: "Customize your experience" },
	{ id: 3, title: "Profile Setup", description: "Complete your profile" },
	{ id: 4, title: "Review", description: "Review and submit" },
];

export function WelcomeWizard() {
	const [currentStep, setCurrentStep] = useState(1);

	<Card className="shadow-xl border-0">
		<CardHeader className="text-center pb-2">
			<h1 className="text-2xl font-bold text-slate-800">Welcome Wizard</h1>
			<p className="text-slate-600">Let's get you set up in just a few steps</p>

			<ProgressIndicator steps={steps} currentStep={currentStep} />
		</CardHeader>

		<CardContent className="pt-6">
			{/* Step content will go here */}
			<div>
				<p>Step {currentStep} content</p>
			</div>

			<StepNavigation
				currentStep={currentStep}
				totalSteps={steps.length}
				onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length))}
				onPrevious={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
			/>
		</CardContent>
	</Card>;
}
