"use client";

import { useEffect, useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { usePathname } from "next/navigation";

interface HeadingNode {
  level: number;
  text: string;
  pos: number;
  id: string;
}

interface Props {
  editor: Editor | null;
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-") // Support Chinese characters
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const DocumentMenu = ({ editor }: Props) => {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<HeadingNode[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingNode[] = [];
      const usedSlugs = new Set<string>();

      editor.state.doc.forEach((node: Node, pos: number) => {
        if (node.type.name === "heading") {
          let slug = generateSlug(node.textContent);
          
          // Handle duplicate slugs
          if (usedSlugs.has(slug)) {
            let counter = 1;
            while (usedSlugs.has(`${slug}-${counter}`)) {
              counter++;
            }
            slug = `${slug}-${counter}`;
          }
          
          usedSlugs.add(slug);

          items.push({
            level: node.attrs.level as number,
            text: node.textContent,
            pos,
            id: slug,
          });
        }
      });

      setHeadings(items);
    };

    updateHeadings();
    editor.on("update", updateHeadings);

    return () => {
      editor.off("update", updateHeadings);
    };
  }, [editor]);

  const scrollToHeading = useCallback((heading: HeadingNode) => {
    if (!editor) return;
    
    const pos = heading.pos;
    const top = editor.view.coordsAtPos(pos).top;
    if (typeof top === "number") {
      window.scrollTo({
        top: top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
    setActiveId(heading.id);
    window.history.pushState(null, "", `${pathname}#${heading.id}`);
  }, [editor, pathname]);

  // Handle initial URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && editor) {
      const heading = headings.find((h) => h.id === hash);
      if (heading) {
        scrollToHeading(heading);
      }
    }
  }, [editor, headings, scrollToHeading]);

  if (!editor || headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1 py-4 px-4">
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading)}
          className={cn(
            "block w-full text-left text-sm hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors",
            heading.level === 1 &&
              "font-semibold text-zinc-900 dark:text-zinc-100",
            heading.level === 2 && "pl-4 text-zinc-700 dark:text-zinc-300",
            heading.level === 3 && "pl-8 text-zinc-600 dark:text-zinc-400",
            activeId === heading.id && "text-blue-600 dark:text-blue-400"
          )}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
};
