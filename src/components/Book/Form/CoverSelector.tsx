"use client";

import { PdfCoverSelector } from "./PdfCoverSelector";
import { EpubCoverSelector } from "./EpubCoverSelector";

interface CoverSelectorProps {
     width: number
     height: number
     content: string | ArrayBuffer | null
     type: string,
     onCoverSelected: {(coverData: Blob) : void}
}

export function CoverSelector({width, height, content, type, onCoverSelected} : CoverSelectorProps) {

    return <div>
        { type == 'application/pdf' && <PdfCoverSelector width={width} height={height} content={content} onCoverSelected={onCoverSelected} /> }
        { type == 'application/epub+zip' && <EpubCoverSelector width={width} height={height} content={content} onCoverSelected={onCoverSelected} /> }
    </div>
}