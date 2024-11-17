"use client";

import React, { useState, useRef } from "react";
import { Card } from "@nextui-org/react";

const InlineMarkdownEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [rawMarkdown, setRawMarkdown] = useState<string>("");

  const parseMarkdown = (text: string): string => {
    return text
      .replace(/^# (.*$)/gim, "<h1>$1</h1>") // H1
      .replace(/^## (.*$)/gim, "<h2>$1</h2>") // H2
      .replace(/^\* (.*$)/gim, "<li>$1</li>") // List items
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>") // Bold
      .replace(/\*(.*?)\*/gim, "<em>$1</em>"); // Italics
  };

  const handleInput = (): void => {
    const rawText = editorRef.current?.innerText || "";

    setRawMarkdown(rawText);
    const parsedHTML = parseMarkdown(rawText);

    if (editorRef.current) {
      editorRef.current.innerHTML = parsedHTML;
      moveCaretToEnd(editorRef.current);
    }
  };

  const moveCaretToEnd = (element: HTMLElement): void => {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(element);
    range.collapse(false);

    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", "padding": "1rem" }}>
      <Card
    </div>
  )
};

export default InlineMarkdownEditor;
