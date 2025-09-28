import { NextRequest, NextResponse } from "next/server";
import { searchIsbn } from "@/services/GoogleClient";

export async function GET(request: NextRequest): Promise<NextResponse> {
    
    const isbn = request.nextUrl.searchParams.get('isbn');

    if(isbn) {
        return NextResponse.json(
            await searchIsbn(isbn),
            { status: 200 }
        )
    } else {
        return NextResponse.json(
            {error: {message: `ISBN not Supplied`}},
            {status: 400}
        )
    }
}