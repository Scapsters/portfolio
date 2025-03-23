import React, { useEffect, useState } from 'react'
import { Project, projects } from '../typescript/project_card_info'
import { circular_rotate, clamp, map_range } from '../typescript/math_helpers'
import { headers, raw_items } from '@/typescript/wheel_info'

const numItems = raw_items.length
const itemHeight = 100 // Total guess but it works
const maxScroll = numItems * itemHeight
const scrollFactor = 0.6 // arbitrary

/**
 * Hooks each element of the wheel to a scroll event, which changes css properties to emulate a wheel.
 */
export default function Wheel({ setProject }: Readonly<{ setProject: (project: Project) => void }>) {
    // Range from [-1, 1]
    const [scroll, setScroll] = useState(0)
    const [rawScroll, setRawScroll] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // To allow for style manipulation for circular transform and rotate
    const itemRefs = raw_items.map(() => React.createRef<HTMLDivElement>())
    useEffect(() => {
        for (let i = 0; i < raw_items.length; i++) {
            const item = itemRefs[i].current
            if (!item) continue
            item.style.transform = `rotate(
			 	${-circular_rotate(i, scroll)}deg
			)`
        }
    }, [itemRefs, scroll])

    // To allow for tracking of the parent div
    const parentRef = React.createRef<HTMLDivElement>()

    // Track mousewheel events. Scale down delta y, Clamp to maxScroll and map to [-1, 1]
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            setRawScroll(clamp(rawScroll + e.deltaY * scrollFactor, -maxScroll, maxScroll)) // Set raw scroll and only change the factor and clamp
            setScroll(
                // Do the clamping and mapping here. Neccesarily based off of raw scroll
                map_range(rawScroll, -maxScroll, maxScroll, -1, 1),
            )
        }

        // Mount/unmount event listener
        const element = parentRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => {
            element?.removeEventListener('wheel', wheelHandler)
        }
    })

    // Track hovering over the wheel
    useEffect(() => {
        const element = parentRef.current
        const mouseEnterHandler = () => setIsHovered(true)
        const mouseLeaveHandler = () => setIsHovered(false)

        element?.addEventListener('mouseenter', mouseEnterHandler)
        element?.addEventListener('mouseleave', mouseLeaveHandler)
        return () => {
            element?.removeEventListener('mouseenter', mouseEnterHandler)
            element?.removeEventListener('mouseleave', mouseLeaveHandler)
        }
    })

    /**
     * MAGIC NUMBER ALTERT.... size and position are important.
     * is to ensure that all list items are the same width to ensure consistent circular transformations
     */
    const items = raw_items.map((item, index) => (
        <div ref={itemRefs[index]} key={item + index} className={`flex w-1000 h-10 text-6xl absolute top-1/2`}>
            {headers.includes(item) ? (
                // If item is a header, render with different styling
                <p key={`wheel ${item} ${index}`} className="w-150 font-light text-right text-[#646464]">
                    {item}
                </p>
            ) : (
                // Else, render with different styling and as a button
                <button
                    key={`wheel ${item} ${index}`}
                    className="w-150 text-right text-[#393939]"
                    onClick={() => setProject(projects[item])}
                >
                    {item}
                </button>
            )}
        </div>
    ))

    return (
        <>
            <div
                style={{
                    width: '2800px',
                    height: '2800px',
                    borderRadius: '50%',
                    backgroundColor: '#474749',
                }}
                className="absolute -right-630 -top-180"
            ></div>
            <div ref={parentRef} className="w-1/2 h-1/1 absolute -right-50 flex flex-col">
                {items}
            </div>
        </>
    )
}
