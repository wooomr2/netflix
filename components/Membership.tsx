import { useState } from "react";
import { goToBillingPortal } from "../libs/stripe";
import useSubscription from "../hooks/useSubscription";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

function Membership() {
  const { user } = useAuth();
  const subscription = useSubscription(user);
  const [isBillingLoading, setBillingLoading] = useState(false);

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true)
      goToBillingPortal()
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
    <div className="space-y-2 py-4">
      <h4 className="text-lg text-[gray]">Membership & Billing</h4>
      <button
        className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
        disabled={isBillingLoading || !subscription}
        onClick={manageSubscription}
      >
        {isBillingLoading ? (
          <Loader color="dark:fill-[#e50914]" />
        ) : (
          '구독 취소하기'
        )}
      </button>
    </div>

    <div className="col-span-3">
      <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
        <div>
          <p className="font-medium">{user?.email}</p>
          <p className="text-[gray]">Password: ********</p>
        </div>
        <div className="md:text-right">
          <p className="membershipLink">이메일 변경하기(미구현)</p>
          <p className="membershipLink">비밀번호 변경하기(미구현)</p>
        </div>
      </div>

      <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
        <div>
          <p>
            {subscription?.cancel_at_period_end
              ? '멤버십 종료일 '
              : '다음 결제일 '}
            {subscription?.current_period_end}
          </p>
        </div>
        <div className="md:text-right">
          <p className="membershipLink">결제 정보(미구현)</p>
          <p className="membershipLink">결제 방법 저장(미구현)</p>
          <p className="membershipLink">결제 청구서(미구현)</p>
          <p className="membershipLink">결제일 변경(미구현)</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Membership;
