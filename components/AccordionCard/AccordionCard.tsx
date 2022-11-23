import { url } from 'inspector'
import React, { useEffect, useState } from 'react'
import { IPrompt } from '../../typescript'
import styles from './AccordionCard.module.css'

const AccordionCard = ({ data }: { data: IPrompt[] }) => {

    let [activeCard, setActiveCard] = useState<string | null>()

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(e.currentTarget.id, e.currentTarget.className)

        if (e.currentTarget.id === activeCard) {
            e.currentTarget.classList.remove(styles.active)
            setActiveCard(null)
        } else {
            document.getElementById(activeCard as string)?.classList.remove(styles.active)
            e.currentTarget.classList.add(styles.active)
            setActiveCard(e.currentTarget.id)
        }
    }
    return (
        <>
            <div className={`antialiased bg-gradient-to-b from-black to-gray-900 flex font-sans justify-center px-12`}>
                <div className={`flex h-72 items-stretch max-w-2xl min-w-md overflow-hidden w-full`}>
                    {data.slice(0,10).map((image: IPrompt) => (
                        <div
                            id={String(image.id)}
                            key={image.id}
                            onClick={(e) => handleClick(e)}
                            style={{ backgroundImage: `url('${image.render_image}')` }}
                            className={` bg-center bg-cover bg-red-500 bg-no-repeat ${styles.card} cursor-pointer flex-grow m-2 min-w-14 overflow-hidden relative rounded-3xl ${styles.transitionBase}`}>
                            <div className={`absolute bg-gradient-to-b bottom-0 from-transparent h-1/2 inset-x-0 opacity-0 ${styles.shadow} to-black transform ${styles.transitionBase} translate-y-1/2 z-10`}></div>
                            <div className={`absolute bottom-0 flex ${styles.label} left-0 mb-3 ml-2 ${styles.transitionBase} z-20`}>
                                <div className={`bg-gray-900 flex h-10 icon items-center justify-center mr-3 rounded-full text-red-500 w-10`}>
                                    <i className={`fas fa-walking`}></i>
                                </div>
                                <div className={`${styles.content} flex flex-col justify-center leading-tight text-white whitespace-pre`}>
                                    <div className={`font-bold opacity-0 relative transform ${styles.transitionBase} translate-x-8`}>Lights</div>
                                    <div className={`delay-100 opacity-0 relative transform ${styles.transitionBase} translate-x-8`}>Chase your dreams</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AccordionCard;