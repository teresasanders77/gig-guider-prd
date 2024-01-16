import { Dialog, Transition } from "@headlessui/react";
import { useFetcher } from "@remix-run/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

import { Errors, FetcherData } from "~/globalTypes";

interface ShouldITakeThisProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ShouldITakeThisForm = ({
  showModal,
  setShowModal,
}: ShouldITakeThisProps) => {
  const fetcher = useFetcher<FetcherData>();
  const [errors, setErrors] = useState<Errors>({});

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  useEffect(() => {
    setErrors(fetcher?.data?.errors ?? {});
  }, [fetcher?.data?.errors]);

  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto" // Updated z-index value
        onClose={closeModal}
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-40" />{" "}
          {/* Updated z-index value */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg  w-full sm:w-3/4 sm:max-w-2xl p-16 z-50">
              <Dialog.Title
                id="modal-title"
                className="text-xl font-bold mb-8 text-center"
              >
                Should I Take This Gig?
              </Dialog.Title>
              <fetcher.Form
                action="?index"
                method="post"
                encType="multipart/form-data"
                className="max-w-md mx-auto"
                id="form"
              >
                {/* Ideal Hourly Rate  */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="idealHourlyRate"
                    name="idealHourlyRate"
                    type="number"
                    placeholder=""
                    aria-labelledby="idealHourlyRateLabel"
                    step="any"
                    aria-invalid={errors?.idealHourlyRate ? "true" : "false"}
                    aria-describedby={
                      errors?.idealHourlyRate
                        ? "idealHourlyRateError"
                        : undefined
                    }
                  />
                  <label
                    id="idealHourlyRateLabel"
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="idealHourlyRate"
                  >
                    Ideal Hourly Rate (after expenses)
                  </label>
                  {errors?.idealHourlyRate ? (
                    <div
                      id="idealHourlyRateError"
                      className="mb-4 pt-1 text-red-700 error-message"
                      role="alert"
                    >
                      *{errors.idealHourlyRate}
                    </div>
                  ) : null}
                </div>
                {/* Gig Payment */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="gigPayment"
                    name="gigPayment"
                    type="number"
                    placeholder=""
                    aria-labelledby="gigPayment"
                    step="any"
                    aria-invalid={errors?.gigPayment ? "true" : "false"}
                    aria-describedby={
                      errors?.gigPayment ? "gigPaymentError" : undefined
                    }
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="gigPayment"
                  >
                    Gig Payment
                  </label>
                  {errors?.gigPayment ? (
                    <div
                      className="mb-4 pt-1 text-red-700 error-message"
                      role="alert"
                      id="gigPaymentError"
                    >
                      *{errors.gigPayment}
                    </div>
                  ) : null}
                </div>
                {/* Gig Hours */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="gigHours"
                    name="gigHours"
                    type="number"
                    placeholder=""
                    aria-labelledby="gigHours"
                    step="any"
                    aria-invalid={errors?.gigHours ? "true" : "false"}
                    aria-describedby={
                      errors?.gigHours ? "gigHoursError" : undefined
                    }
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="gigHours"
                  >
                    Gig Hours (not including driving)
                  </label>
                  {errors?.gigHours ? (
                    <div
                      className="mb-4 pt-1 text-red-700 error-message"
                      role="alert"
                      id="gigHoursError"
                    >
                      *{errors.gigHours}
                    </div>
                  ) : null}
                </div>
                {/* Mileage  */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="mileage"
                    name="mileage"
                    type="number"
                    placeholder=""
                    aria-labelledby="mileage"
                    step="any"
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="mileage"
                  >
                    Mileage (One way)
                  </label>
                </div>
                {/* Babysitting Hours */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="babysittingHours"
                    name="babysittingHours"
                    type="number"
                    placeholder=""
                    aria-labelledby="babysittingHours"
                    step="any"
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="babysittingHours"
                  >
                    Babysitting Hours
                  </label>
                </div>
                {/* Babysitting Hourly Rate */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gg-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    id="babysittingHourlyRate"
                    name="babysittingHourlyRate"
                    type="number"
                    placeholder=""
                    aria-labelledby="babysittingHourlyRate"
                    step="any"
                  />
                  <label
                    className="peer-focus:font-medium absolute text-sm text-gg-blue-900 dark:text-gg-blue-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gg-blue-600 peer-focus:dark:text-gg-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="babysittingHourlyRate"
                  >
                    Babysitting Hourly Rate
                  </label>
                </div>
                <div className="flex items-center justify-start mt-10">
                  <button
                    className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0 mr-4"
                    type="submit"
                    name="_action"
                    value="shouldITakeThis"
                    aria-label="Submit to find out if you should take this gig"
                  >
                    Let&apos;s find out...
                  </button>
                  <button
                    className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                    onClick={closeModal}
                    type="button"
                    aria-label="Close the modal and cancel the action"
                  >
                    Cancel
                  </button>
                </div>
              </fetcher.Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShouldITakeThisForm;
