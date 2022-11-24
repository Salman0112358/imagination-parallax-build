import React, { useState } from "react";
import { IPrompt, IUserProfile } from "../../typescript";
import PromptKeywordCounter from "../PromptKeywordCounter/PromptKeywordCounter";
import styles from "./AccordionCard.module.css";

const AccordionCard = ({
  data,
  userList,
}: {
  data: IPrompt[];
  userList: IUserProfile[];
}) => {
  let [activeCard, setActiveCard] = useState<string | null>();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.id, e.currentTarget.className);

    if (e.currentTarget.id === activeCard) {
      e.currentTarget.classList.remove(styles.active);
      setActiveCard(null);
    } else {
      document
        .getElementById(activeCard as string)
        ?.classList.remove(styles.active);
      e.currentTarget.classList.add(styles.active);
      setActiveCard(e.currentTarget.id);
    }
  };
  return (
    <>
      <div
        className={`antialiased bg-gradient-to-b from-black to-gray-900 flex font-sans justify-center px-12 py-4`}
      >
        <div
          className={`flex h-72 items-stretch  min-w-md overflow-hidden w-full`}
        >
          {data.slice(0, 10).map((image: IPrompt) => (
            <div
              id={String(image.id)}
              key={image.id}
              onClick={(e) => handleClick(e)}
              style={{ backgroundImage: `url('${image.render_image}')` }}
              className={` bg-center bg-cover bg-red-500 bg-no-repeat ${styles.card} cursor-pointer flex-grow m-2 min-w-14 overflow-hidden relative rounded-3xl ${styles.transitionBase}`}
            >
              <div
                className={`absolute bg-gradient-to-b bottom-0 from-transparent h-1/2 inset-x-0 opacity-0 ${styles.shadow} to-black transform ${styles.transitionBase} translate-y-1/2 z-10`}
              ></div>
              <div
                className={`absolute bottom-0 flex ${styles.label} left-0 mb-3 ml-2 ${styles.transitionBase} z-20`}
              >
                <div
                  className={`${styles.content} flex flex-col justify-center leading-tight text-white whitespace-pre`}
                >
                  <div
                    className={`font-bold opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                  >
                    {image.username}
                  </div>
                  <div
                    className={`delay-100 opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                  >
                    ❤️ {image.kudos}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`antialiased bg-gradient-to-b from-black to-gray-900 flex font-sans justify-center px-12 py-4`}
      >
        <div
          className={`flex relative h-72 items-stretch min-w-md overflow-hidden w-full`}
        >
          <div
            onClick={(e) => handleClick(e)}
            style={{
              backgroundImage: `url('https://i.imgur.com/d2v81Wv.jpeg')`,
            }}
            className={` bg-center bg-cover bg-red-500 bg-no-repeat ${styles.card} cursor-pointer h-full z-20 flex-grow m-2 min-w-14 overflow-hidden relative rounded-3xl ${styles.transitionBase}`}
          >
            <div
              className={`absolute bg-gradient-to-b bottom-0 from-transparent h-full  inset-x-0 opacity-0 ${styles.shadow} to-black transform ${styles.transitionBase} translate-y-1/2 z-10`}
            >
              <div className="w-[85%] grid grid-rows-3 grid-flow-col gap-4 p-1  h-[90%] ">
                {userList.map((user: IUserProfile) => (
                  <div key={user.id} className=" flex items-center justify-center rounded-3xl bg-rose-900/90">
                    {user.username}
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`absolute bottom-0 flex ${styles.label} right-0 mb-3 mr-6 ${styles.transitionBase} z-20`}
            >
              <div
                className={`${styles.content} flex flex-row justify-center leading-tight text-white whitespace-pre gap-1`}
              >
                <div
                  className={`font-bold text-xl opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                >
                  Members :{" "}
                </div>
                <div
                  className={`delay-100 text-xl opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                >
                  {userList.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`antialiased bg-gradient-to-b from-black to-gray-900 flex font-sans justify-center px-12 py-4`}
      >
        <div
          className={`flex relative h-72 items-stretch min-w-md overflow-hidden w-full`}
        >
          <div
            onClick={(e) => handleClick(e)}
            style={{
              backgroundImage: `url('https://wallpaperaccess.com/full/2272805.png')`,
            }}
            className={` bg-center bg-cover bg-red-500 bg-no-repeat ${styles.card} cursor-pointer h-full z-20 flex-grow m-2 min-w-14 overflow-hidden relative rounded-3xl ${styles.transitionBase}`}
          >
            <div
              className={`absolute bg-gradient-to-b bottom-0 from-transparent h-full  inset-x-0 opacity-0 ${styles.shadow} to-black transform ${styles.transitionBase} translate-y-1/2 z-10`}
            >
              <div className="w-[85%] grid grid-rows-3 grid-flow-col gap-4 p-1  h-[90%] ">
                <PromptKeywordCounter data={data} />
              </div>
            </div>
            <div
              className={`absolute bottom-0 flex ${styles.label} right-0 mb-3 mr-6 ${styles.transitionBase} z-20`}
            >
              <div
                className={`${styles.content} flex flex-row justify-center leading-tight text-white whitespace-pre gap-1`}
              >
                <div
                  className={`font-bold text-xl opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                >
                  Most Common Words :{" "}
                </div>
                <div
                  className={`delay-100 text-xl opacity-0 relative transform ${styles.transitionBase} translate-x-8`}
                >
                  {userList.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionCard;
