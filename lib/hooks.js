import { auth } from '../lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth'
import {useEffect, useState} from "react";

export function useUserData() {
    const [user] = useAuthState(auth);

    return {
        user
    }
    
}


export const useLoaded = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    return loaded;
};