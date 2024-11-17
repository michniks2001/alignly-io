"use client";

import React, { useState, useRef } from "react";

const InlineMarkdownEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [rawMarkdown, setRawMarkdown] = useState<string>("");

  const parseMarkdown = (text: string): string => {
    return text
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/^\*(.*$)\*/gim, "<em>$1</em>");
  };

  const handleInput = (): void => {
    const rawText = editorRef.current?.innerText || "";

    setRawMarkdown(rawText);

    const parsedHTML = parseMarkdown(rawText);

    if (editorRef.current) {
      editorRef.current.innerHTML = parsedHTML;
    }
  };

  handleInput();
  parseMarkdown("");

  return <>{rawMarkdown}</>;
};

export default InlineMarkdownEditor;
