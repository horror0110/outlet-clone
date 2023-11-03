"use client";
import Filter from "@/components/Filter";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
const thousandify = require("thousandify");

const CategoryPage = ({ params }: any) => {
  const [data, setData] = useState<any>();
  const [count, setCount] = useState<any>();
  const [colorFilter , setColorFilter] = useState<any>("");
  const [sortData , setSortData] = useState<any>("");

  const searchParams: any = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const router = useRouter();

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const { setSpinner }: any = useContext(GlobalContext);
  
  useEffect(() => {
    setSpinner(true);
    fetch(`/api/categories/${params.slug}?page=${page}&color=${colorFilter}&sort=${sortData}`, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        setData(data.data);
        setCount(data.count);
      })
      .catch((err) => console.log(err));
  }, [page , colorFilter , sortData]);

  const star = (starNumber: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < starNumber ? "orange" : "gray";
      stars.push(<AiFillStar color={starColor} className="" size={15} />);
    }

    return stars;
  };

  const changeSortData = (orderType: string) => {
    setSortData(orderType)
  };
  return (
    <div className="mt-48 mx-10">
      <div className="flex gap-10">
        <div className="w-[25%]">
          <Filter setColorFilter={setColorFilter} colorFilter={colorFilter} />
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
            {data ? (
              <span className="text-mainColor text-sm">
                {data.length}ш бараа
              </span>
            ) : (
              <span>loading...</span>
            )}

            <div className="dropdown z-40 ">
              <label tabIndex={0} className="btn m-1 h-5 bg-white">
                Эрэмбэлэх
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => changeSortData("")}>Энгийн</button>
                </li>
                <li>
                  <button onClick={() => changeSortData("asc")}>Үнэ өсөхөөр</button>
                </li>
                <li>
                  <button onClick={() => changeSortData("desc")}>Үнэ буурахаар</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-2">
            {data ? (
              data.map((product: any, index: number) => (
                <div
                  key={product.id}
                  className="w-[230px] mx-auto h-auto border p-5"
                >
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
              ))
            ) : (
              <p>loading...</p>
            )}
          </div>

          <div className="join grid grid-cols-2 mt-5">
            <button
              disabled={!hasPrev}
              onClick={() => router.push(`?page=${page - 1}`)}
              className="join-item btn btn-outline "
            >
              Previous page
            </button>
            <button
              disabled={!hasNext}
              onClick={() => router.push(`?page=${page + 1}`)}
              className="join-item btn btn-outline"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
