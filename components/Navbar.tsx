import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiGymBag } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-[#232f3e] h-[110px] flex justify-between items-center px-10 ">
        <div>
          <Image
            src="https://www.outlet.mn/cdn/shop/files/Outlet.mn_white_ver_wide_200x@2x.png?v=1614329682"
            width={200}
            height={200}
            alt="logo"
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="form-control">
            <div className="input-group">
              <select className="select select-bordered">
                <option disabled selected>
                  Pick category
                </option>
                <option>T-shirts</option>
                <option>Mugs</option>
              </select>
              <button className="btn">Go</button>
            </div>
          </div>

          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
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
        </div>

        <div className="flex gap-2 text-[#a3afef]">
          <Link href="/">Нэвтрэх</Link>|<Link href="/">Бүртгүүлэх</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <GiGymBag color="white" size={25} />
            <span className="text-white absolute right-[-5px] top-[-15px] bg-warning rounded-full px-1   ">
              0
            </span>
          </div>

          <span className="text-white">Сагс</span>
        </div>
      </div>

      <div className="bg-white flex items-center px-10 gap-8 h-[70px]  text-md text-slate-800 border-b ">
        <Link className="hover:text-warning transition" href="/">Нүүр хуудас</Link>
        <Link className="hover:text-warning transition" href="/">Зөвхөн өнөөдөр хямдарсан</Link>
        <Link className="hover:text-warning transition" href="/">Сүүлийн үеийн тренд</Link>
      </div>
    </div>
  );
};

export default Navbar;
