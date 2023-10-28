import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try{
        const products = await prisma.product.findMany();

        return NextResponse.json(products)
    }   
    catch(error){
        console.log('Error fetching products', error)
        return NextResponse.error()
    }
}