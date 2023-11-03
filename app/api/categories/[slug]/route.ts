import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  const { searchParams } = new URL(request.url);

  const page: any = searchParams.get("page");

  const color: string | null = searchParams.get("color");
  const sort: string | null = searchParams.get("sort");

  const POST_PER_PAGE = 1;

  const query: any = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      category: {has: params.slug},
    },
    orderBy: {
      price: sort === "asc" ? "asc" : "desc",
    },
  };
  try {
    const [products, count] = await prisma.$transaction([
      prisma.product.findMany(query),
      prisma.product.count({ where: query.where }),
    ]);

    let filteredProducts = [...products];

    if (color) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.color.includes(color)
      );
    }
    return NextResponse.json(
      { data: filteredProducts, count },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching allcolors", error);
    return NextResponse.error();
  }
};
