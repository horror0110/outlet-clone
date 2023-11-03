import React from "react";

const Filter = ({ setColorFilter, colorFilter }: any) => {
  const filter = {
    colors: ["Хар", "Цагаан"],
  };

  const handleColorRadioButtonChange = (selectedColor: string) => {
    if (selectedColor === colorFilter) {
      setColorFilter("");
    } else {
      setColorFilter(selectedColor);
    }
  };
  return (
    <div className=" h-auto border border-gray-200 p-5">
      <h1 className="text-xl text-mainColor font-semibold mb-5">Шүүлтүүрүүд</h1>

      <span className="">өнгө</span>

      <div>
        {filter.colors.map((color: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-5 mb-2">
            <input
              onChange={() => handleColorRadioButtonChange(color)}
              value={color}
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={colorFilter === color}
            />
            <span>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
