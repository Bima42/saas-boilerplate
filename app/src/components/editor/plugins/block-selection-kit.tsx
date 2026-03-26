"use client";

import { BlockSelectionPlugin } from "@platejs/selection/react";
import { getPluginTypes, KEYS } from "platejs";

import { BlockSelection } from "@/components/editor/ui/block-selection";

export const BlockSelectionKit = [
	BlockSelectionPlugin.configure(({ editor }) => ({
		options: {
			enableContextMenu: true,
			isSelectable: (element) =>
				!getPluginTypes(editor, [KEYS.column, KEYS.codeLine, KEYS.td]).includes(
					element.type,
				),
		},
		render: {
			belowRootNodes: (props) => {
				if (!props.attributes.className?.includes("slate-selectable")) return null;

				// biome-ignore lint/suspicious/noExplicitAny: platejs plugin props are dynamically typed
			return <BlockSelection {...(props as any)} />;
			},
		},
	})),
];
