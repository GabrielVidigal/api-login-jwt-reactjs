import React, { useState } from 'react';

type UpdateUserPageProps = {
  userId?: string;
};

const UpdateUserPage: React.FC<UpdateUserPageProps> = ({ userId }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`https://login-user-api-node.onrender.com/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('Usuário atualizado com sucesso:', updatedUser);
      } else {
        throw new Error('Erro durante a atualização do usuário');
      }
    } catch (error: any) {
      console.error('Erro durante a atualização do usuário:', error.message);
    }
  };

  return (
    <div>
      <h1>Atualizar Usuário</h1>
      <label>
        Nome:
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </label>
      <button onClick={handleUpdateUser}>Atualizar Usuário</button>
    </div>
  );
};

export default UpdateUserPage;
