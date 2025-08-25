import React, { useEffect, useState, useCallback } from 'react';
import { getUsers, deleteUser } from '../api';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function UserList({ token, onEdit }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(() => {
    if (!token) return;
    getUsers(token)
      .then(res => setUsers(res.data))
      .catch(err => console.log('Error al obtener usuarios:', err));
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async id => {
    await deleteUser(id, token);
    fetchUsers();
  };

  return (
    <List>
      {users.map(u => (
        <ListItem
          key={u.id}
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(u)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(u.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={u.username} />
        </ListItem>
      ))}
    </List>
  );
}