import React, { ChangeEventHandler, useEffect, useState } from "react";
import Prism from "prismjs";

interface CodeProps {
  text: string | null;
  setText: (text: string | null) => void;
}

function CodeBox(props: CodeProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [props]);

  function getText(): string {
    if (props.text === null) {
      return "Invalid JSON!";
    } else if (props.text.length === 0) {
      return "Upload a file!";
    } else {
      return props.text;
    }
  }

  return (
    <>
      <input
        type="file"
        name="upload file"
        onChange={async (event) => {
          const fileText: string | undefined =
            await event.target.files?.[0].text();
          if (fileText !== undefined) {
            try {
              JSON.parse(fileText);
              props.setText(fileText);
            } catch (err) {
              props.setText(null);
            }
          }
        }}
      />
      <pre className="h-3/4 code-box">
        <code className="language-javascript select-all">{getText()}</code>
      </pre>
    </>
  );
}

export default CodeBox;
