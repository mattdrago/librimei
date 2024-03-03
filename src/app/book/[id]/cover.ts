import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'
import { getBook } from '@/services/BookLoader';


interface BookCoverRequestParams {
    id: string;
}

interface BookCoverRequest {
    params: BookCoverRequestParams;
}

export async function GET(request: Request, { params: { id } }: BookCoverRequest): Promise<NextResponse> {

    const book = await getBook(id);

    if(book) {
        const streamer = await streamFile([book.coverImage.imageSrc]);
        return new NextResponse(streamer.data, {
            status: 200,
            headers: new Headers({
                'content-type': `image/${streamer.contentType}`,
                'content-length': streamer.contentSize,
            }),
        });
    } else {
        return NextResponse.json({error: {message: `Book not fouond`, id: id}}, {
            status: 404,
        });        
    }
}