import { collectionGroup, doc, getDoc, getDocs } from "@firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore";
import ReactMarkdown from "react-markdown";
import { AuthUserContext, useAuth } from "../../lib/authUserContext"
import { firestore, postToJSON } from "../../lib/firebaseConfig";

export async function getStaticProps(context) {
    const slug = context.params.slug;
    
  
    const postRef = doc(firestore, 'articles', slug);
    let post = postToJSON(await getDoc(postRef));
  
    let path = postRef.path;
  
    return {
      props: {
        post, path
      },
      revalidate: 5000,
    }
}
  
export async function getStaticPaths() {
    
    const snapshot = await getDocs(collectionGroup(firestore, 'articles'));
    const paths = snapshot.docs.map(doc => {

        return {
            params : {
                slug : doc.data().slug ? doc.data().slug : "",
            }
        }
    });
    
  
    return {
      paths: paths,
      fallback: 'blocking',
    }
  
}


export default function Article(props) {


    return (
        
        <main className="article">
            <h1 className="title">
                {props.post.title}
            </h1>
            <Image src={props.post.imageUrl} width={400} height={200}></Image>
            <ReactMarkdown children={props.post.content} />
        </main> 
    )
}

