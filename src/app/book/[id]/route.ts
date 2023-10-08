import { NextResponse } from "next/server";

import { getBook } from "@/services/BookLoader";

interface BookRequestParams {
    id: string;
}

interface BookRequest {
    params: BookRequestParams
}

export async function GET(request: Request, { params: { id } } : BookRequest ): Promise<NextResponse> {

    const book = await getBook(id);

    if(book) {
        return NextResponse.json(book, {
            status: 200,
        });
    } else {
        return NextResponse.json({error: {message: `Book not fouond`, id: id}}, {
            status: 404,
        });
    }
}