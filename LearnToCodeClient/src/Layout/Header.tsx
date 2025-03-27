import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router';


const Header = () => {
  return (
    <header>
        <div className={styles.logo}>LearnReactAI</div>
        <nav>

        </nav>
        <div className={styles.loginSignup}>            
            <Link to="/auth/signIn">Sign In</Link>
            <Link to="/auth/signUp">Sign Up</Link>
        </div>
    </header>
  )
}

export default Header