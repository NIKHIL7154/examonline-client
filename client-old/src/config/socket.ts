import io from 'socket.io-client';

export const socket = io("http://localhost:2121", {
    autoConnect: false,
    
  });