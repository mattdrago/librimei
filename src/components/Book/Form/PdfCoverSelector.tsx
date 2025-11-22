"use client";

import { RenderParameters } from "pdfjs-dist/types/src/display/api";
import { useEffect, useRef } from "react";

interface PdfCoverSelectorProps {
     width: number
     height: number
     content: string | ArrayBuffer | null
     onCoverSelected: {(coverData: Blob) : void}
}

export function PdfCoverSelector({width, height, content, onCoverSelected} : PdfCoverSelectorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    var currentlyRendering = false;

    async function loadAPage(pageNum:number) {

        if (currentlyRendering)
            return;
        currentlyRendering = true;

        var scale = 1.5;

        // @ts-expect-error pdfjsLib is added to window with the <script> tag
        const pdfjs = window.pdfjsLib as typeof import('pdfjs-dist/types/src/pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

        const pdfDocumentTask = pdfjs.getDocument(content ? content.slice() : '');
        const pdfDocument = await pdfDocumentTask.promise;
        const page = await pdfDocument.getPage(pageNum);

        var viewport = page.getViewport({ scale: 1, });
        var scale = width / viewport.width;

        var viewport = page.getViewport({ scale: scale, });
        // Support HiDPI-screens.
        var outputScale = window.devicePixelRatio || 1;

        const canvas = canvasRef.current!;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height =  Math.floor(viewport.height) + "px";

        var transform : any[]|undefined = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        var renderContext: RenderParameters = {
            canvas: canvas,
            transform: transform,
            viewport: viewport
        } ;

        page.getOperatorList
        
        var renderTask =  page.render(renderContext);
        await renderTask.promise;
        canvas.toBlob((blob) => {
            if(blob) {
                onCoverSelected(blob);
            }
        }, "image/png");
        currentlyRendering = false;
    }

    useEffect(() => {
        loadAPage(1);

    }, [content])

    return <div>
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>;
}

