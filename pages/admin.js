import { signInWithPopup, signOut } from "firebase/auth";
import LoginOrSignUp from "../components/Login";
import { AuthUserContext } from "../lib/authUserContext";
import { auth } from "../lib/firebaseConfig";
import { useContext } from "react";

export default function AdminPage() {
    const { user } = useContext(AuthUserContext);

    return (<>{user ? <SignOut /> :
        <LoginOrSignUp />
    }</>)

}

function SignOut() {
    return (<button id="signOutButton" onClick={() => signOut(auth)}>Sign Out</button>)
}
