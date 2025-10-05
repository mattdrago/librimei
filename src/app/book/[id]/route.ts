import { NextResponse } from "next/server";

import { getBook, updateBook } from "@/services/BookLoader";

type BookRequestParams = Promise<{
    id: string;
}>

interface BookRequest {
    params: BookRequestParams
}

export async function GET(request: Request, context : BookRequest ): Promise<NextResponse> {

    const params = await context.params;
    const book = await getBook(params.id);

    if(book) {
        return NextResponse.json(book, {
            status: 200,
        });
    } else {
        return NextResponse.json({error: {message: `Book not found`, id: params.id}}, {
            status: 404,
        });
    }
}

export async function PATCH(request: Request, context : BookRequest ): Promise<NextResponse> {
    const params = await context.params;
    const book = await getBook(params.id);

    if(book) {
        const bookChanges = await request.json();

        book.subject = bookChanges.subject;
        await updateBook(book);
        return NextResponse.json(book, {
            status: 200,
        });
    } else {
        return NextResponse.json({error: {message: `Book not fouond`, id: params.id}}, {
            status: 404,
        });
    }
}