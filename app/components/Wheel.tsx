import React, { useEffect, useRef, useState } from 'react'
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
    // Range from [-1, 1]
    const [isHovered, setIsHovered] = useState(false)

    console.log('render')

    const [xOffset, setxOffset] = useState(2000)
    useEffect(() => {
        setxOffset(1000)
    }, [])

    useEffect(() => {
        const handleProjectSelected = () => {
            setxOffset(1200)
        }
        const handleProjectDeselected = () => {
            setxOffset(1000)
        }
        if (isProjectSelected) {
            handleProjectSelected()
        } else {
            handleProjectDeselected()
        }
    }, [isProjectSelected])

    // Wheel physics
    const [position, setPosition] = useState(0)
    const velocity = useRef(0)
    const acceleration = useRef(0)

    // To allow for style manipulation for circular transform and rotate
    const itemRefs = useRef<React.RefObject<HTMLDivElement>[]>(
        raw_items.map(() => React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>)
    )

    useEffect(() => {
        for (let i = 0; i < raw_items.length; i++) {
            const item = itemRefs.current[i].current
            if (!item) continue
            item.style.transform = `rotate(
			 	${-circular_rotate(i, position)}deg
			)`
        }
    }, [itemRefs, position])

    // To allow for tracking of the parent div
    const parentRef = useRef<HTMLDivElement>(null)

    // Track mousewheel events and impart velocity onto the wheel
    useEffect(() => {
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
    }, [parentRef])

    // Re-render every frame (for physics)
    const lastRenderTime = useRef(0)
    const [frame, setFrame] = useState(0)
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

    const [textRadiusOffset, setTextRadiusOffset] = useState(0)

    useEffect(() => {
        // Physics
        const friction = 0.9
        velocity.current += acceleration.current
        velocity.current *= friction
        setPosition(p => p + velocity.current)

        const targetRadius = -Math.abs(velocity.current) * centrifugalForceCoefficient
        setTextRadiusOffset((current) => current + (targetRadius - current) * 0.1)
    }, [frame])

    const circleRef = React.createRef<HTMLDivElement>()

    useEffect(() => {
        if (frame > 60) {
            itemRefs.current.forEach((item) => {
                item.current?.style.setProperty('transition', 'none')
            })
            circleRef.current?.style.setProperty('transition', 'right .5s ease-out')
            parentRef.current?.style.setProperty('transition', 'right .5s ease-out')
        }
    }, [itemRefs, circleRef, parentRef, frame])

    const items = raw_items.map((item, index) => (
        <div
            ref={itemRefs.current[index]
}
            key={item + index}
            style={{ width: itemWidth, right: -itemWidth / 2 + 40 }}
            className={`flex h-0 text-6xl transition duration-1000 ease-in-out absolute top-1/2`}
        >
            {headers.includes(item) ? (
                // If item is a header, render with different styling
                <p
                    key={`wheel ${item} ${index}`}
                    style={{ width: textWidth + textRadiusOffset }}
                    className="font-light text-right text-[#646464]"
                >
                    {item}
                </p>
            ) : (
                // Else, render with different styling and as a button
                <button
                    key={`wheel ${item} ${index}`}
                    style={{ width: textWidth + textRadiusOffset }}
                    className="text-right text-[#393939]"
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
                ref={circleRef}
                style={{
                    width: `${wheelSize}px`,
                    height: `${wheelSize}px`,
                    borderRadius: '50%',
                    backgroundColor: '#474749',
                    position: 'absolute',
                    right: `-${wheelSize / 2 + xOffset}px`,
                    top: `50%`,
                    transition: 'right 1s ease-in-out',
                    transform: 'translateY(-50%)',
                }}
                className="absolute"
            ></div>
            <div
                ref={parentRef}
                style={{ position: 'absolute', right: `-${xOffset}px`, transition: 'right 1s ease-in-out' }}
                className="w-500 h-1/1 flex flex-col"
            >
                {items}
            </div>
        </>
    )
}
