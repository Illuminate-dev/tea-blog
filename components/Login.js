import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { auth } from "../lib/firebaseConfig";

export default function LoginOrSignUp() {


    return (
        <SignIn />
    )
}


function SignIn() {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [error, setError] = useState(null);


    const onSubmit = event => {
        setError(null)
        //check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        if (passwordOne && email)
            signInWithEmailAndPassword(auth, email, passwordOne)
                .then(authUser => {
                    console.log("Success. The user is logged In")
                })
                .catch(error => {
                    // An error occurred. Set error message to be displayed to user
                    setError(error.message)
                });
        else
            setError("Enter both the password and the email")
        event.preventDefault();
    }

    return (
        <form id="signInForm">
            {error && <p>{error}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                    name="email"
                    id="signInEmail"
                    placeholder="Email" />
                <input
                    type="password"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event) => { setPasswordOne(event.target.value) }}
                    id="signInPassword"
                    placeholder="Password" />
            <button type="sumbit" onClick={onSubmit} id="signInButton">Sign In</button>
        </form>
    )

}