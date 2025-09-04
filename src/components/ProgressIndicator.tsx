import { Check } from "lucide-react";

interface Step {
	id: number;
	title: string;
	description: string;
}

interface ProgressIndicatorProps {
	steps: Step[];
	currentStep: number;
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
	return (
		<div className="w-full py-6">
			<div className="flex items-center justify-between mb-4">
				{steps.map((step, index) => {
					return (
						<div key={step.id} className="flex items-center">
							{/* Step Circle */}
							<div className="flex flex-col items-center">
								<div
									className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out ${
										step.id < currentStep
											? "bg-green-500 border-blue-500 text-white"
											: step.id === currentStep
											? "bg-blue-500 border-blue-500 text-white"
											: "bg-white border-slate-300 text-slate-400"
									}`}>
									{step.id < currentStep ? (
										<Check className="w-5 h-5" />
									) : (
										<span className="text-sm font-semibold">{step.id}</span>
									)}
								</div>

								{/* Step Title */}
								<div className="mt-2 text-center">
									<p className={`text-xs font-medium ${step.id <= currentStep ? "text-slate-700" : "text-slate-400"}`}>
										{step.title}
									</p>
								</div>
							</div>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div
									className={`
                                    flex-1 h-0.5 mx-4 transition-all duration-300
                                    ${step.id < currentStep ? "bg-green-500" : "bg-slate-300"}
                                `}
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Current Step Descriptions */}
			<div className="text-center">
				<p className="text-sm text-slate-600">{steps.find((step) => step.id === currentStep)?.description}</p>
			</div>
		</div>
	);
}
