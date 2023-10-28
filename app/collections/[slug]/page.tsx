import Filter from "@/components/Filter";
import React from "react";
import data from "../../../utils/data.json";
import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
const thousandify = require("thousandify");

const CategoryPage = () => {
  const star = (starNumber: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < starNumber ? "orange" : "gray";
      stars.push(<AiFillStar color={starColor} className="" size={15} />);
    }

    return stars;
  };
  return (
    <div className="mt-48 mx-10">
      <div className="flex gap-10">
        <div className="w-[25%]">
          <Filter />
        </div>

        <div className="w-[75%] border border-gray-200 p-5">
          <h1 className="text-mainColor text-3xl font-semibold mb-5">
            Зөвхөн өнөөдөр хямдарсан бүтээгдэхүүнүүд
          </h1>
          <p className="text-mainColor mb-5">
            Зөвхөн өнөөдөр хямдарсан бүтээгдэхүүний хямдрал зөвхөн тухайн өдөр
            хүчинтэй. Цөөн тохиолдолд дараагийн өдөр үргэлжилж болно.
          </p>
          <div className="flex justify-between items-center gap-10">
            <span className="text-mainColor text-sm">{data.length}ш бараа</span>

            <div className="dropdown z-40 ">
              <label tabIndex={0} className="btn m-1 h-5 bg-white">
                Эрэмбэлэх
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-2">
            {data.map((product: any, index: number) => (
              <div className="w-[230px] mx-auto h-auto border p-5">
                <Link href={`/products/${product.id}`}>
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute text-white bg-black rounded-md px-2  text-sm z-30">
                      {product.savings}% хэмнэнэ
                    </span>
                  </div>
                </Link>

                <Link href={`/products/${product.id}`} className="text-sm">
                  {product.title}
                </Link>
                <div className="flex gap-2 items-center my-3">
                  <span className="semi-bold">
                    {thousandify(product.price)}₮
                  </span>
                  <s className="text-gray-600 text-sm">
                    {thousandify(product.salePrice)}₮
                  </s>
                </div>

                <div className="flex items-center gap-1 mb-1">
                  <div className="flex">{star(product.star)}</div>

                  <span className="text-sm"> {product.star} үнэлгээ</span>
                </div>

                {product.balance ? (
                  <span className="flex items-center text-sm text-green-600 font-semibold">
                    <BsDot size={40} /> Нөөцөд байгаа
                  </span>
                ) : (
                  <span className="flex items-center text-sm text-red-600 text-semibold">
                    <BsDot size={40} /> Дууссан
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
