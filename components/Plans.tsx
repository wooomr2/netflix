import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { loadCheckout } from "../libs/stripe";
import Loader from "./Loader";
import Table from "./Table";

interface Props {
  products: Product[];
}

function Plans({ products }: Props) {
  const { signout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id!);
    setBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-white/10 bg-netflixgray-900">
        {/* Logo */}
        <Link href="/">
          <Image
            className=""
            src="/logo.svg"
            alt="Netflix"
            layout="fixed"
            objectFit="contain"
            width="130"
            height="50"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={signout}
        >
          로그아웃
        </button>
      </header>

      <main className="max-w-5xl pt-28 pb-12 px-5 md:px-10 transition-all ">
        <h1 className="mb-3 text-3xl font-medium">
          원하시는 멤버십을 선택하세요.
        </h1>

        <ul>
          <li className="li">
            <CheckIcon className="checkIcon" /> 광고없이 시청
          </li>
          <li className="li">
            <CheckIcon className="checkIcon" /> 맞춤 동영상
          </li>
          <li className="li">
            <CheckIcon className="checkIcon" /> 멤버십은 언제든지 변경하실 수
            있습니다.
          </li>
        </ul>

        <div className="flex flex-col space-y-4 mt-4 ">
          <div className="flex items-center justify-end self-end w-full md:w-3/5">
            {products.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            disabled={!selectedPlan || isBillingLoading}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "구독하기"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
