import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'
import { getBook } from '@/services/BookLoader';

type BookCoverRequestParams = Promise<{
    id: string;
}>

interface BookCoverRequest {
    params: BookCoverRequestParams;
}

export async function GET(request: Request, context: BookCoverRequest): Promise<NextResponse> {

    const params = await context.params
    const book = await getBook(params.id);

    if(book) {
        const streamer = await streamFile([book.coverImage.imageSrc]);
        return new NextResponse(streamer.data, {
            status: 200,
            headers: new Headers({
                'content-type': `image/${streamer.contentType}`,
                'content-length': String(streamer.contentSize),
            }),
        });
    } else {
        return NextResponse.json({error: {message: `Book not fouond`, id: params.id}}, {
            status: 404,
        });        
    }
}