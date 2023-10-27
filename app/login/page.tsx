"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const LoginPage = () => {
  const { setSpinner }: any = useContext(GlobalContext);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const params = useSearchParams();
  const [error, setError] = useState<any>("");
  const [success, setSuccess] = useState<any>("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  const Login = (e: any) => {
    e.preventDefault();

    setSpinner(true);

    if (!user.email || !user.password) {
      setSpinner(false);
      return setError(
        <span className=" text-center font-bold mt-3 text-red-700 text-[14px]">
          Имэйл болон нууц үгээ оруулна уу
        </span>
      );
    }
    try {
      setSpinner(true);
      signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch {
      setSpinner(false), console.log("Error while logging in");
    } finally {
      setSpinner(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      Login(e); // Call the login function when Enter is pressed
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full mt-24">
      {success === "registered" ? (
        <h1 className="text-center my-3 font-semibold text-xl text-green-500">
          Хэрэглэгч амжилттай бүртгэгдлээ
        </h1>
      ) : null}
      <div
        onKeyPress={handleKeyPress}
        className="h-auto w-[350px] items-center flex flex-col"
      >
        <h1 className="text-mainColor font-semibold text-3xl">Нэвтрэх</h1>
        <span className="my-5 text-mainColor">
          Email хаяг болон нууц үгээ бичнэ үү
        </span>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Email"
          className={
            error
              ? "input border border-red-500 input-bordered mb-2 w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "input  input-bordered mb-2 w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
        />
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Нууц үг"
          className={
            error
              ? "input border border-red-500 input-bordered mb-2 w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
              : "input  input-bordered mb-2 w-full  placeholder:text-mainColor focus:border-warning focus:border-[2px]"
          }
        />
        <button
          onClick={Login}
          className="btn bg-warning text-mainColor w-full mt-5"
        >
          Нэвтрэх
        </button>

        {error === "User not found" ? (
          <p className="mt-2 text-center text-red-700 text-[14px]">
            Бүртгэл олдсонгүй
          </p>
        ) : error === "Email or password is incorrect" ? (
          <p className="mt-2 text-center text-red-700 text-[14px]">
            Имэйл эсвэл нууц үг буруу байна
          </p>
        ) : (
          error
        )}

        <p className="text-center text-xs mt-3 text-mainColor">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
        <div className="flex items-center gap-1 mt-5 text-sm">
          <span className="text-mainColor">Шинэ хэрэглэгч үү?</span>{" "}
          <Link className="text-warning" href="/register">
            Бүртгүүлэх
          </Link>
        </div>

        <div className="flex items-center gap-1 mt-2 text-sm " text-sm>
          <span className="text-mainColor">Нууц үгээ мартсан уу?</span>{" "}
          <Link className="text-warning" href="/register">
            Нууц үг сэргээх
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
