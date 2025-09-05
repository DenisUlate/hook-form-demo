import { z } from "zod";

// Esquema para el Step 1 - Personal Info
export const personalInfoSchema = z.object({
	firstName: z
		.string()
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must be less than 50 characters"),
	lastName: z
		.string()
		.min(2, "Last name must be at least 2 characters")
		.max(50, "Last name must be less than 50 characters"),
	email: z.string().email("Please enter a valid email address"),
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 digits")
		.regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
	dateOfBirth: z.string().min(1, "Date of birth is required"),
});

// Esquema para el Step 2 - Preferences
export const preferencesSchema = z.object({
	interests: z.array(z.string()).min(1, "Please select at least one interest"),
	notificationPreferences: z.object({
		email: z.boolean(),
		sms: z.boolean(),
		push: z.boolean(),
	}),
	theme: z.enum(["light", "dark", "system"], {
		required_error: "Please select a theme preference",
	}),
	language: z.string().min(1, "Please select your preferred language"),
	timezone: z.string().min(1, "Please select your timezone"),
});

// Tipo TypeScript derivado del esquema
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type PreferencesData = z.infer<typeof preferencesSchema>;

// Esquema combinado para todos los pasos
export type WizardFormData = PersonalInfoData & PreferencesData;
