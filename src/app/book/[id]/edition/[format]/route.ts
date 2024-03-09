import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'
import { getBook } from '@/services/BookLoader';
import { BookFormat } from '@/components/Book/types';

import mime from 'mime-types';

interface BookEditionRequest {
    id: string;
    format: BookFormat;
}

interface BookEditionRequestParams {
    params: BookEditionRequest;
}

export async function GET(request: Request, { params: { id, format } }: BookEditionRequestParams): Promise<NextResponse> {

    const book = await getBook(id);

    if (book) {
        const edition = book.editions.find(edition => edition.format == format)
        if (edition) {
            const streamer = await streamFile([edition.url]);
            const filename = edition.url.split('/').pop();
            return new NextResponse(streamer.data, {
                status: 200,
                headers: new Headers({
                    'content-type': `${mime.lookup(format)}`,
                    'content-length': streamer.contentSize,
                    'content-disposition': `attachement; filename="${filename}"`,
                }),
            });
        } else {
            return NextResponse.json({ error: { message: `Edition not fouond`, id: id, format: format } }, {
                status: 404,
            });
        }
    } else {
        return NextResponse.json({ error: { message: `Book not fouond`, id: id } }, {
            status: 404,
        });
    }
}