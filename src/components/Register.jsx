import React from 'react'
import SignupForm from './SignupForm';
import SignupIllustration from './SignupIllustration';

function Register() {
  return (
    <div className="signup-page">
      <div className="illustration-section">
        <SignupIllustration />
      </div>
      <div className="form-section">
        <SignupForm />
      </div>
    </div>
  )
}

export default Register
