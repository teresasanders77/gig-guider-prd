import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";

import { DataType } from "../globalTypes";

interface DetailsProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  data: DataType;
  type: string;
}

const Details = ({ showModal, setShowModal, data, type }: DetailsProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Scroll to the top when the modal is shown
    if (showModal) {
      // Scroll to the element
      if (titleRef.current) {
        titleRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [showModal]);

  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto" // Updated z-index value
        onClose={closeModal}
        aria-labelledby="modal-title"
      >
        <div
          className="flex items-center justify-center min-h-screen"
          role="dialog"
          aria-modal="true"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="bg-white rounded-lg w-full sm:w-3/4 sm:max-w-3xl p-16 z-50"
              aria-labelledby="details"
            >
              <Dialog.Title
                id="modal-title"
                className="text-xl font-bold mb-8 text-center"
                ref={titleRef}
              >
                Should I Take This Gig?
              </Dialog.Title>
              <div className="h-fit text-center " id="details">
                <h2 className="mb-4 font-bold text-gg-blue-700">
                  Here is what you entered:
                </h2>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Ideal Hourly Rate:
                  <span className="font-bold">
                    {" "}
                    ${String(data.idealHourlyRate)}
                  </span>
                </p>
                {type == "answer" ? (
                  <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                    Gig Payment:
                    <span className="font-bold">
                      {" "}
                      ${String(data.gigPayment)}
                    </span>
                  </p>
                ) : null}
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Gig Hours:
                  <span className="font-bold">
                    {" "}
                    {String(data.gigHours)} Hours
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Mileage:
                  <span className="font-bold">
                    {" "}
                    {String(data.mileage)} Miles
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Babysitting Hours:
                  <span className="font-bold">
                    {" "}
                    {String(data.babysittingHours)} Hours
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Babysitting Hourly Rate:
                  <span className="font-bold">
                    {" "}
                    ${String(data.babysittingHourlyRate)}
                  </span>
                </p>

                <h2 className="mb-4 mt-10 font-bold text-gg-blue-700">
                  Here is how we calculated:
                </h2>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300 bg-white">
                        <thead aria-label="Gig Calculations Summary">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center"
                            >
                              $
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                              Calculation
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Gas Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Mileage * 2 * 0.67 (IRS Mileage Rate)
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${Number(Number(String(data.mileage)) * 2) * 0.67}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Babysitting Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Babysitting Hours * Babysitting Hourly Rate
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(String(data.babysittingHours)) *
                                Number(String(data.babysittingHourlyRate))}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Total Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Gas Cost + Babysitting Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(Number(String(data.mileage)) * 2) * 0.67 +
                                Number(String(data.babysittingHours)) *
                                  Number(String(data.babysittingHourlyRate))}
                            </td>
                          </tr>

                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Hopeful Income Pre Expense
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Ideal Hourly Rate * Gig Hours
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(String(data.idealHourlyRate)) *
                                Number(String(data.gigHours))}
                            </td>
                          </tr>

                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Hopeful Income Total
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Hopeful Income Pre Expense + Total Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(String(data.idealHourlyRate)) *
                                Number(String(data.gigHours)) +
                                (Number(Number(String(data.mileage)) * 2) *
                                  0.67 +
                                  Number(String(data.babysittingHours)) *
                                    Number(String(data.babysittingHourlyRate)))}
                            </td>
                          </tr>
                          {type == "answer" ? (
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                Difference
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                Gig Payment - Hopeful Income Total
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                $
                                {Number(String(data.gigPayment)) -
                                  (Number(String(data.idealHourlyRate)) *
                                    Number(String(data.gigHours)) +
                                    (Number(Number(String(data.mileage)) * 2) *
                                      0.67 +
                                      Number(data.babysittingHours) *
                                        Number(data.babysittingHourlyRate)))}
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <h2 className="my-10 font-bold text-black">
                  To make this gig worth it, we recommend you charge:{" "}
                  <span className="text-green-700">
                    $
                    {Number(data.idealHourlyRate) * Number(data.gigHours) +
                      (Number(Number(data.mileage) * 2) * 0.67 +
                        Number(data.babysittingHours) *
                          Number(data.babysittingHourlyRate))}
                  </span>
                </h2>
                <button
                  className=" bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl lg:mt-0 mr-4"
                  onClick={() => location.reload()}
                  aria-label="Go back to Home"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Details;
