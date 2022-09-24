import React, { useEffect, useState } from "react";
import { downloadAttachment, downloadThroughAnchorLink, fetchAttachments } from "../api/attachments";

export const AttachmentList = () => {
    /**@type{[Attachment[],any]} */
    const [attachments, setAttachments] = useState([])

    useEffect(() => {
        (async () => {
            setAttachments(await fetchAttachments())
        })()
    }, [])

    function renderItems() {
        return attachments.map(attachment =>
            <AttachmentListItem
                attachment={attachment}
                key={attachment.id}
            />)
    }
    return (
        <div>
            <ul>
                {renderItems()}
            </ul>
        </div>
    )
}

/**
 * 
 * @param {Attachment} attachment 
 * @returns 
 */
const AttachmentListItem = ({ attachment }) => {
    const downloadHandler = e => {
        downloadAttachment(attachment)
    }
    
    return (
        <li>
            <span>{attachment.filename}</span>
            <button onClick={downloadHandler}>Download</button>
        </li>
    )
}