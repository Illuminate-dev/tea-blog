import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { auth, storage } from "../lib/firebaseConfig";
import Loader from "./Loader";

export default function ImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    const uploadFile = async (e) => {
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split('/')[1];

        const r = ref(storage, `uploads/${Date.now()}.${extension}`)
        setUploading(true);


        const task = uploadBytesResumable(r, file);

        task.on('state_changed', (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);

            task
            .then((d) => getDownloadURL(r))
            .then((url) => {
                setDownloadURL(url);
                setUploading(false);
            });
        });
    } 

    return (
        <div className='box'>
            <Loader show={uploading} />
            {uploading && <h3>Progress: {progress}%</h3>}

            {!uploading && (
                <>
                <label className="btn">
                    📸 Upload Img
                    <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg"/>
                </label>
                </>
            )}

            {downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>}

        </div>
    );
}

export function ImageUploaderHidden({onUpload}) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadFile = async (e) => {
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split('/')[1];

        const r = ref(storage, `uploads/${Date.now()}.${extension}`)
        setUploading(true);


        const task = uploadBytesResumable(r, file);

        task.on('state_changed', (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);

            task
            .then((d) => getDownloadURL(r))
            .then((url) => {
                onUpload(url);
                setUploading(false);
            });
        });
    }

    return (
        <div className='box'>
            <Loader show={uploading} />
            {uploading && <h3>Progress: {progress}%</h3>}

            {!uploading && (
                <>
                <label className="btn">
                    📸 Upload Img
                    <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg"/>
                </label>
                </>
            )}
        </div>

    )
}