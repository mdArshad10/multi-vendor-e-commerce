import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// This modules object configures editor features like toolbar
const modules = {
  // toolbar what tools appear in the UI
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["link", "image"],
  ],
};

// Defines what is preserved in the content when editing
// (The functionality of the toolbar tools)
const formats = [
  "header",
  "bold",
  "color",
  "background",
  "italic",
  "underline",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "align",
  "size",
  "link",
  "image",
];

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something awesome...",
}: RichTextEditorProps) => {
    const [editorValue, setEditorValue] = useState(value|| "")
    const quillRef = useRef(null);
  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export { RichTextEditor };
