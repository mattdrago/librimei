import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'
import { getBook } from '@/services/BookLoader';

import mime from 'mime-types';

type BookEditionRequestParams = Promise <{
    id: string;
    format: string;
}>

type BookEditionRequest = {
    params: BookEditionRequestParams;
}

export async function GET(request: Request, context: BookEditionRequest): Promise<NextResponse> {

    const params = await context.params;
    const book = await getBook(params.id);

    if (book) {
        const edition = book.editions.find(edition => edition.format == params.format)
        if (edition) {
            const streamer = await streamFile([edition.url]);
            const filename = edition.url.split('/').pop();
            return new NextResponse(streamer.data, {
                status: 200,
                headers: new Headers({
                    'content-type': `${mime.lookup(params.format)}`,
                    'content-length': String(streamer.contentSize),
                    'content-disposition': `attachement; filename="${filename}"`,
                }),
            });
        } else {
            return NextResponse.json({ error: { message: `Edition not fouond`, id: params.id, format: params.format } }, {
                status: 404,
            });
        }
    } else {
        return NextResponse.json({ error: { message: `Book not fouond`, id: params.id } }, {
            status: 404,
        });
    }
}