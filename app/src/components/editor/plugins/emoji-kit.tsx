"use client";

import emojiMartData from "@emoji-mart/data";
import { EmojiInputPlugin, EmojiPlugin } from "@platejs/emoji/react";

import { EmojiInputElement } from "@/components/editor/ui/emoji-node";

export const EmojiKit = [
	EmojiPlugin.configure({
		// biome-ignore lint/suspicious/noExplicitAny: @emoji-mart/data type doesn't match platejs EmojiPlugin expectation
		options: { data: emojiMartData as any },
	}),
	EmojiInputPlugin.withComponent(EmojiInputElement),
];
