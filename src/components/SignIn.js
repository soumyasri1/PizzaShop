import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentStyles/Signin.css'

function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Perform login logic (in a real app, this would be sent to a server)
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      if (userInfo.email === email && userInfo.password === password) {
        setIsLoggedIn(true);
        // Redirect to the home page or any desired page
        navigate('/');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } else {
      alert('User not found. Please sign up.');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
