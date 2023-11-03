"use client";
import Image from "next/image";
import Link from "next/link";
import { GiGymBag } from "react-icons/gi";

import Dropdown from "./Dropdown";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
  const [data, setData] = useState([]);
  const {data:session , status} = useSession();

  const {cartCount}:any = useContext(GlobalContext);

  useEffect(() => {
    fetch("/api/categories", {
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="flex flex-col fixed top-0 left-0 w-full z-50">
      <div className="bg-[#232f3e] h-[110px] flex justify-between items-center px-10 ">
        <Link href="/">
          <Image
            src="https://www.outlet.mn/cdn/shop/files/Outlet.mn_white_ver_wide_200x@2x.png?v=1614329682"
            width={200}
            height={200}
            alt="logo"
            className="object-contain"
          />
        </Link>

        <Dropdown />
          {status === "unauthenticated" ?     <div className="flex gap-2 text-[#a3afef]">
          <Link href="/login">Нэвтрэх</Link>|
          <Link href="/register">Бүртгүүлэх</Link>
        </div> : <span className="text-white"><span className="text-warning">Сайн байна уу?</span> {session?.user.name}</span>}
    

        <Link href="/cart" className="flex items-center gap-3">
          <div className="relative">
            <GiGymBag color="white" size={25} />
            <span className="text-white absolute right-[-5px] top-[-15px] bg-warning rounded-full px-1   ">
             {cartCount}
            </span>
          </div>

          <span className="text-white">Сагс</span>
        </Link>
      </div>

      <div className="bg-white flex items-center px-10 gap-8 h-[70px]  text-md text-slate-800 border-b ">
        {data.map((el: any, index: number) => (
          <Link
            key={el.id}
            className="hover:text-warning transition"
            href={el.slug === "/" ? "/" : `/collections/${el.slug}`}
          >
            {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
