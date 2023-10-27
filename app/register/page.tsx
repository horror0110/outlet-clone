"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GlobalContext } from "@/context/GlobalContext";

const RegisterPage = () => {
  const { setSpinner }: any = useContext(GlobalContext);
  const [user, setUser] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const Register = async (e: any) => {
    e.preventDefault();

    setSpinner(true);

    const data = {
      surname: user.surname,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    axios
      .post("/api/register", data)
      .then((response: any) => {
        if (response.data.error) {
          setSpinner(false), setError(response.data.error);
        } else {
          setSpinner(false);
          router.push("/login?success=registered");
        }
      })

      .catch((err) => {
        setSpinner(false), console.log(err);
      });
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      Register(e); // Call the login function when Enter is pressed
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full mt-36">
      <div onKeyPress={handleKeyPress} className="h-auto w-[380px] items-center flex flex-col">
        <h1 className="text-mainColor font-semibold text-3xl">
          Бүртгэл үүсгэх
        </h1> 
        <span className="my-5 text-mainColor">Доорх мэдээллийг бөглөнө үү</span>
        <input
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
          type="name"
          placeholder="Овог"
          className={
            error
              ? "mb-3 input input-bordered w-full border border-red-500  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "mb-3 input input-bordered w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
          value={user.surname}
        />
        <input
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          type="name"
          placeholder="Нэр"
          className={
            error
              ? "mb-3 input input-bordered w-full border border-red-500  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "mb-3 input input-bordered w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
          value={user.name}
        />
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Email"
          className={
            error
              ? "mb-3 input input-bordered w-full border border-red-500  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "mb-3 input input-bordered w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
          value={user.email}
        />
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Нууц үг"
          className={
            error
              ? "input input-bordered w-full border border-red-500  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "input input-bordered w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
          value={user.password}
        />
        <button
          onClick={Register}
          className="btn bg-warning text-mainColor w-full mt-5"
        >
          Бүртгэл үүсгэх
        </button>
        <span className="text-red-500 text-center text-sm my-2 font-bold border border-red-500 px-3">
          {error}
        </span>

        <p className="text-center text-xs mt-3 text-mainColor">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
        <div className="flex items-center gap-2 mt-5 text-sm">
          <span className="text-mainColor">
            Таны email хаяг өмнө нь бүртгэлтэй байна
          </span>{" "}
          <Link className="text-warning" href="/login">
            Нэвтрэх
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
