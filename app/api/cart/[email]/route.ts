import { prisma } from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  try {
    const products = await prisma.cart.findMany({
      where: { email: params.email },
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (err) {
    console.log("server error", err);
    return NextResponse.error();
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    const product = await prisma.cart.delete({
      where: { id: params.email },
    });

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (err) {
    console.log("server error", err);
    return NextResponse.error();
  }
};
