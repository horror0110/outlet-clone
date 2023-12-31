"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

const Dropdown = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const data = [
    {
      id: 1,
      title: "Аялал",
      slug: "aylal",
    },
    {
      id: 2,
      title: "Тавилга",
      slug: "tavilga",
    },
    {
      id: 3,
      title: "Гал тогооны хэрэгсэл",
      slug: "gal-togoonii-heregsel",
    },
  ];

  const handleCategoryChange = (e: any) => {
    const categorySlug = e.target.value;

    setSelectedCategory(categorySlug);

    if (categorySlug) {
      router.push(`/collections/${categorySlug}`);
    } else {
      router.push("/");
    }
  };

  const { dataValue }: any = useContext(GlobalContext);

  const filteredProducts = dataValue.filter((product: any) => {
    return searchValue.toLowerCase() === ""
      ? ""
      : product.title.toLowerCase().includes(searchValue);
  });
  return (
    <div className="relative  flex items-center gap-2">
      <div className="form-control">
        <div className="input-group">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered"
          >
            <option value="">Бүх категори</option>
            {data.map((el: any, index: number) => (
              <option key={el.id} value={el.slug}>
                {el.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button className="btn btn-square bg-warning text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/**** search dropdown *****/}

      {searchValue && (
        <div
          onMouseLeave={() => setSearchValue("")}
          className="absolute rounded-md w-full top-12 bg-white z-50 p-5 h-auto"
        >
          <h1 className="text-sm mb-5 text-mainColor">БАРАА</h1>
          <div className="flex flex-col gap-5 max-h-[300px] overflow-y-scroll">
            {filteredProducts.length > 0 ? (
              <div>
                {filteredProducts.map((product: any, index: number) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex hover:bg-slate-300 items-center  gap-5 border-b pb-2"
                  >
                    <Image
                      src={product.images[0]}
                      alt="searchImg"
                      width={50}
                      height={50}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <h1>{product.title}</h1>
                      <span className="text-warning">{product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-sm text-mainColor">Илэрц алга...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
