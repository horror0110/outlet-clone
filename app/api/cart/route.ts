import {prisma}from "../../libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const existingProduct: any = await prisma.cart.findMany({
      where: {
        email: body.email,
        title: body.title,
      },
    });

    if (existingProduct.length > 0) {
      const updatedProduct = await prisma.cart.update({
        where: {
          id: existingProduct[0].id,
        },
        data: {
          quantity: existingProduct[0].quantity + body.quantity,
        },
      });
      return NextResponse.json({ data: updatedProduct }, { status: 200 });
    } else {
      const product = await prisma.cart.create({
        data: {
          email: body.email,
          category: body.category,
          savings: body.savings,
          star: body.star,
          color: body.color,
          price: body.price,
          salePrice: body.salePrice,
          balance: body.balance,
          title: body.title,
          description: body.description,
          images: body.images,
          quantity: body.quantity,
        },
      });

      return NextResponse.json({ data: product }, { status: 200 });
    }
  } catch (err) {
    console.log("Error deleting product", err);
    return NextResponse.error();
  }
};
