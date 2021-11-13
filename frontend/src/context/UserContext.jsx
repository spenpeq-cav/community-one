import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData !== null ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
