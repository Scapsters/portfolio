import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Project, projects } from '../typescript/project_card_info'
import { circular_rotate } from '../typescript/math_helpers'
import { headers, raw_items } from '@/typescript/wheel_info'

const wheelSize = 2800
const textWidth = 600
const itemWidth = wheelSize + textWidth * 2 // This gives textWidth to the left and right of the wheel
const scrollVelocityFactor = 0.0001
const centrifugalForceCoefficient = 100

/**
 * Hooks each element of the wheel to a scroll event, which changes css properties to emulate a wheel.
 */
export default function Wheel({
    setProject,
    isProjectSelected,
    project,
}: Readonly<{ setProject: (project: Project) => void; isProjectSelected: boolean; project: Project | null }>) {
    // Changed by events. Performance impact low
    const [isHovered, setIsHovered] = useState(false)
    const [scrollSinceSelection, setScrollSinceSelection] = useState(false)
    const [xOffset, setxOffset] = useState(1000)

    // Refs. Performance impact negligible
    const parentRef = useRef<HTMLDivElement>(null)
    const circleRef = React.createRef<HTMLDivElement>()
    const wheelHoverRef = useRef<HTMLDivElement>(null)

    // Animation related. Performance impact high
    const [frame, setFrame] = useState(0)
    const [position, setPosition] = useState(0)
    const [textRadiusOffset, setTextRadiusOffset] = useState(0)
    const lastRenderTime = useRef(0)
    const velocity = useRef(0)

    const itemRefs = useMemo(
        () => raw_items.map(() => React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>),
        [],
    )
    const items = useMemo(
        () =>
            raw_items.map((item, index) => (
                <div
                    ref={itemRefs[index]}
                    key={item + index}
                    style={{ right: -itemWidth / 2 }}
                    className={`w-[var(--item-width)] h-0 text-3xl transition duration-1000 ease-in-out `}
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
                                onClick={() => {
                                    setScrollSinceSelection(false)
                                    setProject(projects[item])
                                }}
                            >
                                {item}
                            </button>
                        )}
                    </div>
                </div>
            )),
        [itemRefs, setProject, textRadiusOffset],
    )

    // Move items away from the wheel as they travel quickly. Performance impact likely high but unknown.
    useEffect(() => {
        document.documentElement.style.setProperty('--wheel-item-offset', `${textWidth + textRadiusOffset}`)
    }, [textRadiusOffset])

    //Set initial position. Performance impact negligible
    useEffect(() => {
        setxOffset(1200)
    }, [])

    // Change transitions after loading. Performance impact minimal
    useModifyAnimationsWhileLoading(itemRefs, circleRef, parentRef, frame)

    //Move wheel on project selection toggle. Performance effect negligible
    useShiftOnProjectSelect(isProjectSelected, setxOffset)

    // Rotate items on position change. Performance impact medium
    useUpdateItemRotations(raw_items, itemRefs, position)

    // Track mousewheel events and add velocity. Changes are reflected in the frame loop. Performance impact negligible
    useImpartVelocityOnScroll(wheelHoverRef, isHovered, velocity, setScrollSinceSelection)

    // Track hovering over the wheel. Performance impact negligible
    useHoverOverWheel(wheelHoverRef, setIsHovered)

    // Re-render every frame (for physics) and limit to 60 FPS. Performance impact high
    useAnimationFrames(lastRenderTime, setFrame)

    // Hover effect for buttons on wheel. Performance impact negligible
    useHoverEffectOnItems(itemRefs)

    // Physics loop for wheel. Performance impact medium
    useWheelPhysics(frame, velocity, setPosition, setTextRadiusOffset)

    // Push the wheel towards the currently selected project. Performance impact high
    usePushWheelToSelectedProject(project, scrollSinceSelection, position, velocity)

    // Sets the wheels to their current xOffset. Performance impact negligible
    useMoveWheelsToXOffset(circleRef, xOffset, parentRef)

    return (
        <>
            <div
                ref={circleRef}
                className="absolute top-1/2 right-0 translate-x-350 -translate-y-1/2 transition-transform duration-1000 ease-in-out w-[var(--wheel-size)] rounded-[50%] h-[var(--wheel-size)] bg-[var(--foreground)]"
            ></div>
            <div
                ref={wheelHoverRef}
                className="absolute w-500 -right-300 flex h-screen flex-col transition-transform  duration-1000 ease-in-out"
            >
                <div
                    ref={parentRef}
                    className="absolute top-1/2 translate-x-140 transition-transform duration-1000 ease-in-out"
                >
                    {items}
                </div>
            </div>
        </>
    )
}

function useShiftOnProjectSelect(isProjectSelected: boolean, setxOffset: React.Dispatch<React.SetStateAction<number>>) {
    useEffect(() => {
        const handleProjectSelected = () => {
            setxOffset(550)
        }
        const handleProjectDeselected = () => {
            setxOffset(700)
        }
        if (isProjectSelected) {
            handleProjectSelected()
        } else {
            handleProjectDeselected()
        }
    }, [isProjectSelected, setxOffset])
}

function useUpdateItemRotations(raw_items: string[], itemRefs: React.RefObject<HTMLDivElement>[], position: number) {
    useEffect(() => {
        for (let i = 0; i < raw_items.length; i++) {
            const item = itemRefs[i].current
            if (!item) continue
            item.style.transform = `rotate(
                 ${-circular_rotate(i, position)}deg
            )`
        }
    }, [itemRefs, position, raw_items.length])
}

function useImpartVelocityOnScroll(
    wheelHoverRef: React.RefObject<HTMLDivElement | null>,
    isHovered: boolean,
    velocity: React.RefObject<number>,
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
) {
    useEffect(() => {
        console.log('hoveringers my name, and hoveringings the game')
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            velocity.current += e.deltaY * scrollVelocityFactor
            setScrollSinceSelection(true)
        }

        // Mount/unmount event listener
        const element = wheelHoverRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => {
            element?.removeEventListener('wheel', wheelHandler)
        }
    }, [wheelHoverRef, isHovered, velocity, setScrollSinceSelection])
}

function useHoverOverWheel(
    wheelHoverRef: React.RefObject<HTMLDivElement | null>,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>,
) {
    useEffect(() => {
        const element = wheelHoverRef.current
        const mouseEnterHandler = () => setIsHovered(true)
        const mouseLeaveHandler = () => setIsHovered(false)

        element?.addEventListener('mouseenter', mouseEnterHandler)
        element?.addEventListener('mouseleave', mouseLeaveHandler)
        return () => {
            element?.removeEventListener('mouseenter', mouseEnterHandler)
            element?.removeEventListener('mouseleave', mouseLeaveHandler)
        }
    }, [setIsHovered, wheelHoverRef])
}

function useHoverEffectOnItems(itemRefs: React.RefObject<HTMLDivElement>[]) {
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
}

function useAnimationFrames(
    lastRenderTime: React.RefObject<number>,
    setFrame: React.Dispatch<React.SetStateAction<number>>,
) {
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
    }, [lastRenderTime, setFrame])
}

function useWheelPhysics(
    frame: number,
    velocity: React.RefObject<number>,
    setPosition: React.Dispatch<React.SetStateAction<number>>,
    setTextRadiusOffset: React.Dispatch<React.SetStateAction<number>>,
) {
    useEffect(() => {
        const friction = 0.9
        velocity.current *= friction
        setPosition((p) => p + velocity.current)

        const targetRadius = -Math.abs(velocity.current) * centrifugalForceCoefficient
        setTextRadiusOffset((offset) => offset + (targetRadius - offset) * 0.7)
    }, [frame, setPosition, setTextRadiusOffset, velocity])
}

function useModifyAnimationsWhileLoading(
    itemRefs: React.RefObject<HTMLDivElement>[],
    circleRef: React.RefObject<HTMLDivElement | null>,
    parentRef: React.RefObject<HTMLDivElement | null>,
    frame: number,
) {
    useEffect(() => {
        if (frame > 60) {
            itemRefs.forEach((item) => {
                item.current?.style.setProperty('transition', 'none')
            })
            circleRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
            parentRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        }
    }, [itemRefs, circleRef, parentRef, frame])
}

function usePushWheelToSelectedProject(
    project: Project | null,
    scrollSinceSelection: boolean,
    position: number,
    velocity: React.RefObject<number>,
) {
    useEffect(() => {
        if (!project) return
        if (scrollSinceSelection) return

        const project_index = raw_items.indexOf(project.name.split(':')[0])
        const current_angle = circular_rotate(project_index, position)
        const target_angle = circular_rotate(0, 0)

        const delta_angle = current_angle - target_angle - 20
        velocity.current += Math.tanh(delta_angle) * 0.0016
    }, [position, project, scrollSinceSelection, velocity])
}

function useMoveWheelsToXOffset(
    circleRef: React.RefObject<HTMLDivElement | null>,
    xOffset: number,
    parentRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        if (!circleRef.current) return
        circleRef.current.style.setProperty('transform', `translateX(-${xOffset}px)`)
    }, [xOffset, circleRef])

    useEffect(() => {
        if (!parentRef.current) return
        parentRef.current.style.setProperty('transform', `translateX(-${xOffset}px)`)
    }, [xOffset, parentRef])
}
