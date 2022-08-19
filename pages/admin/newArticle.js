import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { ImageUploaderHidden } from "../../components/ImageUploader";
import { AuthUserContext, useAuth } from "../../lib/authUserContext";
import { firestore } from "../../lib/firebaseConfig";

export default function newArticlePage() {
    const userAuth = useAuth();

    return (
        <>{!useAuth.loading && userAuth.user ? 
        <CreateArticle />
        :
        <Link href="/admin">Back</Link>}</>
    )
}

function CreateArticle() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [preview , setPreview] = useState(false);
    const [image, setImage] = useState("");

    const isValid = title.length > 3 && title.length < 100;
    const isReady = content.length > 0 || title.length > 0;
    const slug = title.toLowerCase().replace(/\s+/g, "-");


    const submitHandler = async e => {
        e.preventDefault();

        console.log(slug)
        const ref = doc(firestore, "articles", slug)
        if ((await getDoc(ref)).exists()) {
            toast.error("Article already exists");
            return;
        }

        const data = {
            title,
            slug,
            imageUrl: image,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            content
        }

        await setDoc(ref, data).then(() => {
            toast.success("Article created!")
            router.push(`/admin/${slug}`)
        });
        
        
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
                <label htmlFor="imageuploadbutton">Main Image</label>
                <ImageUploaderHidden onUpload={(url) => {setImage(url)}} id="imageuploadbutton" />
                {image !== "" && <Image src={image} layout="fixed" width={400} height={200}/>}
                <button type="submit" disabled={!isValid}>Create New Article</button>
            </>}
            <button type="button" disabled={!isReady} onClick={(e) => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</button>
        </form>

    )
}