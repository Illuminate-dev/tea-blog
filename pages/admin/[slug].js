import { doc, getDoc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { firestore } from "../../lib/firebaseConfig";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { AuthUserContext, useAuth } from "../../lib/authUserContext"
import toast from "react-hot-toast";
import ImageUploader from "../../components/ImageUploader";

export default function AdminArticlePage({}) {
    const userAuth = useAuth();

    return (
        <>{!userAuth.loading && userAuth.user ?
        <main>
          <ArticleManager/>  
        </main> : null }</>
    )
}

function ArticleManager() {
    const router = useRouter();
    const { slug} = router.query;
    
    const articleRef = doc(firestore, "articles", slug);
    const article = useDocumentData(articleRef)[0];
    
    return (
        <main>
            {article && 
            (
                <>
                    <section>
                        <h1 className="title">{article.title}</h1>
                        <p>Slug: <em>{article.slug}</em></p>
                    </section>

                    <ArticleForm articleRef={articleRef} defaultValues={article}/>

                </>
            )}
        </main>
    )
}


function ArticleForm({defaultValues, articleRef}) {

    const [preview , setPreview] = useState(false);
    const [content, setContent] = useState(defaultValues.content);
    const router = useRouter();

    const isReady = content.length > 0;


    const submitHandler = async e => {
        e.preventDefault();

        const data = {
            updatedAt: serverTimestamp(),
            content
        }

        await updateDoc(articleRef, data).then(() => {
            toast.success("Post updated!")
            router.push(`/articles/${defaultValues.slug}`)
        });
    }
    return (
        <form id="createArticleForm" onSubmit={submitHandler}>
            { preview ?
                <div id="preview">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div> 
            :
            <>
                <label htmlFor="articleContent">Content</label>
                <textarea rows={15} id="articleContent" value={content} onChange={(e) => setContent(e.target.value)}/>
                <ImageUploader />
                <button type="submit" >Save Article</button>
            </>}
            <button type="button" disabled={!isReady} onClick={(e) => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</button>
        </form>

    )

}
