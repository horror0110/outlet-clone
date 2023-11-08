import { prisma } from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(products);
  } catch (error) {
    console.log("Error fetching products", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.createMany({
      data: body,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("Error fetching products", error);
    return NextResponse.error();
  }
}
