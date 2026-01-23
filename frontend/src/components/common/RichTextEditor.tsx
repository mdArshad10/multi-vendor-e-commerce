import { useEffect, useRef, useState } from "react";
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
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
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
  const [editorValue, setEditorValue] = useState(value || "")
  const quillRef = useRef(false);
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current = true;

      setTimeout(() => {
        document.querySelectorAll('.ql-editor').forEach((toolbar, index) => {
          if (index > 0) {
            toolbar.remove();
          }
        })
      }, 100);
    }
  }, []);
  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={(content: string) => {
          onChange(content)
          setEditorValue(content)
        }}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-transparent border border-gray-300 text-white rounded-md"
        style={{ minHeight: "250px" }}
      />
      <style>
        {`
          .ql-toolbar {
            background-color: #444;
          }
          .ql-container{
            background:transparent !important;
             background-color: #444;
             color:white;
          }
          .ql-picker{
            min-height:200px; 
            }
          .ql-editor {
            min-height: 250px;
          }
          .ql-snow{
            border-color: #444 !important;
          }
          .ql-editor.ql-blank::before{
            color:#aaa !important;
          }
            .ql-picker-options{
              background: #444 !important;
              color:white !important;
            }
            .ql-picker-item{
              color:white !important;
            }
              .ql-stroke{
                stroke:white !important;
              }
              
        `}
      </style>
    </div>
  );
};

export { RichTextEditor };
