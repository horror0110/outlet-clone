"use client";
import React, { useState } from "react";
import data from "../../../utils/data.json";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BiLogoFacebook, BiLogoTwitter } from "react-icons/bi";
import { BsPinterest } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Product from "@/components/Product";

const thousandify = require("thousandify");

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(0);

  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const star = (starNumber: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < starNumber ? "orange" : "gray";
      stars.push(<AiFillStar color={starColor} size={15} />);
    }

    return stars;
  };

  return (
    <div className="mx-10 mb-10 mt-48">
      <div className="flex gap-10">
        <div className="flex gap-16 w-[50%] border rounded-sm p-5 border-gray-300 ">
          <div className="flex flex-col gap-2">
            {data[0].images.map((images: any, index: number) => (
              <Image
                key={index}
                onClick={() => setActiveImage(index)}
                src={images}
                alt="images"
                width={100}
                height={100}
                className={
                  activeImage === index ? "border-[2px] border-warning" : ""
                }
              />
            ))}
          </div>

          <Zoom>
            <Image
              alt="That Wanaka Tree, New Zealand by Laura Smetsers"
              src={data[0].images[activeImage]}
              width="400"
              height="400"
            />
          </Zoom>
        </div>

        <div className="border w-[50%] border-gray-300 p-5 rounded-sm ">
          <h1 className="text-mainColor text-2xl mb-5">{data[0].title}</h1>
          <span className="bg-black text-white rounded-md px-2 py-1 text-sm">
            {data[0].savings}% хэмнэнэ
          </span>

          <div className="text-white flex items-center gap-2 mt-5">
            <div className="bg-gray-300 rounded-full w-max p-1">
              <BiLogoFacebook size={20} />
            </div>
            <div className="bg-gray-300 rounded-full w-max p-1">
              <BiLogoTwitter size={20} />
            </div>

            <div className="bg-gray-300 rounded-full w-max p-1">
              <AiOutlineMail size={20} />
            </div>

            <div className="bg-gray-300 rounded-full w-max p-1">
              <BsPinterest size={20} />
            </div>
          </div>
          <div className="mt-10 flex items-center gap-8">
            <span>Үнэ:</span>

            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold">
                {thousandify(data[0].price)}₮
              </span>
              <s className="text-mainColor">
                {thousandify(data[0].salePrice)}₮
              </s>
            </div>
          </div>

          <div className="h-[50px] flex items-center mt-8 gap-2">
            <span>Ширхэг:</span>
            <div className="flex items-center justify-center">
              <button
                onClick={handleDecrement}
                className="px-4 py-2 border border-gray-300 text-black rounded-md"
              >
                -
              </button>
              <input
                type="text"
                className="px-4 py-2 text-center border border-gray-300  rounded-md w-[70px]"
                value={value}
                readOnly
              />
              <button
                onClick={handleIncrement}
                className="border-gray-300 px-4 py-2 border text-black rounded-md"
              >
                +
              </button>
            </div>
          </div>

          <button className="bg-warning hover:bg-slate-600 transition duration-400 rounded-sm text-lg text-white mt-8 py-2 px-20">
            Захиалах
          </button>

          <div className="mt-5 flex items-center">
            <span className="flex items-center">Үнэлгээ: {star(data[0].star)}</span>
          </div>
        </div>
      </div>

      <div className="text-mainColor  w-[50%] flex flex-col  mt-10 border border-gray-300 rounded-md p-5">
        <h1 className="text-xl mb-5">Бүтээгдэхүүний тайлбар</h1>

        <p className="">{data[0].description}</p>

      </div>

      <div>
          <h1 className="text-2xl text-mainColor mt-10 mb-5 ml-10">Санал болгох</h1>
          <Product/>
      </div>
    </div>
  );
};

export default ProductPage;
