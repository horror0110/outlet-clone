import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  try {
    const checkout = await prisma.checkout.findMany({
      where: { email: params.email },
    });

    return NextResponse.json({ data: checkout }, { status: 200 });
  } catch (err) {
    console.log("server error", err);
    return NextResponse.error();
  }
};


export const DELETE = async (request: Request, { params }: any) => {
  try {
    const checkouts = await prisma.checkout.deleteMany({
      where: { email: params.email },
    });

    return NextResponse.json({ data: checkouts }, { status: 200 });
  } catch (err) {
    console.log("server error", err);
    return NextResponse.error();
  }
};


