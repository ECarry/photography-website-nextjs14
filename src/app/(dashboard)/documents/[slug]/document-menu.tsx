"use client";

import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

export const DocumentMenu = ({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          // Get the ID from the node's attrs or generate one
          const id = node.attrs.id || `heading-${items.length + 1}`;

          // If the heading doesn't have an ID, add it
          if (!node.attrs.id) {
            editor
              .chain()
              .setNodeSelection(pos)
              .updateAttributes("heading", { id })
              .setTextSelection(pos)
              .run();
          }

          items.push({
            level: node.attrs.level,
            text: node.textContent,
            id,
          });
        }
      });
      setHeadings(items);
    };

    // Initial update
    updateHeadings();

    // Update on content change
    editor.on("update", updateHeadings);

    return () => {
      editor.off("update", updateHeadings);
    };
  }, [editor]);

  const scrollToHeading = (id: string) => {
    if (!editor) return;

    // Find the heading position in the editor
    let headingPos: number | null = null;
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "heading" && node.attrs.id === id) {
        headingPos = pos;
        return false;
      }
    });

    if (headingPos !== null) {
      // Set editor selection to the heading
      editor.commands.setTextSelection(headingPos);
      editor.commands.scrollIntoView();
    }
  };

  return (
    <div className="h-full">
      <div className="p-4">
        <h3 className="text-sm font-medium text-zinc-500 mb-4">Contents</h3>
        <div className="space-y-1">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left px-2 py-1.5 rounded-md hover:bg-zinc-100 text-sm transition-colors
                ${heading.level === 1 ? 'font-semibold text-zinc-900' : 'text-zinc-600'}
                ${heading.level === 2 ? 'pl-4' : ''}
                ${heading.level === 3 ? 'pl-6' : ''}
                ${heading.level > 3 ? 'pl-8' : ''}
              `}
            >
              {heading.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
