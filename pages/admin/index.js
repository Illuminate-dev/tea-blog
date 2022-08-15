import { signInWithPopup, signOut } from "firebase/auth";
import LoginOrSignUp from "../../components/Login";
import { AuthUserContext } from "../../lib/authUserContext";
import { auth, firestore } from "../../lib/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
    const { user } = useContext(AuthUserContext);

    return (<>{ user ?
        <div className="flex"><Link href="/admin/newArticle"><button>Create A New Article</button></Link>
        <SignOut /></div>
        :
        <LoginOrSignUp />
    }</>)

}

function SignOut() {
    return (<button id="signOutButton" onClick={() => signOut(auth)}>Sign Out</button>)
}

