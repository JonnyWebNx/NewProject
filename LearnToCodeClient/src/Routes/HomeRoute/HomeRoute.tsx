import React, { useState }from "react";
import styles from "./Home.module.scss";
import HeroImage from "../../assets/images/Hero.jpg";
import CodeEditor from "../../Components/EditorComponents/CodeEditor";
import { getCodingProblem } from "../../ApiLayer/OpenAi/OpenAi";
import ProblemDisplay from "../../Components/ProblemDisplay";


const HomeRoute = () => {
  const [codeProblem, setCodeProblem] = useState('');

  const handleGetCodeProblem = async () => {
    const response = await getCodingProblem();
    if (response.data) {
      setCodeProblem(response.data.data)
    }
  }


  return (
    <div className={styles.hero}>
      <h1>Learn React AI</h1>
      <button onClick={handleGetCodeProblem}>Generate Ai response</button>
      {codeProblem && (
        <div className={styles.generatedProblem}>
          <ProblemDisplay content={codeProblem} />
        </div>
      )}     
      <CodeEditor />
    </div>
  );
};

export default HomeRoute;
