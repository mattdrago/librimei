"use client";

import EPub from "epub";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

interface EpubCoverSelectorProps {
    width: number
    height: number
    content: string | ArrayBuffer | null
    onCoverSelected: { (coverData: Blob): void }
}

export function EpubCoverSelector({ width, height, content, onCoverSelected }: EpubCoverSelectorProps) {

    var [imageContent, setImageContent] = useState<string>();
    var [error, setError] = useState<string>();

    async function extractImage() {
        if (content == null) {
            return;
        }

        const buf = (typeof content == "string") ? Buffer.from(content) : Buffer.from(content);
        // @ts-expect-error EPub pass the filename to the adm-zip which can handle filename being a Buffer
        const epub = new EPub(buf, '', '');

        const promise = new Promise<void>((resolve, reject) => {
            epub.on('end', () => resolve());
            epub.on('error', () => reject("Error loading epub"));
        });

        epub.parse();

        await promise;

        if ('cover' in epub.metadata) {
            const coverId = epub.metadata['cover'] as string;
            epub.getImage(coverId, (error, data, mimeType) => {

                if(error) {
                    setError(error.message);
                } else {
                    const blob = new Blob([data.buffer as ArrayBuffer], { type: mimeType });
    
                    setImageContent(URL.createObjectURL(blob));
                    onCoverSelected(blob);
                }
            })
        }

    }

    useEffect(() => {
        extractImage();

    }, [content])

    return <div>{ error != undefined ?
        <div><FontAwesomeIcon icon={faExclamation} /> {error}</div> : <img src={imageContent} width={width} height={height} />
    }</div>
}