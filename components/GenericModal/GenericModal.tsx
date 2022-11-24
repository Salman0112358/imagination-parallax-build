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
            <div className="flex min-h-full items-end justify-center text-center sm:items-center ">
              <div className="relative transform overflow-hidden rounded-lg bg-gray text-left shadow-xl transition-all">
                <IoMdReturnLeft
                  className="absolute right-0 cursor-pointer m-4 z-50 text-lg"
                  onClick={() => setShowModal((prev) => !prev)}
                />
                <div className="bg-black/50 h-screen w-screen ">
                  <div className="flex justify-center relative">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
