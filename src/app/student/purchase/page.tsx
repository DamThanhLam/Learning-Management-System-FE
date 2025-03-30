import React from "react";
import SuccessfulPurchase from "../../../components/student/purchase/successfulPurchase";
import UnsuccessfulPurchase from "../../../components/student/purchase/unsuccessfulPurchase";


const PurchasePage = () => {
  const isSuccess = true; // This should be determined by your application logic

  return (
    <div>
      {isSuccess ? <SuccessfulPurchase /> : <UnsuccessfulPurchase />}
    </div>
  );
};

export default PurchasePage;