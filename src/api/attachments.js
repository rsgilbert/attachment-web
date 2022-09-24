import axios from "axios"
import { errorMessageFor } from "./utils"

export const api = 'http://localhost:3001'

/**
 * 
 * @param {LoginCredentials} credentials 
 * @returns {Attachment[]}
 */
export const fetchAttachments = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${api}/attachments`,
            withCredentials: true
        })
        console.log('data', response.data)
        return response.data
    }
    catch (e) {
        throw Error(errorMessageFor(e))
    }
}

/**
 * Download an attachment
 * @param {Attachment} attachment 
 */
export function downloadAttachment(attachment) {
    const downloadUrl = `${api}/attachments/download?disk_filename=${attachment.disk_filename}`
    downloadThroughAnchorLink(downloadUrl)
}


export function downloadThroughAnchorLink(downloadUrl) {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = downloadUrl
    a.click()
}



