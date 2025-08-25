import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

export default function Dashboard({ token }) {
  const [editingUser, setEditingUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = user => setEditingUser(user);
  const handleSuccess = () => {
    setEditingUser(null);
    setRefresh(!refresh);
  };

  return (
    <div>
      <UserForm
        token={token}
        userToEdit={editingUser}
        onSuccess={handleSuccess}
        onCancel={() => setEditingUser(null)}
      />
      <UserList
        token={token}
        onEdit={handleEdit}
        key={refresh} // fuerza recarga al actualizar
      />
    </div>
  );
}