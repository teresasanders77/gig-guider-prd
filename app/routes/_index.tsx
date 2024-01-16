import { json, type MetaFunction, ActionFunction } from "@remix-run/node";
import { useFetchers } from "@remix-run/react";
import { useEffect, useState } from "react";

import answerImage from "../../public/img/GG_answer.webp";
import desktopImage from "../../public/img/GG_landingPage.webp";
import mobileImage from "../../public/img/GG_mobile.webp";
import Answer from "../components/answer";
import Charge from "../components/charge";
import { DataType } from "../globalTypes";
import Details from "../modals/details";
import ShouldITakeThisForm from "../modals/shouldITakeThisForm";
import WhatToChargeForm from "../modals/whatToChargeForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);
  const errors: Record<string, string> = {};
  const data: DataType = {};
  const idealHourlyRate = formData.get("idealHourlyRate");
  const gigPayment = formData.get("gigPayment");
  const gigHours = formData.get("gigHours");
  const mileage = formData.get("mileage") ?? 0;
  const babysittingHours = formData.get("babysittingHours") ?? 0;
  const babysittingHourlyRate = formData.get("babysittingHourlyRate") ?? 0;
  data.idealHourlyRate = Number(idealHourlyRate);
  data.gigPayment = Number(gigPayment);
  data.gigHours = Number(gigHours);
  data.mileage = Number(mileage);
  data.babysittingHours = Number(babysittingHours);
  data.babysittingHourlyRate = Number(babysittingHourlyRate);

  const gasCost = Number(Number(mileage) * 2) * 0.67;
  data.gasCost = gasCost;

  const babysittingCost =
    Number(babysittingHours) * Number(babysittingHourlyRate);
  data.babysittingCost = babysittingCost;

  const totalCost = gasCost + babysittingCost;
  data.totalCost = totalCost;

  const hopefulIncomePreExpense = Number(idealHourlyRate) * Number(gigHours);
  data.hopefulIncomePreExpense = hopefulIncomePreExpense;

  const hopefulIncomeTotal = hopefulIncomePreExpense + totalCost;
  data.hopefulIncomeTotal = hopefulIncomeTotal;

  if (!idealHourlyRate) {
    errors.idealHourlyRate = "Required";
  } else if (Number(idealHourlyRate) < 1) {
    errors.idealHourlyRate = "Must be greater than 0";
  }

  if (!gigHours) {
    errors.gigHours = "Required";
  } else if (Number(gigHours) < 1) {
    errors.gigHours = "Must be greater than 0";
  }

  if (_action === "shouldITakeThis") {
    data.type = "shouldITakeThis";

    if (!gigPayment) {
      errors.gigPayment = "Required";
    } else if (Number(gigPayment) < 1) {
      errors.gigPayment = "Must be greater than 0";
    }
    console.log("errors: ", errors);
    if (Object.keys(errors).length > 0) {
      return json({ errors });
    }

    const difference = Number(gigPayment) - hopefulIncomeTotal;
    data.difference = difference;

    let answer;
    if (difference > 0) {
      answer = "yes";
    } else {
      answer = "no";
    }
    return json({ answer: answer, data: data });
  } else if (_action === "whatToCharge") {
    data.type = "whatToCharge";
    if (Object.keys(errors).length > 0) {
      return json({ errors });
    }
    return json({ data });
  }
};

export default function Index() {
  const [showButtons, toggleShowButtons] = useState(true);
  const [screenWidth, setScreenWidth] = useState(761);
  const [shouldITakeThisModal, setShouldITakeThisModal] = useState(false);
  const [whatToChargeModal, setWhatToChargeModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [showAnswer, toggleShowAnswer] = useState(false);
  const [showCharge, toggleShowCharge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType>({
    type: null,
    idealHourlyRate: null,
    gigPayment: null,
    gigHours: null,
    gasCost: null,
    mileage: null,
    babysittingCost: null,
    babysittingHours: null,
    babysittingHourlyRate: null,
    totalCost: null,
    hopefulIncomePreExpense: null,
    hopefulIncomeTotal: null,
    difference: null,
  });
  const fetchers = useFetchers();

  const [img, setImg] = useState(desktopImage);
  const isClient = typeof window === "object";

  useEffect(() => {
    if (!isClient) {
      return; // Do nothing if not running on the client side
    }
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    if (
      screenWidth > 760 &&
      img !== desktopImage &&
      !showAnswer &&
      !showCharge
    ) {
      setImg(desktopImage);
    } else if (
      screenWidth <= 760 &&
      img !== mobileImage &&
      !showAnswer &&
      !showCharge
    ) {
      setImg(mobileImage);
    } else if (showAnswer) {
      setImg(answerImage);
    }
  }, [img, screenWidth, showAnswer, showCharge]);

  useEffect(() => {
    if (data.idealHourlyRate !== null) {
      setShouldITakeThisModal(false);
      setWhatToChargeModal(false);
      setLoading(true);
      toggleShowButtons(false);
      setTimeout(() => {
        setLoading(false);
        if (data.type == "shouldITakeThis") {
          toggleShowAnswer(true);
        } else {
          toggleShowCharge(true);
        }
      }, 3000);
    }
  }, [data]);

  useEffect(() => {
    if (fetchers[0]?.state == "submitting") {
      console.log(fetchers[0]?.state);
      setImg(answerImage);
    }
    if (fetchers[0]?.data?.data) {
      setData(fetchers[0]?.data?.data);
    }
  }, [fetchers]);

  useEffect(() => {
    shouldITakeThisModal || whatToChargeModal || loading
      ? setImg(answerImage)
      : setImg(desktopImage);
  }, [shouldITakeThisModal, whatToChargeModal, loading]);

  return (
    <>
      <div>
        <h1 className="sr-only">The Gig Guider</h1>
        <div
          className="bg-cover bg-center bg-no-repeat overflow-hidden h-screen relative"
          style={{ backgroundImage: `url(${img})` }}
          aria-label="Gig Guider main image, hands on a crystal ball."
        >
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div
                className="rounded-full h-80 w-80 bg-gg-blue-900 animate-ping"
                role="status"
                aria-label="Loading answer..."
              ></div>
            </div>
          ) : null}
          <main className="my-0 mx-auto ">
            {showButtons ? (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <button
                  onClick={() => {
                    setShouldITakeThisModal(true);
                  }}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                  aria-label="Open Should I take this modal"
                >
                  Should I take this?
                </button>
                <button
                  onClick={() => {
                    setWhatToChargeModal(true);
                  }}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                  aria-label="Open How much should I charge modal"
                >
                  How much should I charge?
                </button>
              </div>
            ) : null}
            {showAnswer ? (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <Answer data={data} setShowModal={setDetailsModal} />
              </div>
            ) : null}
            {showCharge ? (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <Charge data={data} setShowModal={setDetailsModal} />
              </div>
            ) : null}
          </main>
        </div>
        <ShouldITakeThisForm
          showModal={shouldITakeThisModal}
          setShowModal={setShouldITakeThisModal}
        />
        <WhatToChargeForm
          showModal={whatToChargeModal}
          setShowModal={setWhatToChargeModal}
        />
        <Details
          showModal={detailsModal}
          setShowModal={setDetailsModal}
          data={data}
          type={showAnswer ? "answer" : "charge"}
        />
      </div>
    </>
  );
}
