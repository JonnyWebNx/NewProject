import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./ProblemDisplay.module.scss";

interface ProblemData {
  problemDescription: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  solution: string;
}

interface Props {
  content: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const ProblemDisplay: React.FC<Props> = ({ content }) => {
  const [showSolution, setShowSolution] = useState(false);
  const problemData: ProblemData = JSON.parse(content);

  return (
    <div className={styles["problem-container"]}>
      <div className={styles["problem-description"]}>
        <h2>Problem</h2>
        <ReactMarkdown>{problemData.problemDescription}</ReactMarkdown>
      </div>

      <div className={styles["test-cases"]}>
        <h3>Test Cases</h3>
        {problemData.testCases.map((testCase, index) => (
          <div key={index} className={styles["test-case"]}>
            <div className={styles.input}>
              <strong>Input:</strong> {testCase.input}
            </div>
            <div className={styles.output}>
              <strong>Expected Output:</strong> {testCase.expectedOutput}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowSolution(!showSolution)}
        className={styles["solution-button"]}
      >
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </button>

      {showSolution && (
        <div className={styles.solution}>
          <h3>Solution</h3>
          <SyntaxHighlighter
            style={oneDark}
            language="javascript"
            PreTag="div"
          >
            {problemData.solution}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default ProblemDisplay;
