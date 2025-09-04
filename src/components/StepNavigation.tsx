import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
	currentStep: number;
	totalSteps: number;
	onNext: () => void;
	onPrevious: () => void;
	isNextDisabled?: boolean;
	isLoading?: boolean;
}

export function StepNavigation({
	currentStep,
	totalSteps,
	onNext,
	onPrevious,
	isNextDisabled = false,
	isLoading = false,
}: StepNavigationProps) {
	const isFistStep = currentStep === 1;
	const isLastStep = currentStep === totalSteps;

	return (
		<div className="flex justify-between items-center pt-6 border-t border-slate-200">
			{/* Previous Button */}
			<Button
				type="button"
				variant="outline"
				onClick={onPrevious}
				disabled={isFistStep || isLoading}
				className="flex items-center gap-2">
				<ChevronLeft className="w-4 h-4" />
				Previous
			</Button>

			{/* Step Counter */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-slate-500">
					Step {currentStep} of {totalSteps}
				</span>
			</div>

			{/* Next/Submit Button */}
			<Button type="button" onClick={onNext} disabled={isNextDisabled || isLoading} className="flex items-center gap-2">
				{isLastStep ? "Submit" : "Next"}
				{!isLastStep && <ChevronRight className="w-4 h-4" />}
			</Button>
		</div>
	);
}
