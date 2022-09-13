import { CheckCircleIcon } from "@heroicons/react/outline";
import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-indigo-500 text-indigo-500"
                : "border-gray-400 text-gray-400"
            }`}
            key={step}
          >
            <div className="flex justify-center">
              {step}{" "}
              {index < activeStep && (
                <CheckCircleIcon className="h-7 w-7 px-1" />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
