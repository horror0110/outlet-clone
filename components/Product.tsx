"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsChevronRight, BsChevronLeft, BsDot } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import Slider from "./Slider";
const thousandify = require("thousandify");

const Product = () => {
  const [data, setData] = useState<any>([]);
  const { setSpinner, setDataValue }: any = useContext(GlobalContext);

  useEffect(() => {
    setSpinner(true);
    fetch("/api/products", {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        setData(data);
        setDataValue(data);
      })
      .catch((err) => console.log(err));
  }, [setDataValue, setData, setSpinner]);

  return (
    <div>
      <h1 className="ml-10 mb-5 text-mainColor text-2xl font-semibold">
        Сүүлийн үеийн чиг хандлага
      </h1>
      <Slider data={data} />
    </div>
  );
};

export default Product;
