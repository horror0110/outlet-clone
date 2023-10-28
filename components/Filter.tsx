import React from "react";


const Filter = () => {
  return (
    <div className=" h-auto border border-gray-200 p-5">
      <h1 className="text-xl text-mainColor font-semibold mb-5">Шүүлтүүрүүд</h1>

      <span className="">өнгө</span>

      <div className="flex items-center gap-2 mt-5 mb-2">
        <input type="checkbox" className="checkbox checkbox-warning" />
        <span>Хар</span>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" className="checkbox checkbox-warning" />
        <span>Цагаан</span>
      </div>
    </div>
  );
};

export default Filter;
