//

// components/PaymentCard.js
import { useState } from "react";
import MoneyTransactionDialog from "./MoneyTransactionDialog";

const PaymentCard = ({
  logoSrc,
  system,
  limit,
  processingTime,
  fee,
  onClick,
  cstyle,
  address,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log("done");
    setIsDialogOpen(false);
  };

  const handleConfirmTransaction = (transactionData) => {
    // Handle the confirmed transaction data (e.g., send to the server)
    console.log("Confirmed Transaction:", transactionData);
  };

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className={`max-w-md mx-auto mt-8 p-4 bg-white rounded-md ${cstyle}`}
        style={{ boxShadow: "0 0 10px 1px #dddddd99" }}
      >
        <div className="flex row gap-3 border-b">
          <img src={logoSrc} alt={`${system} Logo`} className=" mb-4 h-8" />
          <h2 className="text-xl font-semibold ">{system}</h2>
        </div>
        <p>
          <span className="font-bold">Limit:</span> {limit}
        </p>
        <p>
          <span className="font-bold">Processing Time:</span> {processingTime}
        </p>
        <p>
          <span className="font-bold">Fee:</span> {fee}
        </p>
      </div>
      <MoneyTransactionDialog
        head={system}
        address={address}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmTransaction}
      />
    </>
  );
};

export default PaymentCard;
