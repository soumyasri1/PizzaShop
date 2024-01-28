// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentStyles/Signin.css'; // Import the CSS file

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const userInfo = { username, email, password };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/signin');
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className='username' />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
