import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const KEY = 'groco.user';
const USERS_KEY = 'groco.users';

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  /* Front-end only, per the brief — accounts are kept in localStorage
     instead of a real backend, so signup/login can still validate
     against previously saved credentials. */
  const register = (email, password) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists' };
    }
    users.push({ email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ email });
    return { success: true };
  };

  const login = (email, password) => {
    const users = readUsers();
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!match) {
      return { success: false, error: 'No account found with this email' };
    }
    if (match.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }
    setUser({ email });
    return { success: true };
  };

  const logout = () => setUser(null);

  const findAccount = (email) => {
    const users = readUsers();
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!match) {
      return { success: false, error: 'No account found with this email' };
    }
    return { success: true };
  };

  const resetPassword = (email, newPassword) => {
    const users = readUsers();
    const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (index === -1) {
      return { success: false, error: 'No account found with this email' };
    }
    users[index] = { ...users[index], password: newPassword };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, findAccount, resetPassword,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
