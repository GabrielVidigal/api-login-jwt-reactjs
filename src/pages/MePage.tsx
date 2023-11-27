import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type UserData = {
  _id: string;
  name: string;
  email: string;
};

const MePage: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleFetchUserData = async () => {
    try {
      const response = await fetch('https://login-user-api-node.onrender.com/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenInput}`,
        },
      });

      if (response.ok) {
        const data: UserData = await response.json();
        setUserData(data);
      } else {
        console.error('Erro ao obter dados do usuário. Redirecionando para /login');
        throw new Error('Erro ao obter dados do usuário');
      }
    } catch (error: any) {
      console.error(error.message);
      navigate('/'); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleUpdateUser = () => {
    if (userData) {
      console.log('Atualizar usuário:', userData._id);
      navigate(`/update/${userData._id}`);
    }
  };

  return (
    <div>
      <h1>Minha Página</h1>
      <label>
        Token de Acesso:
        <input
          type="text"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />
      </label>
      <button onClick={handleFetchUserData}>Buscar Dados</button>
      <button onClick={handleUpdateUser}>Atualizar Usuário</button>
      {userData ? (
        <>
          <p>ID: {userData._id}</p>
          <p>Nome: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <p>Insira um token e clique em "Buscar Dados"</p>
      )}
      <br />
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default MePage;
