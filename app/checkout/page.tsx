"use client";

import { GlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
const thousandify = require("thousandify");

const CheckoutPage = () => {
  const { data: session } = useSession();

  const { setSpinner }: any = useContext(GlobalContext);

  const email = session?.user?.email;

  const [data, setData] = useState<any>([]);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    setSpinner(true);
    fetch(`/api/checkout/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [session, email, setSpinner]);

  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  const clearItemsInCheckout = () => {
    fetch(`/api/checkout/${email}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
        setData([]); // Reset the items in the checkout on the client side
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsCheckoutPage(true);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (!ordered && isCheckoutPage) {
        clearItemsInCheckout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [ordered, isCheckoutPage, clearItemsInCheckout]);

  return (
    <div className="mt-48 mx-20  h-auto">
      <div className="flex gap-10">
        <div className="flex flex-col w-[50%] border-r h-full p-5">
          <span className="text-gray-500 mb-3">Account</span>
          <span className="border-b border-b-gray-300 pb-2 text-sm">
            {email}
          </span>
          <div className="flex items-center gap-2 my-5 text-sm">
            <input
              type="checkbox"
              className="checkbox checkbox-warning w-5 h-5"
            />
            <p>Шинэ бараа болон хямдралын мэдээг надад илгээж байна уу</p>
          </div>

          <h1 className="mb-2 font-bold text-2xl mt-3">Хүргэлтийн мэдээлэл</h1>

          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Улс</span>
            </label>
            <select className="select select-bordered">
              <option disabled selected>
                Mongolia
              </option>
            </select>
          </div>

          <div className="flex items-center gap-5 mb-3">
            <input
              type="text"
              placeholder="Овог"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Нэр"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <input
            type="text"
            placeholder="Хаяг"
            className="input input-bordered w-full mb-3 py-5"
          />

          <input
            type="text"
            placeholder="Хаалгын тоот"
            className="input input-bordered w-full py-5"
          />

          <div className="flex items-center gap-5 my-3">
            <input
              type="text"
              placeholder="Дүүрэг/Аймаг"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Шуудангын хаяг"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <input
            type="text"
            placeholder="Утас"
            className="input input-bordered w-full py-5 mb-3"
          />

          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              className="checkbox checkbox-warning w-5 h-5 text-xs"
            />
            <p>Шинэ бараа хямдралын мэдээ илгээх</p>
          </div>

          <h1 className="my-3 font-bold">
            Зөвхөн өнөөдрийн захиалга, хүргэлтийн санал
          </h1>

          <p className="my-3 text-sm">
            11:00AM цагаас өмнө захиалсан захиалга өнөөдөр хүргэгдэнэ. 11:00AM
            цагаас хойш захиалсан захиалга маргааш хүргэгдэнэ
          </p>

          <div className="flex items-center bg-gray-200 text-sm py-5 justify-between border border-black rounded-md p-3">
            <span>Хүргэлтийн төлбөр</span>
            <span>Үнэгүй</span>
          </div>

          <h1 className="mt-5 mb-2 font-bold text-2xl">Тооцооны хэсэг</h1>
          <p className="my-2 text-sm text-gray-500 mb-3">
            Гүйлгээ хийснээс хойших гүйлгээний аюулгүй байдал болон барааны
            хүргэлтийг Outlet.mn хариуцна
          </p>

          <div className="flex bg-gray-200 items-center justify-between border border-black rounded-md p-3">
            <span>Шилжүүлэг</span>
            <span></span>
          </div>
          <p className="text-sm mt-2 bg-gray-200 p-2">
            Бүтээгдэхүүний дээрх үнийн дүнг нийлүүлэгчийн Хаан Банк 5301 3958 08
            /Наранцацрал/ дансанд шилжүүлэхдээ гүйлгээний утга дээр зөвхөн
            утасны дугаараа бичнэ үү. Гүйлгээ хиймэгцээ Захиалах товч дарсанаар
            Захиалга амжилттай баталгаажна
          </p>
          <button className="btn btn-warning mt-10">
            Захиалгыг баталгаажуулах
          </button>
        </div>

        <div>
          {data ? (
            data.map((product: any, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={product.image}
                    width={60}
                    height={70}
                    className="object-cover"
                    alt={product.title}
                  />
                  <span className="absolute -top-3 -right-3 text-sm px-2 bg-black rounded-full text-white">
                    {product.quantity}
                  </span>
                </div>

                <span> {product.title}</span>
                <span className="text-sm font-bold ml-10">
                  ₮{thousandify(product.price)}
                </span>
              </div>
            ))
          ) : (
            <p>loading</p>
          )}
          <div className="flex justify-between my-2 text-sm">
            <span className="">Хүргэлт</span>
            <span>Үнэгүй</span>
          </div>

          <div className="flex justify-between mt-5">
            <span className="font-semibold">Нийлбэр</span>
            {data[0] ? (
              <span className="font-bold">
                MNT ₮{thousandify(data[0].totalPrice)}
              </span>
            ) : (
              <span>loading...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
