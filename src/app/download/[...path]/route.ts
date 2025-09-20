import { NextResponse } from 'next/server';

import { streamFile } from '@/services/Streamer'

type BookRequestParams = Promise <{
    path: string[];
}>

interface BookRequest {
    params: BookRequestParams
}


export async function GET(request: Request, segmentData: BookRequest): Promise<NextResponse> {

    const params = await segmentData.params;
    const streamer = await streamFile(params.path);
    
    const res = new NextResponse(streamer.data, {
        status: 200,
        headers: new Headers({
            'content-type': `application/${streamer.contentType}`,
            'content-length': String(streamer.contentSize),
        }),
    });

    return res;
}