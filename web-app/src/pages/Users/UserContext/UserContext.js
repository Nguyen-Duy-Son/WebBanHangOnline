import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const updateUser = (userData,token) => {
    setUser(userData);
    setAccessToken(token);
  };

  return (
    <UserContext.Provider value={{ user,accessToken, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;