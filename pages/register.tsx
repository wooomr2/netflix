import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
  password: string;
}

function Register() {
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signup(data.email, data.password);
  };

  return (
    <div
      className="relative h-screen w-screen bg-black flex flex-col 
    md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Img */}
      <Image
        className="-z-10 opacity-60 !hidden sm:!inline"
        src="/bg-login.jpg"
        alt=""
        layout="fill"
        objectFit="cover"
      />

      {/* Logo */}
      <div className="absolute cursor-pointer left-4 top-4 md:left-10 md:top-6">
        <Image
          src="/logo.svg"
          alt=""
          layout="fixed"
          objectFit="contain"
          width="150"
          height="50"
        />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative rounded bg-black/75 mt-24 space-y-8 py-10 px-6
        md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">회원가입</h1>
        <div className="space-y-4">
          {/* Email */}
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`input ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                정확한 이메일 주소나 전화번호를 입력하세요.
              </p>
            )}
          </label>
          {/* Password */}
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className={`input ${
                errors.password && "border-b-2 border-orange-500"
              }`}
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              비밀번호는 4~60자 사이여야 합니다.
            </p>
          )}
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign up
        </button>

        <div className="text-[gray]">
        Already Registered?{" "}
          <button
            className="text-white hover:underline"
            onClick={() =>router.push("/login")}
          >
            로그인하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
