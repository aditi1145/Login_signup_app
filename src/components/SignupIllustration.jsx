import React from 'react';
import './SignupIllustration.css';
import illustration from '../assets/signup_illustration.png'; // Use your own image

const SignupIllustration = () => {
  return (
    <div className="illustration-container">
      <img src={illustration} alt="Signup Illustration" />
    </div>

  );
};

export default SignupIllustration;
