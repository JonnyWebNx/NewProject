import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState("Start coding here");

  useEffect(() => {
    console.log(code)
  }, [code])

  return (
    <div>
    <Editor 
      height="90vh"
      value={code}
      defaultLanguage='javascript'
      onChange={(value) => setCode(value || "")}
      theme="vs-dark"
      
    />

    <button>Test Code</button>
    </div>
  )
}

export default CodeEditor;