import { Dispatch, SetStateAction } from "react";
import { DataType } from "../globalTypes";

type ChargeProps = {
  data: DataType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Charge = ({ data, setShowModal }: ChargeProps) => {
  const total = data.hopefulIncomeTotal ?? 0;
  return (
    <>
      <section
        className="flex flex-col items-center justify-center h-screen"
        role="main"
      >
        <h1
          className="font-bold text-4xl text-center"
          aria-label="Recommendation Header"
        >
          We recommend you charge:
        </h1>
        <h2
          className="text-center mt-10 mb-10 font-bold text-6xl text-green-700"
          aria-label={`Recommended total amount is $${total}`}
          id="result"
        >
          ${Number(total)}
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl lg:mt-0"
          aria-label="Click to see more details"
        >
          See Details
        </button>
      </section>
    </>
  );
};

export default Charge;
