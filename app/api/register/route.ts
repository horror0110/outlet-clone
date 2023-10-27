import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const POST = async (request: Request) => {
  const { name, email, password, surname } = await request.json();

  if (!name || !surname || !email || !password) {
    return NextResponse.json(
      { error: "Талбаруудыг бөглөнө үү" },
      { status: 200 }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Зөв имэйл хаяг оруулна уу" },
      { status: 200 }
    );
  }

  const duplicateEmail = await prisma.user.findUnique({
    where: { email: email },
  });

  if (duplicateEmail) {
    return NextResponse.json(
      { error: "Имэйл хаяг бүртгэлтэй байна" },
      { status: 200 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.error();
  }
};
