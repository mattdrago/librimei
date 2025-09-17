import { NextResponse } from "next/server";

import { getSubjects } from "@/services/BookLoader";

export async function GET(): Promise<NextResponse> {

    const subjects = await getSubjects();

    if(subjects) {
        return NextResponse.json(subjects, {
            status: 200,
        });
    } else {
        return NextResponse.json({error: {message: `Subjects not loaded`}}, {
            status: 500,
        });
    }
}