import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [])

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setRole('')
    }
    return (
        <AuthContext.Provider value={{ user, setUser, logout, role }}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext);