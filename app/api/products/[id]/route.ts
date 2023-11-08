import {prisma} from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request , {params}:any) {
    try{
        const products = await prisma.product.findUnique({
            where: {id:params.id}
        });

        return NextResponse.json(products)
    }   
    catch(error){
        console.log('Error fetching products', error)
        return NextResponse.error()
    }
}