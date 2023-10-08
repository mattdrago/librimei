import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'

interface BookCoverRequestParams {
    path: string[];
}

interface BookRequest {
    params: BookCoverRequestParams
}


export async function GET(request: Request, { params }: BookRequest): Promise<NextResponse> {

    const streamer = await streamFile(params.path);
    const res = new NextResponse(streamer.data, {
        status: 200,
        headers: new Headers({
            'content-type': `image/${streamer.contentType}`,
            'content-length': streamer.contentSize,
        }),
    });

    return res;
}