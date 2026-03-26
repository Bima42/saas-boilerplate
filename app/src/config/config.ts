export type LanguageCode = "en" | "fr";
export const LANGUAGE_NAMES: Record<LanguageCode, { name: string; icon: string }> = {
	en: {
		name: "English",
		icon: "🇬🇧",
	},
	fr: {
		name: "Français",
		icon: "🇫🇷",
	},
} as const;

export const LOGGED_HOME_PATH = "/dashboard";
