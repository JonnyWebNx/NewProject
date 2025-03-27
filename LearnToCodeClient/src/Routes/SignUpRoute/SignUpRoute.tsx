import React, { useEffect, useState } from 'react';
import { SignUpFormData } from '../../interfaces';
import { signUpUser } from '../../ApiLayer/Authentication/UserAuth';
import { ApiError } from '../../utils/errorHandler';
import styles from './SignUpRoute.module.scss';

export const SignUpRoute = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validation
      if (!formData.email || !formData.username || !formData.password) {
        setFormData((prev) => ({
          ...prev,
          message: 'Please fill out all fields'
        }));
        return
      }

      // Call Backend
      const response = await signUpUser(formData);
      if (response.status === 'success') {
        setFormData({
          username: '',
          email: '',
          password: '',
          message: response.message
        })
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      setFormData((prev) => ({
        ...prev,
        message: apiError.message
      }));
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className={styles.signUpRouteContainer}>
      <h1>LearnReactAI</h1>
      
      <div className={styles.formContainer}>
        <h4>Sign Up</h4>
        { formData.message !== '' && <p>{formData.message}</p> }
        <form onSubmit={handleSubmit}>
          <div className={styles.textInput}>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' required placeholder='Enter email @ .com' value={formData.email} onChange={handleChange}/>
          </div>
          <div className={styles.textInput}>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' required placeholder='Enter username' value={formData.username} onChange={handleChange}/>
          </div>
          <div className={styles.textInput}>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' required placeholder='Enter password' value={formData.password} onChange={handleChange}/>
          </div>
          <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}
