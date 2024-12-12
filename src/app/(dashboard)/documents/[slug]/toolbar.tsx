"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/hooks/use-editor-store";
import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";
import { CirclePicker, type ColorResult } from "react-color";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Trebuchet MS",
      value: "Trebuchet MS",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm font-light",
              editor?.getAttributes("textStyle").fontFamily === font.value &&
                "bg-muted-hover"
            )}
            style={{
              fontFamily: font.value,
            }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headingLevels = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <span className="truncate">{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headingLevels.map(({ label, value, fontSize }) => (
          <DropdownMenuItem
            key={value}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm",
              value === 0 && !editor?.isActive("heading") && "bg-muted-hover",
              editor?.isActive("heading", { level: value }) && "bg-muted-hover"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-muted-hover",
        isActive && "bg-muted-hover"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <span className="text-xs" style={{ color: value }}>
            A
          </span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <HighlighterIcon className="size-4" style={{ color: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();

  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const onChange = (align: string) => {
    editor?.chain().focus().setTextAlign(align).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm font-light",
              editor?.isActive({ textAlign: value }) && "bg-muted-hover"
            )}
          >
            <Icon className="size-4 mr-2" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Order List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-hover px-1.5 overflow-hidden">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <DropdownMenuItem
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm text-sm font-light",
              isActive && "bg-muted-hover"
            )}
          >
            <Icon className="size-4 mr-2" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: editor?.isActive("removeFormatting"),
      },
    ],
  ];

  return (
    <div className="min-h-10 rounded-3xl flex items-center gap-x-0.5 bg-muted px-2.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      {/* TODO: Font size */}
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <TextColorButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <HeightColorButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <LinkButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      {/* TODO: Image  */}
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <AlignButton />
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      {/* TODO: Line height  */}
      <Separator orientation="vertical" className="h-6 bg-gray-300/80" />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
