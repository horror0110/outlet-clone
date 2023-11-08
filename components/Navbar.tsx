"use client";
import Image from "next/image";
import Link from "next/link";
import { GiGymBag } from "react-icons/gi";

import Dropdown from "./Dropdown";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { GlobalContext } from "@/context/GlobalContext";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {
  const [data, setData] = useState([]);
  const { data: session, status } = useSession();

  console.log(session);

  const { cartCount }: any = useContext(GlobalContext);

  const handleSignOut = async () => {
    await signOut();
  };

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
        {status === "unauthenticated" ? (
          <div className="flex gap-2 text-[#a3afef]">
            <Link href="/login">Нэвтрэх</Link>|
            <Link href="/register">Бүртгүүлэх</Link>
          </div>
        ) : (
          <span className="text-white">
            <span className="text-warning">Сайн байна уу? </span>
            <span className="uppercase">{session?.user.name}</span>

            <div className="dropdown dropdown-bottom text-black  ">
              <label
                tabIndex={0}
                className="btn m-1 bg-[#232f3f] text-white border-none"
              >
                <AiFillCaretDown />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {status === "authenticated" && session?.user?.isAdmin && (
                  <li>
                    <Link href="/admin/add">бараа нэмэх</Link>
                  </li>
                )}

                <li>
                  <button onClick={handleSignOut}>гарах</button>
                </li>
              </ul>
            </div>
          </span>
        )}

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
