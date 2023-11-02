"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
const thousandify = require("thousandify");
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import { calculateTotalPrice } from "@/components/CartUtils";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { data: session, status }: any = useSession();

  const [data, setData] = useState<any>([]);
  const { setSpinner }: any = useContext(GlobalContext);

  const router = useRouter();

  const handleIncrement = (index: number) => {
    const updatedData = [...data];
    if (updatedData[index].quantity < 999) {
      updatedData[index].quantity++;
      setData(updatedData);
    }
  };

  const handleDecrement = (index: number) => {
    const updatedData = [...data];
    if (updatedData[index].quantity > 1) {
      updatedData[index].quantity--;
      setData(updatedData);
    }
  };

  const email = session?.user?.email;

  useEffect(() => {
    setSpinner(true);
    fetch(`/api/cart/${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        setData(data.data);
      });
  }, [session]);

  const total = calculateTotalPrice(data);

  const handleDelete: any = (id: any) => {
    setSpinner(true);
    fetch(`/api/cart/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSpinner(false);
        setData((prevProduct: any) =>
          prevProduct.filter((product: any) => product.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCheckout = (e: any) => {
    e.preventDefault();

    setSpinner(true)

    const checkoutData = data.map((item: any, index: number) => {
      return {
        email: session?.user?.email,
        totalPrice: total,
        title: item.title,
        quantity: item.quantity,
        productPrice: item.price,
        price: item.quantity * item.price,
        image: item.images[0],
      };
    });

    const checkoutPromises = checkoutData.map((itemData: any) => {
      return fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
    });

    Promise.all(checkoutPromises)
      .then((responses) => {
        responses.forEach((response, index) => {
          setSpinner(false);
          router?.push("/checkout");
          console.log(
            `Checkout for item ${index + 1} successful. Response:`,
            response
          );
        });
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  if (data.length === 0) {
    return (
      <div className="h-screen w-screen bg-gray-300 text-mainColor flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center mt-16">
          <FiShoppingCart color="black" size={80} className="mb-5 " />
          <h1 className="text-3xl font-semibold">
            Таны сагсанд бараа хийгдээгүй байна
          </h1>
          <Link className="btn btn-warning mt-5" href="/collections/today-sale">
            Бараанууд үзэх
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-56 mx-10">
      <h1 className="mb-10 text-mainColor text-3xl font-semibold">
        Миний сагс
      </h1>

      <div className="flex gap-10">
        <div className="w-[60%] border border-gray-200">
          <div className="flex items-center justify-between m-5 text-mainColor text-sm">
            <span>Бараа</span>
            <div className="flex items-center gap-28">
              <span>Ширхэг</span>

              <span>Нийт</span>
            </div>
          </div>

          <div className="w-full border border-gray-200 my-5"></div>

          <div className="flex flex-col gap-8 ">
            {data ? (
              data.map((product: any, index: number) => (
                <div key={product.id} className="">
                  <div className="flex gap-5 items-center justify-between mx-5">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={70}
                      height={70}
                      className="object-cover"
                    />
                    <div>
                      <h1>{product.title}</h1>
                      <div className="flex gap-3 items-center">
                        <span>{product.price}</span>
                        <s>{product.salePrice}</s>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="px-4 py-2 border border-gray-300 text-black rounded-md"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="px-4 py-2 text-center border border-gray-300  rounded-md w-[70px]"
                          value={product.quantity}
                          readOnly
                        />
                        <button
                          onClick={() => handleIncrement(index)}
                          className="border-gray-300 px-4 py-2 border text-black rounded-md"
                        >
                          +
                        </button>
                      </div>

                      <div>
                        <button onClick={() => handleDelete(product.id)}>
                          Хасах
                        </button>
                      </div>
                    </div>

                    <span className="text-center">
                      {thousandify(product.price * product.quantity)}
                    </span>
                  </div>

                  <div className="border w-full border-gray-200 my-5"></div>
                </div>
              ))
            ) : (
              <p className="mt-48">loading</p>
            )}
          </div>
        </div>

        <div className="w-[40%] border border-gray-200 p-5 text-mainColor">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center justify-between">
              <h1>Нийт</h1>
              <span className="font-semibold">
                {thousandify(calculateTotalPrice(data))} MNT
              </span>
            </div>

            <span className="my-10">Захиалгын тэмдэглэл</span>

            <span>Татвар ба хүргэлт үнэгүй</span>

            <Link
              onClick={handleCheckout}
              href="/checkout"
              className="btn btn-warning "
            >
              Захиалах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
