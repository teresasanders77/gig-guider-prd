import { Dispatch, SetStateAction } from "react";

import { DataType } from "../globalTypes";

interface AnswerProps {
  data: DataType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Answer = ({ data, setShowModal }: AnswerProps) => {
  const difference = Number(data.gigPayment) - Number(data.hopefulIncomeTotal);

  let answer;
  if (difference > 0) {
    answer = "yes";
  } else {
    answer = "no";
  }

  const yesResponses = [
    "Finally, someone pays you what you're worth!",
    "Go give these people a hug, they respect you!",
    "Cha-ching! Your bank account is about to do the happy dance!",
    "Oh, honey, the only thing better than your talent is that paycheck!",
    "Without a doubt! The only thing hotter than the stage lights will be your bank balance.",
    "Hell yes! Your talent is like a fine wine — it only gets better with a generous paycheck.",
    "Yes, and the applause will be music to your ears, but the paycheck will be a symphony!",
  ];
  const noResponses = [
    "Wanna pay your insurance this month? Better not take this gig...",
    "People don't value musicians, do they...",
    "If you want to do charity, then go for it!",
    "Oh, sweetie, even Cinderella had a better deal. You should pass.",
    "You don't work for peanuts; You prefer cashews at the very least.",
    "Hard pass! Your talent deserves a stage that pays its electricity bill.",
    "Sorry, but exposure doesn't pay the bills, darling.",
    "Not in a million years! I'd need a magnifying glass to see that paycheck.",
    "Absolutely not! You've got a reputation to uphold, and it's not in the discount aisle.",
    "Hell no! Even my shadow demands a higher rate than that.",
  ];
  // Get a random index
  const randomIndex =
    answer == "yes"
      ? Math.floor(Math.random() * yesResponses.length)
      : Math.floor(Math.random() * noResponses.length);
  const returnedResponse =
    answer == "yes" ? yesResponses[randomIndex] : noResponses[randomIndex];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen"
        role="main"
      >
        {answer === "yes" ? (
          <>
            <h1
              className="text-green-700 font-bold text-8xl"
              aria-label="Yes, you should!"
              id="result"
            >
              YES!
            </h1>
            <h2
              className="text-center mt-10 mb-10 font-bold text-2xl"
              aria-label="Sassy reason for why you should"
            >
              {returnedResponse}
            </h2>
          </>
        ) : null}
        {answer === "no" ? (
          <>
            <h1
              className="text-red-700 font-bold text-8xl"
              aria-label="No, you shouldn't."
              id="result"
            >
              Nope...
            </h1>
            <h2
              className="text-center mt-10 mb-10 font-bold text-2xl"
              aria-label="Sassy reason for why you shouldn't "
            >
              {returnedResponse}
            </h2>
          </>
        ) : null}
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl lg:mt-0"
          aria-label="Click to see more details"
        >
          See Details
        </button>
      </div>
    </>
  );
};

export default Answer;
