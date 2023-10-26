"use client";
import React, { useState } from "react";
import data from "../utils/data.json";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsChevronRight, BsChevronLeft, BsDot } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
const thousandify = require("thousandify");

const Product = () => {
  const [swiper, setSwiper] = useState<any>(null);

  const star = (starNumber: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < starNumber ? "orange" : "gray";
      stars.push(<AiFillStar color={starColor} className="" size={15} />);
    }

    return stars;
  };

  const nexto = () => {
    swiper.slideNext();
  };

  const backto = () => {
    swiper.slidePrev();
  };
  return (
    <div>
      <Swiper
        breakpoints={{
          // When window width is >= 640px
          390: {
            slidesPerView: 1,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={0}
        onSwiper={(s) => {
          setSwiper(s);
        }}
        speed={700}
        pagination={{ clickable: true }}
        slidesPerView={4}
      >
        <div className="">
          {data.map((product: any, index: number) => (
            <SwiperSlide key={product.id}>
              <div className="w-[250px] mx-auto h-auto border p-5">
                <Link href={`/products/${product.id}`}>
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute text-white bg-black rounded-md px-2  text-sm z-50">
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
            </SwiperSlide>
          ))}
        </div>

        <div
          onClick={nexto}
          className="bg-warning rounded-full p-3 w-max absolute right-0 top-1/2 mr-2 transition z-50 hover:opacity-50"
        >
          <BsChevronRight color="black" />
        </div>

        <div
          onClick={backto}
          className="bg-warning  rounded-full p-3 w-max absolute left-0 top-1/2 ml-2 transition z-50 hover:opacity-50"
        >
          <BsChevronLeft className="" color="black" />
        </div>
      </Swiper>
    </div>
  );
};

export default Product;
