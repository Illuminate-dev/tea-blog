import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AuthUserContext } from "../../lib/authUserContext";
import { firestore } from "../../lib/firebaseConfig";

export default function newArticlePage() {
    const { user } = useContext(AuthUserContext);

    return (
        <CreateArticle />
    )
}

function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [preview , setPreview] = useState(false);

    const isValid = title.length > 3 && title.length < 100;
    const isReady = content.length > 0 || title.length > 0;
    const slug = title.toLowerCase().replace(/\s+/g, "-");


    const submitHandler = async e => {
        e.preventDefault();

        console.log(slug)
        const ref = doc(firestore, "articles", slug)

        const data = {
            title,
            slug,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            content
        }

        await setDoc(ref, data);
    }
    return (
        <form id="createArticleForm" onSubmit={submitHandler}>
            { preview ?
                <div id="preview">
                    <h2 className="title">{title}</h2>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div> 
            :
            <>
                <label  htmlFor="articleTitle">Title</label>
                <input type="text" id="articleTitle" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="articleContent">Content</label>
                <textarea rows={15} id="articleContent" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit" disabled={!isValid}>Create New Article</button>
            </>}
            <button type="button" disabled={!isReady} onClick={(e) => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</button>
        </form>

    )
}