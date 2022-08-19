import { signInWithPopup, signOut } from "firebase/auth";
import LoginOrSignUp from "../../components/Login";
import { AuthUserContext, useAuth } from "../../lib/authUserContext";
import { auth, firestore, postToJSON } from "../../lib/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ArticleList from "../../components/ArticleList";
import { collectionGroup, getDocs, limit, orderBy, query } from "@firebase/firestore";

const LIMIT = 8;

export async function getStaticProps() {
  const articlesQuery = query(collectionGroup(firestore, "articles"), orderBy("createdAt", "desc"), limit(LIMIT));

  const articles = (await getDocs(articlesQuery)).docs.map(postToJSON);

  return {
    props: {
      articles
    }
  }
}

export default function AdminPage(props) {
    const userAuth = useAuth(); 

    return (<>{(!userAuth.loading && userAuth.user) ?
        <> 
        <ArticleList articles={props.articles} admin={true}/>
        <div className="flex"><Link href="/admin/newArticle"><button>Create A New Article</button></Link>
        <SignOut /></div>
        </>
        :
        <LoginOrSignUp />
    }</>)

}


function SignOut() {
    return (<button id="signOutButton" onClick={() => signOut(auth)}>Sign Out</button>)
}

