import { createContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { auth } from "../services/firebase";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  userEmail: string | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return firebaseUpdateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return firebaseUpdatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        console.log("Användaren är inloggad", user);
        setUserEmail(user.email);
      } else {
        console.log("Användaren är inte inloggad");
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        forgotPassword,
        setEmail,
        setPassword,
        userEmail,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
