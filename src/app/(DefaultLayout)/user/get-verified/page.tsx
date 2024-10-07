"use client";

import Loading from "@/src/components/UI/Loading";
import { useGetVerified } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";

export default async function GetVerified() {
  const { mutate: getVerification, isPending } = useGetVerified();
  const handleGetVerified = () => {
    const response = getVerification();
    console.log({response});
  };

  return (
    <div>
      {isPending && <Loading />}
      <div className="max-w-4xl mx-auto p-6 space-y-10 text-gray-800 dark:text-gray-200">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary">
            Get Verified on ProTech
          </h1>
          <p className="text-lg md:text-xl">
            Unlock exclusive benefits and stand out as a trusted user.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">
            Benefits of Being Verified
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>Enhanced profile visibility across the platform.</li>
            <li>Access to exclusive premium content and resources.</li>
            <li>Priority support from our team.</li>
            <li>Trusted badge displayed on your profile.</li>
            <li>Access to exclusive offers and promotions.</li>
          </ul>
        </div>

        {/* Pricing Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">
            Verification Pricing
          </h2>
          <p className="text-lg">
            Become verified for just{" "}
            <span className="font-bold text-primary">$20</span>! Verification is
            valid for <span className="font-semibold">30 days</span> from the
            date of payment.
          </p>
        </div>

        {/* Terms & Conditions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">
            Terms & Conditions
          </h2>
          <ul className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>Verification is valid for 30 days from the date of payment.</li>
            <li>
              Renewal of verification requires another payment after expiry.
            </li>
            <li>
              Verified users are subject to the same rules and guidelines as all
              users.
            </li>
            <li>Violation of terms may lead to loss of verification status.</li>
          </ul>
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <Button
            color="primary"
            size="lg"
            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
            onClick={handleGetVerified}
          >
            Get Verified Now
          </Button>
        </div>
      </div>
    </div>
  );
}
