"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "@/hooks/use-editor-store";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";

interface Props {
  content: string;
  onChange?: (content: string) => void;
}

const Editor = ({ content }: Props) => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate prose-headings:font-display focus:outline-none max-w-full w-full mx-auto h-full px-8 py-6",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "scroll-mt-20",
            id: "", // Enable ID attribute for headings
          },
        },
      }),
      Underline,
      FontFamily,
      FontSizeExtension,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      LineHeightExtension,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextStyle,
      Image,
      ImageResize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content:
      content ||
      `
      <h1 id="heading-1">Welcome to My Document</h1>
      <p>This is a sample document showcasing various styles and formatting options available in our editor.</p>

      <h2 id="heading-2">Text Formatting</h2>
      <p>You can make text <strong>bold</strong>, <em>italic</em>, or <u>underlined</u>. You can also use <mark>highlights</mark> to emphasize important points.</p>
      
      <h3 id="heading-3">Colors and Fonts</h3>
      <p><span style="color: #e11d48;">You can add color to your text</span> and <span style="font-size: 18px;">change the font size</span> to create visual hierarchy.</p>

      <h2 id="heading-4">Lists and Tasks</h2>
      <ul>
        <li>Bullet points for general lists</li>
        <li>Easy to organize information</li>
        <li>Support nested items
          <ul>
            <li>Like this nested item</li>
            <li>And another one</li>
          </ul>
        </li>
      </ul>

      <h3 id="heading-5">Task Lists</h3>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">Completed task</li>
        <li data-type="taskItem" data-checked="false">Pending task</li>
        <li data-type="taskItem" data-checked="false">Future task</li>
      </ul>

      <h2 id="heading-6">Tables</h2>
      <table>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
          <td>Row 1, Cell 3</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
          <td>Row 2, Cell 3</td>
        </tr>
      </table>

      <h2 id="heading-7">Links and References</h2>
      <p>You can add <a href="https://example.com">links to external websites</a> or reference other documents.</p>

      <h2 id="heading-8">Text Alignment</h2>
      <p style="text-align: center">This text is centered</p>
      <p style="text-align: right">This text is right-aligned</p>

      <h2 id="heading-9">Line Height and Spacing</h2>
      <p style="line-height: 2">This paragraph has increased line height for better readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <h3 id="heading-10">Final Notes</h3>
      <p>Feel free to experiment with these different styles and formatting options to create beautiful and well-structured documents.</p>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex-1">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white min-h-full shadow-sm">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
