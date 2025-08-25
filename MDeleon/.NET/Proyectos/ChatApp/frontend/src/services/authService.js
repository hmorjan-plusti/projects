import axios from 'axios';

const API_URL = 'http://localhost:5118/api/auth';

export const register = (user) => axios.post(`${API_URL}/register`, user);
export const login = (user) => axios.post(`${API_URL}/login`, user);

// frontend/src/services/chatService.js
import * as signalR from '@microsoft/signalr';

let connection;

export const startConnection = (token, onReceiveMessage) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5118/chatHub', {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();

  connection.on('ReceiveMessage', onReceiveMessage);

  return connection.start();
};

export const sendMessage = (user, message) => {
  return connection.invoke('SendMessage', user, message);
};