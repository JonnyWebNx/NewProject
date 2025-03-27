import React from "react";
import styles from "./Home.module.scss";
import HeroImage from "../../assets/images/Hero.jpg";

const HomeRoute = () => {
  return (
    <div className={styles.hero}>
      <h1>Learn React AI</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis sequi
        natus temporibus mollitia suscipit cum dolor nobis sunt, pariatur sed
        quam blanditiis nostrum repellat aliquam odit dolorum, dignissimos
        maiores labore? Eum molestias, in quas consequatur officiis enim quidem
        repellendus odio culpa corporis, quos corrupti consectetur perferendis
        dicta debitis necessitatibus deleniti, molestiae repudiandae eligendi
        voluptatem hic! Voluptatum repellat dolorum ducimus animi.
      </p>
      <img src={HeroImage} alt="" />
    </div>
  );
};

export default HomeRoute;
