import React, { useEffect, useState } from "react"
import { Project, projects } from "../typescript/project_card_info"
import { circular_rotate, circular_transform_x, circular_transform_y, clamp, map_range } from "../typescript/math_helpers"
import { headers, raw_items } from "@/typescript/wheel_info"

const numItems = raw_items.length
const itemHeight = 50 // Total guess but it works
const maxScroll = numItems * itemHeight
const scrollFactor = 0.3 // arbitrary
const xOffset = 1200

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
            item.style.transform = `translate(
				${circular_transform_x(i, scroll) + xOffset}px, 
				${circular_transform_y(i, scroll)}px
			) rotate(
			 	${circular_rotate(i, scroll)}deg
			)`
        }
    }, [itemRefs, scroll])

    // To allow for tracking of the parent div
    const parentRef = React.createRef<HTMLDivElement>()

    // Track mousewheel events. Scale down delta y, Clamp to maxScroll and map to [-1, 1]
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            setRawScroll(rawScroll + e.deltaY * scrollFactor) // Set raw scroll and only change the factor
            setScroll(
                // Do the clamping and mapping here. Neccesarily based off of raw scroll
                map_range(
                    clamp(rawScroll + e.deltaY * scrollFactor, -maxScroll, maxScroll),
                    -maxScroll,
                    maxScroll,
                    -1,
                    1,
                ),
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
     * MAGIC NUMBER ALTERT.... tailwind w-100
     * is to ensure that all list items are the same width to ensure consistent circular transformations
     */
    const items = raw_items.map((item, index) => (
        <div ref={itemRefs[index]} key={item} className={`w-100 absolute text-right top-1/2 right-0 bg-orange-600/10`}>
            {headers.includes(item) ? (
                // If item is a header, render with different styling
                <p key={`wheel ${item}`} className="text-red">
                    {item}
                </p>
            ) : (
                // Else, render with different styling and as a button
                <button key={`wheel ${item}`} className="text-blue" onClick={() => setProject(projects[item])}>
                    {item}
                </button>
            )}
        </div>
    ))

    return (
        <div ref={parentRef} className="w-1/2 h-1/1 absolute right-0 flex bg-red-500/10 flex-col">
            {items}
        </div>
    )
}