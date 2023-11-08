"use client";
import React, { useState } from "react";

const AddProductPage = () => {
  const [formData, setFormData] = useState<any>({
    title: "",
    category: [],
    images: [],
    balance: false,
    color: [],
    description: "",
    price: "",
    salePrice: "",
    star: "",
    savings: "",
  });

  const getCategory = (e: any) => {
    let categories = e.target.value;

    let categoryArray: any;
    if (categories.includes(",")) {
      categoryArray = categories.split(",");
    } else {
      categoryArray = [categories];
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      category: categoryArray,
    }));
  };

  const getImages = (e: any) => {
    let images = e.target.value;

    let imagesArray: any;
    if (images.includes(",")) {
      imagesArray = images.split(",");
    } else {
      imagesArray = [images];
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      images: imagesArray,
    }));
  };

  const getColors = (e: any) => {
    let colors = e.target.value;

    let colorArray: any;

    if (colors.includes(",")) {
      colorArray = colors.split(",");
    } else {
      colorArray = [colors];
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      color: colorArray,
    }));
  };

  const handleCreate = (e: any) => {
    e.preventDefault();

    const readyData = {
      title: formData.title,
      balance: formData.balance,
      description: formData.description,
      star: parseInt(formData.star),
      savings: parseInt(formData.savings),
      price: parseInt(formData.price),
      salePrice: parseInt(formData.salePrice),
      images: formData.images,
      color: formData.color,
      category: formData.category,
    };

    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(readyData),
    })
      .then((response) => {
        if (response.ok) {
          alert("amjilttai baraa uusgelee");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleBalance = (e: any) => {
    if (e.target.value === "Байгаа") {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        balance: true,
      }));
    } else if (e.target.value === "Дууссан") {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        balance: false,
      }));
    }
  };
  return (
    <div className="container mx-10 mt-48">
      <form onSubmit={handleCreate} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            type="text"
            id="title"
            name="title"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold">
            Category
          </label>
          <input
            onChange={getCategory}
            type="text"
            id="category"
            name="category"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block font-semibold">
            images
          </label>
          <input
            onChange={getImages}
            type="text"
            id="images"
            name="images"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="balance" className="block font-semibold">
            balance
          </label>
          <select onChange={handleBalance} className="select w-full max-w-xs">
            <option disabled selected>
              Үлдэгдэл байгаа эсэх
            </option>

            <option>Байгаа</option>

            <option>Дууссан</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block font-semibold">
            Color
          </label>
          <input
            onChange={getColors}
            type="text"
            id="colors"
            name="colors"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            id="description"
            name="description"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold">
            Price
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
            type="number"
            id="price"
            name="price"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salePrice" className="block font-semibold">
            salePrice
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, salePrice: e.target.value });
            }}
            type="number"
            id="salePrice"
            name="salePrice"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="star" className="block font-semibold">
            Star
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, star: e.target.value });
            }}
            type="number"
            id="star"
            name="star"
            className="w-full border p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="savings" className="block font-semibold">
            Savings
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, savings: e.target.value });
            }}
            type="number"
            id="savings"
            name="savings"
            className="w-full border p-2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
