// src/pages/UserForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserForm.css'

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ddd, setDdd] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('https://login-user-api-node.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          telefones: [{ ddd, numero: phone }],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert(`Usuário cadastrado com sucesso! Token: ${data.token}`);
        navigate('/');
      } else {
        window.alert(`Erro no cadastro: ${data}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        window.alert(`Erro durante o cadastro: ${error.message}`);
      } else {
        window.alert(`Erro desconhecido durante o cadastro.`);
      }
    }
  };

  return (
    <div>
      <h1>Página de Cadastro</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>DDD:</label>
      <input type="text" value={ddd} onChange={(e) => setDdd(e.target.value)} />
      <br />
      <label>Telefone:</label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Cadastrar</button>
      <p>Já tem uma conta? <Link to="/">Entrar</Link></p>
    </div>
  );
};

export default UserForm;
