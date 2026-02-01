import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-REPLACE_WITH_YOUR_ACTUAL_KEY", 
  authDomain: "almarky-pk.firebaseapp.com",
  projectId: "almarky-pk",
  storageBucket: "almarky-pk.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Global references for singleton instances
let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;
const googleProvider = new GoogleAuthProvider();

const getFirebaseApp = () => {
  if (!firebaseApp) {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApp();
    }
  }
  return firebaseApp;
};

const getFirebaseAuth = () => {
  if (!firebaseAuth) {
    const app = getFirebaseApp();
    firebaseAuth = getAuth(app);
  }
  return firebaseAuth;
};

interface User {
  name: string;
  email: string;
  photo: string;
  isLoggedIn: boolean;
  uid?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Modular SDK: onAuthStateChanged will handle registration if imported correctly
    const auth = getFirebaseAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "Almarky User",
          email: firebaseUser.email || "",
          photo: firebaseUser.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          isLoggedIn: true,
          uid: firebaseUser.uid
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const auth = getFirebaseAuth();
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Firebase Login Error:", error);
      alert("Login Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};