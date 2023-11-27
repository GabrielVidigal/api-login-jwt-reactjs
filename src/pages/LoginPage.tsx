import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const response = await fetch('https://login-user-api-node.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.token);
          navigate('/me');
        } else {
          const errorData = await response.json();
          window.alert(`Erro no login: ${errorData}`);
        }
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
      }
    };
  
    return (
      <div>
        <h1>Login Page</h1>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Entrar</button>
        <p>Não tem uma conta? <Link to="/user-form">Cadastrar</Link></p>
      </div>
    );
  };
  
  export default LoginPage;