import { createSlateEditor } from "platejs";
import type { Value } from "platejs";
import { BaseEditorKit } from "@/components/editor/editor-base-kit";
import { EditorStatic } from "@/components/editor/ui/editor-static";

interface PlateStaticViewerProps {
	value: Value;
}

export function PlateStaticViewer({ value }: PlateStaticViewerProps) {
	const editor = createSlateEditor({
		plugins: BaseEditorKit,
		value,
	});

	return <EditorStatic editor={editor} variant="none" />;
}
