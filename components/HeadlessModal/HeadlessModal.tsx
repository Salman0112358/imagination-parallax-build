import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { singleImage } from "../../typescript";
import { toast} from 'react-toastify';

import Image from "next/image";
import handleCopy from "../../utils/handleCopy";

export default function HeadlessModal({ image }: singleImage) {
  let [isOpen, setIsOpen] = useState(false);



  const notify = () => toast("Prompt Copied To Clipboard");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" w-full h-full hidden group-hover:block">
        <button
          type="button"
          onClick={openModal}
          className=" relative left-0 top-0  rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Show More
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` ${
                    image.width > image.height ? "w-[90vh]" : "w-[50vh]"
                  } transform overflow-hidden rounded-2xl bg-black text-slate-100 p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div className="flex flex-col">
                    <img className="rounded-md" src={image.src} alt="AI Art" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">{image.prompt}</p>
                    <div className=" mt-3 flex-col text-sm font-light">
                      <p>Guidance Scale : {image.guidance}</p>
                      <p>Image Seed : {image.seed}</p>
                      <p>
                        Dimensions : {image.width} X {image.height}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-violet-900 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleCopy(image.prompt);
                        notify()
                      }}
                    >
                      Copy Prompt
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
