"use client";
import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import {
  useEditor,
  EditorContent,
  Extension,
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Heading, { Level } from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Node, mergeAttributes } from "@tiptap/core";
import AttachDialog from "./AttachDialog";
import { BASE_URL_COURSE_SERVICE } from "@/utils/BaseURL";
export interface DescriptionEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}
interface AddImageButtonProps {
  editor: any; // Tùy theo editor bạn đang dùng (ví dụ: Tiptap Editor)
}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
// =========== Custom Resizable Image Extension =============
const ResizableImageComponent = (props: any) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(props.node.attrs.width || 300);

  useEffect(() => {
    setWidth(props.node.attrs.width || 300);
  }, [props.node.attrs.width]);

  return (
    <NodeViewWrapper>
      <div style={{ display: "inline-block", position: "relative" }}>
        <img
          ref={imgRef}
          src={props.node.attrs.src}
          alt={props.node.attrs.alt || ""}
          style={{ width: `${width}px` }}
        />
        {/* Handle kéo resize */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            background: "blue",
            cursor: "nwse-resize",
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            const startX = event.clientX;
            const startWidth = width;
            const onMouseMove = (e: MouseEvent) => {
              const newWidth = startWidth + e.clientX - startX;
              setWidth(newWidth);
              props.updateAttributes({ width: newWidth });
            };
            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        />
      </div>
    </NodeViewWrapper>
  );
};

const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  inline: false,
  draggable: true,
  addAttributes() {
    return {
      src: {},
      alt: { default: null },
      title: { default: null },
      width: { default: 300 },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'img[data-type="resizable-image"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(HTMLAttributes, { "data-type": "resizable-image" }),
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
  addCommands(): any {
    return {
      insertResizableImage:
        (attributes: { src: string; width?: number }) =>
          ({ commands }: any) => {
            return commands.insertContent({
              type: this.name,
              attrs: attributes,
            });
          },
    };
  },
});

// =========== CUSTOM EXTENSION: FontSize ============
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              const fontSize = element.style.fontSize?.replace("px", "");
              return fontSize || null;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}px` };
            },
          },
        },
      },
    ];
  },
  addCommands(): any {
    return {
      setFontSize:
        (size: any) =>
          ({ chain }: any) => {
            return chain().setMark("textStyle", { fontSize: size }).run();
          },
      unsetFontSize:
        () =>
          ({ chain }: any) => {
            return chain().setMark("textStyle", { fontSize: null }).run();
          },
    };
  },
});
const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Khởi tạo editor với custom ResizableImage thay vì Image mặc định
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontSize,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ResizableImage,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // mỗi lần có thay đổi, gọi onChange
      onChange(editor.getHTML());
    },
  });

  // Thêm link
  const setLink = () => {
    const url = prompt("Nhập URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };

  // Bỏ link
  const unsetLink = () => {
    editor?.chain().focus().unsetLink().run();
  };
  const addImage = () => {
    fileInputRef.current?.click();
  };
  // // Chèn ảnh (sử dụng custom resizableImage)
  // const addImage = () => {
  //   const url = prompt("Nhập URL ảnh:");
  //   if (url) {
  //     editor
  //       ?.chain()
  //       .focus()
  //       .insertContent({
  //         type: "resizableImage",
  //         attrs: { src: url, width: 300 },
  //       })
  //       .run();
  //   }
  // };

  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const handleFileChange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
    
      // ✅ Kiểm tra định dạng file
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Chỉ cho phép các định dạng ảnh: JPEG, PNG.");
        target.value = "";
        return;
      }
    
      // ✅ Kiểm tra kích thước ảnh
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
    
      img.onload = async () => {
        const { width, height } = img;
    
        if (file.size > MAX_IMAGE_SIZE) {
          alert("Kích thước tối đa 5MB.");
          return;
        }
        console.log("Sending file:", file.name);
        console.log("Size:", file.size, "bytes");
        console.log("Type:", file.type);
        // ✅ Gửi ảnh lên server
        const formData = new FormData();
        formData.append("image", file);
    
        try {
          const response = await fetch(BASE_URL_COURSE_SERVICE+"/add-image", {
            method: "POST",
            body: formData,
            credentials:'include'
          });
    
          const data = await response.json();
          const uploadedUrl = data.url;
    
          if (uploadedUrl) {
            editor
              ?.chain()
              .focus()
              .insertContent({
                type: "resizableImage",
                attrs: { src: uploadedUrl, width: 300 },
              })
              .run();
          }
        } catch (error) {
          console.error("Lỗi upload ảnh:", error);
        }
    
        URL.revokeObjectURL(imageUrl);
      };
    
      img.onerror = () => {
        alert("File không phải ảnh hợp lệ.");
        URL.revokeObjectURL(imageUrl);
      };
    
      img.src = imageUrl;
      target.value = "";
    };
    

    input.addEventListener("change", handleFileChange);
    return () => input.removeEventListener("change", handleFileChange);
  }, [editor]);

  // Nếu parent truyền value mới (ví dụ reset), sync ngược lại editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        Description
      </label>
      <div className="border rounded">
        {/* ==== Toolbar ==== */}
        <div className="border-b p-2 flex flex-wrap items-center gap-2">
          <select
            className="border px-2 py-1 rounded"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "paragraph") {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: Number(value) as Level })
                  .run();
              }
            }}
          >
            <option value="paragraph">Paragraph</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
          </select>

          <select
            className="border px-2 py-1 rounded"
            defaultValue="14"
            onChange={(e) => {
              const size = Number(e.target.value);
              if (size === 0) {
                // @ts-ignore
                editor?.chain().focus().unsetFontSize().run();
              } else {
                // @ts-ignore
                editor?.chain().focus().setFontSize(size).run();
              }
            }}
          >
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="28">28</option>
            <option value="32">32</option>
            <option value="0">Reset</option>
          </select>

          <input
            type="color"
            className="border p-1 rounded"
            onChange={(e) => {
              editor?.chain().focus().setColor(e.target.value).run();
            }}
          />

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`px-2 py-1 border rounded ${editor?.isActive("bold") ? "bg-gray-200" : ""
              }`}
          >
            B
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 border rounded ${editor?.isActive("italic") ? "bg-gray-200" : ""
              }`}
          >
            I
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 border rounded ${editor?.isActive("underline") ? "bg-gray-200" : ""
              }`}
          >
            U
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleBulletList().run()
            }
            className={`px-2 py-1 border rounded ${editor?.isActive("bulletList") ? "bg-gray-200" : ""
              }`}
          >
            • List
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleOrderedList().run()
            }
            className={`px-2 py-1 border rounded ${editor?.isActive("orderedList") ? "bg-gray-200" : ""
              }`}
          >
            1. List
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().setTextAlign("left").run()
            }
            className={`px-2 py-1 border rounded ${editor?.isActive({ textAlign: "left" })
              ? "bg-gray-200"
              : ""
              }`}
          >
            ⬅
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().setTextAlign("center").run()
            }
            className={`px-2 py-1 border rounded ${editor?.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : ""
              }`}
          >
            ☰
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().setTextAlign("right").run()
            }
            className={`px-2 py-1 border rounded ${editor?.isActive({ textAlign: "right" })
              ? "bg-gray-200"
              : ""
              }`}
          >
            ➡
          </button>

          <button
            type="button"
            onClick={setLink}
            className="px-2 py-1 border rounded"
          >
            🔗
          </button>

          <button
            type="button"
            onClick={unsetLink}
            className="px-2 py-1 border rounded"
          >
            Unlink
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={addImage}
            className="px-2 py-1 border rounded"
          >
            🖼
          </button>
          {/* <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open Attach Dialog
          </button> */}
        </div>

        <div className="p-4 min-h-[150px] prose max-w-none list-inside">
          <EditorContent
            editor={editor}
            className="focus:outline-none"
          />
        </div>
      </div>
      <AttachDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={(url) => {
          editor
            ?.chain()
            .focus()
            .insertContent({
              type: "resizableImage",
              attrs: { src: url, width: 300 },
            })
            .run();
          setIsDialogOpen(false)

        }}
      />
    </div>
  );
}

export default DescriptionEditor