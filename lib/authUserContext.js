import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

export const AuthUserContext = createContext({ user: null, loading: true })

function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setAuthUser(authState);
        setLoading(false);
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    
      return () => unsubscribe();
    }, [])
    

    return { user:authUser, loading }
}

export function AuthUserProvider({ children }) {
    const val = useFirebaseAuth();

    return <AuthUserContext.Provider value={val}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);
