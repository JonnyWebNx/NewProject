import React, { useEffect, useState } from "react";
import styles from "./SignInRoute.module.scss";
import { signInUser } from "../../ApiLayer/Authentication/UserAuth";

const SignInRoute = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormData = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (formData.email === "" || formData.password === "") {
      setFormData((prev) => ({
        ...prev,
        message: "Please Fill Out all Required Fields",
      }));

      return;
    }

    try {
      const response = await signInUser(formData);
      if (response.success) {
        setFormData({
          email: "",
          password: "",
          message: response.message,
        });

        // Redirect User to Home Page?
      } else {
        setFormData(prev => ({...prev, message: response.message}))
      }
    } catch (error: any) {
      console.error("Error submitting data", error);

      setFormData((prev) => ({
        ...prev,
        message: error.message,
      }));
    }
  };



  return (
    <div className={styles.formContainer}>
      <h2>LearnReactAI</h2>
      <div>
        <h3>Sign in to your account</h3>
        {formData.message !== "" && <p>{formData.message}</p>}
        <form onSubmit={submitFormData}>
          <label htmlFor="username">Username</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            id="password"
            placeholder="Passwords"
            value={formData.password}
            onChange={handleChange}
          />
          <p>Forgot Password?</p>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInRoute;
