import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichEditor({ content, setContent, editable }) {


  // Define modules based on the editable state
  const modules = editable
    ? {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          [{ color: [] }, { background: [] }],
          [{ "code-block": true }],
          ["clean"],
        ],
      }
    : { toolbar: false }; // Disable toolbar when not editable

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
    "video",
    "code-block",
  ];

  return (
    <div className="flex  mt-1 w-full rounded-lg">
      <div className="w-full min-h-32 h-full rounded-lg">
        <ReactQuill
          placeholder="Post Content"
          theme="snow"
          value={content}
          onChange={setContent}
          readOnly={!editable} // Toggle read-only based on the editable state
          modules={modules} // Conditionally pass modules to hide/show toolbar
          formats={formats}
        />
      </div>
    </div>
  );
}
