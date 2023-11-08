import {prisma} from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try{
        const categories = await prisma.category.findMany();

        return NextResponse.json(categories)
    }   
    catch(error){
        console.log('Error fetching allcolors', error)
        return NextResponse.error()
    }
}