import React, { useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";

interface IGenricModal {
  children: React.ReactNode;
  modalText: string;
}

export const GenericModal = ({ children, modalText }: IGenricModal) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal((prev) => !prev)}>{modalText}</button>
      {showModal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black/90"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray text-left shadow-xl transition-all">

                <IoMdReturnLeft className="absolute right-0 cursor-pointer m-2 text-lg"
                  onClick={() => setShowModal((prev) => !prev)} />

                <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="relative sm:flex sm:items-start">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
