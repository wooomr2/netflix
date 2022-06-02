import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Membership from "../components/Membership";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import payments, { goToBillingPortal } from "../libs/stripe";

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  const { signout, user } = useAuth();
  const subscription = useSubscription(user);

  return (
    <div>
      <Head>
        <title>Netflix - Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="/logo.svg"
            alt=""
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img src="/avatar.png" alt="" className="cursor-pointer rounded" />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl pt-24 pb-12 px-5 transition-all">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="/membersince.svg" alt="" className="h-7 w-7" />
            <p className="text-sm font-semibold text-[#555]">
              가입일 : {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div
          className="grid grid-cols-1 mt-6 gap-x-4 px-4 py-4 border 
        md:grid-cols-4 md:border-t md:border-b-0 md:border-x-0 md:px-0 md:pb-0"
        >
          <h4>Plans</h4>
          <div>
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p
            className="membershipLink md:text-right"
            onClick={goToBillingPortal}
          >
            요금제 변경하기
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 membershipLink"
            onClick={signout}
          >
            모든 기기에서 로그아웃 하기
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
