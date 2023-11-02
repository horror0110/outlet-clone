import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  try {
    const category = await prisma.product.findMany({
      where: { category: params.slug },
    });
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    console.log("Error fetching allcolors", error);
    return NextResponse.error();
  }
};
