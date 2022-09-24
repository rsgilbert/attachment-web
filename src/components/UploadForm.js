import React, { useState } from "react";
import axios from "axios";

const api = 'http://localhost:3001'



export const UploadForm = () => {
    const [err, setErr] = useState('no error')
    const [uploadProgress, setUploadProgress] = useState({
        loaded: 0,
        total: 1
    })
    const handleSubmit = e => {
        e.preventDefault()
        setErr('')
        console.log(e.target)
        uploadThroughFileInput((e, result) => {
            if (e) {
                console.log('err', e)
                return setErr('Upload error: ' + e.message)
            }
            console.log('result is', result)
        })

    }

    return (
        <div>
            <h1>Upload Form</h1>
            <p>{err}</p>
            <progress 
                value={uploadProgress.loaded}
                max={uploadProgress.total}
                />
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    Upload
                </button>
            </form>
        </div>
    )


    // Upload a file to file server.
    // Once the upload is complete the callback is invoked with the file key (key is the name of the file uploaded)
    function uploadThroughFileInput(callback) {
        const handleUpload = async (e) => {
            try {
                const file = e.target.files[0];
                console.log('file', file);
                const uploadUrl = `${api}/attachments`;
                const formData = new FormData();
                formData.append('uploaded_file', file);
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                }
                const fileServerResult = await axios.post(
                    uploadUrl, formData, {
                        ...config, onUploadProgress: function onUploadProgress(progressEvent) {
                            console.log('ev', progressEvent)
                            setUploadProgress({
                                loaded: progressEvent.loaded,
                                total: progressEvent.total
                            })
                        }
                });
                callback(null, fileServerResult.data);
            } catch (error) {
                (error.response)
                    ? callback(Error(error.response.body || error.response.statusText || error.message))
                    : callback(Error(error.message))
            }
        }
        const i = document.createElement('input')
        i.name = 'my-file'
        i.type = 'file'
        i.addEventListener('change', handleUpload)
        i.click()
    }
}
