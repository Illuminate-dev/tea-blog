import { auth } from '../lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth'

export function useUserData() {
    const [user] = useAuthState(auth);

    return {
        user
    }
}