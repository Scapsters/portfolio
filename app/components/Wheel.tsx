import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Project, projects } from '../typescript/project_card_info'
import { circular_rotate } from '../typescript/math_helpers'
import { headers, raw_items } from '@/typescript/wheel_info'

const wheelSize = 2800
const textWidth = 600
const itemWidth = wheelSize + textWidth * 2 // This gives textWidth to the left and right of the wheel
const scrollVelocityFactor = 0.0001
const centrifugalForceCoefficient = 1000

/**
 * Hooks each element of the wheel to a scroll event, which changes css properties to emulate a wheel.
 */
export default function Wheel({
    setProject,
    isProjectSelected,
}: Readonly<{ setProject: (project: Project) => void; isProjectSelected: boolean }>) {
    console.log('render')

    // Manages wheel hover state. Performance impact negligible
    const [isHovered, setIsHovered] = useState(false)

    // Manages wheel offset. Performance impact negligible
    const [xOffset, setxOffset] = useState(1000)

    // Wheel physics. Performance impact medium
    const [position, setPosition] = useState(0)
    const velocity = useRef(0)
    const acceleration = useRef(0)

    // To allow for style manipulation for circular transform and rotate. Performance impact negligible TODO: verify
    const itemRefs = useMemo(
        () => raw_items.map(() => React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>),
        [],
    )

    // To allow for tracking of the parent div
    const parentRef = useRef<HTMLDivElement>(null)

    const lastRenderTime = useRef(0)
    const [frame, setFrame] = useState(0)

    const [textRadiusOffset, setTextRadiusOffset] = useState(0)

    const circleRef = React.createRef<HTMLDivElement>()

    const items = useMemo(
        () =>
            raw_items.map((item, index) => (
                <div
                    ref={itemRefs[index]}
                    key={item + index}
                    style={{ right: -itemWidth / 2 + 40 }}
                    className={`w-[var(--item-width)] h-0 text-6xl transition duration-1000 ease-in-out absolute top-1/2`}
                >
                    <div
                        style={{
                            width: textWidth + textRadiusOffset,
                            transition: 'padding-right 0.2s ease-out',
                        }}
                        className="flex justify-end"
                    >
                        {headers.includes(item) ? (
                            // If item is a header, render with different styling
                            <p
                                key={`wheel ${item} ${index}`}
                                style={{ transition: 'padding-right 0.2s ease-out' }}
                                className="wheel-item font-light wheel-text text-right text-[var(--light-text)]"
                            >
                                {item}
                            </p>
                        ) : (
                            // Else, render with different styling and as a button
                            <button
                                key={`wheel ${item} ${index}`}
                                style={{ transition: 'padding-right 0.2s ease-out' }}
                                className="h-max text-right w-max left-0 relative text-[var(--dark-text)]"
                                onClick={() => setProject(projects[item])}
                            >
                                {item}
                            </button>
                        )}
                    </div>
                </div>
            )),
        [itemRefs, setProject, textRadiusOffset],
    )

    useEffect(() => {
        document.documentElement.style.setProperty('--wheel-item-offset', `${textWidth + textRadiusOffset}`)
    }, [textRadiusOffset])

    //Set initial position. Performance impact negligible
    useEffect(() => {
        setxOffset(700)
    }, [])

    // Change transitions after loading. Performance impact minimal
    useEffect(() => {
        if (frame > 60) {
            itemRefs.forEach((item) => {
                item.current?.style.setProperty('transition', 'none')
            })
            circleRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
            parentRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        }
    }, [itemRefs, circleRef, parentRef, frame])

    //Move wheel on project selection toggle. Performance effect negligible
    useEffect(() => {
        const handleProjectSelected = () => {
            setxOffset(500)
        }
        const handleProjectDeselected = () => {
            setxOffset(700)
        }
        if (isProjectSelected) {
            handleProjectSelected()
        } else {
            handleProjectDeselected()
        }
    }, [isProjectSelected])

    // Rotate items on position change. Performance impact medium
    useEffect(() => {
        for (let i = 0; i < raw_items.length; i++) {
            const item = itemRefs[i].current
            if (!item) continue
            item.style.transform = `rotate(
			 	${-circular_rotate(i, position)}deg
			)`
        }
    }, [itemRefs, position])

    // Track mousewheel events and add velocity. Changes are reflected in the frame loop. Performance impact negligible
    useEffect(() => {
        console.log('hoveringers my name, and hoveringings the game')
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            velocity.current += e.deltaY * scrollVelocityFactor
        }

        // Mount/unmount event listener
        const element = parentRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => {
            element?.removeEventListener('wheel', wheelHandler)
        }
    }, [parentRef, isHovered])

    // Track hovering over the wheel. Performance impact negligible
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
    }, [parentRef])

    // Re-render every frame (for physics) and limit to 60 FPS. Performance impact high
    useEffect(() => {
        const updateFrame = (timestamp: number) => {
            if (timestamp - lastRenderTime.current >= 16.67) {
                // ~60 FPS limit
                lastRenderTime.current = timestamp
                setFrame((prev) => prev + 1)
            }
            requestAnimationFrame(updateFrame)
        }

        const animationId = requestAnimationFrame(updateFrame)
        return () => cancelAnimationFrame(animationId)
    }, [])

    // Hover effect for buttons on wheel. Performance impact negligible
    useEffect(() => {
        const handleItemHover = (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement
            ;(target as HTMLElement).style.setProperty('padding-right', '50px')
        }
        const handleItemUnhover = (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement
            ;(target as HTMLElement).style.setProperty('padding-right', '0px')
        }

        const currentItemRefs = itemRefs.filter((item) => !headers.includes(item.current?.textContent ?? ''))
        currentItemRefs.forEach((item) => {
            const target = item.current?.children[0].children[0] as HTMLButtonElement
            target.addEventListener('mouseenter', handleItemHover)
            target.addEventListener('mouseleave', handleItemUnhover)
        })
        return () => {
            currentItemRefs.forEach((item) => {
                const target = item.current?.children[0].children[0] as HTMLButtonElement
                target.removeEventListener('mouseenter', handleItemHover)
                target.removeEventListener('mouseleave', handleItemUnhover)
            })
        }
    }, [itemRefs])

    // Physics loop for wheel. Performance impact medium
    useEffect(() => {
        const friction = 0.9
        velocity.current += acceleration.current
        velocity.current *= friction
        setPosition((p) => p + velocity.current)

        const targetRadius = -Math.abs(velocity.current) * centrifugalForceCoefficient
        setTextRadiusOffset(offset => offset + (targetRadius - offset) * 0.1)
    }, [frame])

    useEffect(() => {
        if (!circleRef.current) return
        circleRef.current.style.setProperty('transform', `translateX(-${wheelSize / 2 + xOffset}px)`)
    }, [xOffset, circleRef])

    useEffect(() => {
        if (!parentRef.current) return
        parentRef.current.style.setProperty('transform', `translateX(-${wheelSize / 2 + xOffset}px)`)
    }, [xOffset, parentRef])

    return (
        <div className="wheel-container absolute top-1/2 -right-900">
            <div
                ref={circleRef}
                className="transition-transform -right-200 transform -translate-y-1/2 duration-1000 ease-in-out top-1/2 w-[var(--wheel-size)] rounded-[50%] h-[var(--wheel-size)] absolute bg-[var(--foreground)]"
            ></div>
            <div
                ref={parentRef}
                className="absolute w-500 right-150 flex h-screen trasnform -translate-y-1/2 flex-col transition-transform duration-1000 ease-in-out"
            >
                {items}
            </div>
        </div>
    )
}
