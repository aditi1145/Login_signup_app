import React, { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    contactMode: '',
    email: '',
    otp: '',
  });
  const navigate = useNavigate();
  
  const [otpSubmit, setOtpSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  
  const handlesignin = () => {
     navigate('/login'); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, formData);
    alert("Data posted to backend!");
    setOtpSubmit(true);
  };

  const submitOtp = async(e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/verify-otp`, formData)
    .then(() => {
      alert('Otp Verified!');
      navigate('/login'); 
    })
    .catch((error) => {
      alert("Couldn't verify otp or wrong otp entered!");
    });
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-form-container">
      <h2>Let us know!</h2>
      <form onSubmit={otpSubmit ? submitOtp : handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            hidden={otpSubmit === true}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            hidden={otpSubmit === true}
          />
        </div>
        
        {/* Password field with show/hide toggle */}
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Set Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'} 
          </span>
        </div>

        
        <div className="input-group password-group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Retype Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            hidden={otpSubmit === true}
          />
          <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility} hidden={otpSubmit === true}>
            {showConfirmPassword ? '🙈' : '👁️'} 
          </span>
        </div>

        <div className="input-group">
          <select
            name="contactMode"
            value={formData.contactMode}
            onChange={handleChange}
            hidden={otpSubmit === true}
          >
            <option value="" disabled selected>Contact Mode</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        
        <div className="input-group">
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
            hidden={otpSubmit !== true}
          />
        </div>

        <button type="submit">{otpSubmit ? 'Verify Otp' : 'Sign Up'}</button>
        <p onClick={handlesignin}>Sign In</p>
      </form>
    </div>
  );
};

export default SignupForm;
