"use client";

import { useState } from "react";
import { WelcomeWizard } from "@/components/welcome-wizard";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<WelcomeWizard />
			</div>
		</main>
	);
}
