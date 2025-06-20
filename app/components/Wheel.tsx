import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Project, projects, Tool, tools } from '../typescript/project_card_info'
import { circular_rotate } from '../typescript/math_helpers'
import { getItemColor, headers, raw_items } from '@/typescript/wheel_info'

const textWidth = 600
const scrollVelocityFactor = 0.0002

/**
 * Hooks each element of the wheel to a scroll event, which changes css properties to emulate a wheel.
 */
export default function Wheel({
    setSelected,
    isSelected,
    selected,
    isProject,
    setIsProject,
    scrollSinceSelection,
    setScrollSinceSelection,
    setPreviousSelected,
    setIsPreviousProject,
}: Readonly<{
    setSelected: React.Dispatch<React.SetStateAction<Project | Tool | null | undefined>>
    isSelected: boolean
    selected: Project | Tool | null | undefined
    isProject: boolean
    setIsProject: React.Dispatch<React.SetStateAction<boolean>>
    scrollSinceSelection: boolean
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>
    setPreviousSelected: React.Dispatch<React.SetStateAction<Project | Tool | null | undefined>>
    setIsPreviousProject: React.Dispatch<React.SetStateAction<boolean>>
}>) {
    // Changed by events. Performance impact low
    const [xOffset, setxOffset] = useState(700)

    // Refs. Performance impact negligible
    const parentRef = useRef<HTMLDivElement>(null)
    const circleRef = React.createRef<HTMLDivElement>()

    const itemRefs = useMemo(
        () => raw_items.map(() => React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>), []
    )

    const items = useMemo(() =>
        raw_items.map((item, index) => (
            <div
                ref={itemRefs[index]}
                key={item + index}
                className={`w-[var(--item-width)] h-0 text-3xl transition duration-1000 ease-in-out `}
            >
                <div className="flex select-none justify-end transition-[padding-right] duration-200 ease-out">
                    {headers.includes(item) ? (
                        // If item is a header, render with different styling
                        <p
                            key={`wheel ${item} ${index}`}
                            className="font-light text-[var(--light-text)] text-right transition-[padding-right] duration-200 ease-out wheel-item wheel-text"
                        >{item}</p>
                    ) : (
                        // Else, render with different styling and as a button
                        <button
                            key={`wheel ${item} ${index}`}
                            style={{color: getItemColor(item)}}
                            className="left-0 p-3 w-max h-max text-[var(--dark-text)] text-right transition-[padding-right, color] duration-200 ease-out"
                            onClick={() => {
                                setScrollSinceSelection(false)

                                setPreviousSelected(selected)
                                setIsPreviousProject(isProject)

                                // If clicking on the same thing twice, deselect
                                if (selected?.key_name == item) {
                                    setSelected(null)
                                    return
                                }

                                // Depends on whether the selected item is a project or not
                                if (Object.keys(projects).includes(item)) {
                                    setSelected(projects[item])
                                    setIsProject(true)
                                } else {
                                    setSelected(tools[item])
                                    setIsProject(false)
                                }
                            }}
                        >{item}</button>
                    )}
                </div>
            </div>
        )),
        [isProject, itemRefs, selected, setIsPreviousProject, setIsProject, setPreviousSelected, setScrollSinceSelection, setSelected],
    )

    // Set the width of each item based on the text width. Performance impact near-zero
    useEffect(() => {
        itemRefs.forEach((item) => (item.current.children[0] as HTMLElement).style.setProperty('width', `calc(${textWidth}px)`))
    }, [itemRefs])

    const wheelHoverRef = usePhysics(
        selected,
        itemRefs, 
        scrollSinceSelection, setScrollSinceSelection, 
        circleRef, 
        parentRef,
    )

    useBoldSelected(itemRefs, selected)                     // Bold the selected items
    useShiftOnProjectSelect(isSelected, setxOffset)         // Move wheel on project selection toggle. Performance effect negligible
    useHoverEffectOnItems(itemRefs)                         // Hover effect for buttons on wheel. Performance impact negligible
    useMoveWheelToXOffset(xOffset, circleRef, parentRef)    // Ensure correct offsets, especially on page load. Performance impact negligible
    
    return (
        <>
            <div
                ref={circleRef}
                className="top-1/2 right-0 absolute bg-[var(--foreground)] rounded-[50%] w-[var(--wheel-size)] h-[var(--wheel-size)] transition-transform -translate-y-1/2 translate-x-350 duration-1000 ease-in-out"
            ></div>
            <div
                ref={wheelHoverRef}
                className="-right-300 absolute w-500 h-screen transition-transform duration-1000 ease-in-out align-end"
            >
                <div
                    ref={parentRef}
                    className="top-1/2 absolute transition-transform translate-x-140 duration-1000 ease-in-out"
                >
                    {items}
                </div>
            </div>
        </>
    )
}

function usePhysics(
        selected: Project | Tool | null | undefined,
        itemRefs: React.RefObject<HTMLDivElement>[],
        scrollSinceSelection: boolean,
        setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
        circleRef: React.RefObject<HTMLDivElement | null>,
        parentRef: React.RefObject<HTMLDivElement | null>,
    ) {
        const velocity = useRef(0)
        const deltaTime = useRef(0)

        const wheelHoverRef = useWheelInteraction(velocity, deltaTime, setScrollSinceSelection)         // Handles wheel-specific interaction. Performance impact low
        const [position, setPosition] = useState(0)
        
        usePushWheelToSelectedProject(position, velocity, selected, scrollSinceSelection, deltaTime) // Push the wheel towards the currently selected project. Performance impact high
        useUpdateItemRotations(raw_items, itemRefs, position)                                        // Rotate items on position change. Performance impact high

        const totalTime = useRef(0)
        const lastRenderTime = useRef(0)

        const frame = useAnimationFrames(deltaTime, lastRenderTime, totalTime)              // Re-render every frame (for physics) and limit to 60 FPS. Performance impact high
        useWheelPhysics(frame, velocity, deltaTime, setPosition)                            // Physics loop for wheel. Performance impact high
        useModifyAnimationsWhileLoading(frame, totalTime, itemRefs, circleRef, parentRef)   // Change transitions after loading. Performance impact minimal

        return wheelHoverRef
    }

function useWheelInteraction(
        velocity: React.RefObject<number>,
        deltaTime: React.RefObject<number>,
        setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
        const wheelHoverRef = useRef<HTMLDivElement>(null)
        const [isHovered, setIsHovered] = useState(false)

        useImpartVelocityOnScroll(wheelHoverRef, isHovered, velocity, deltaTime, setScrollSinceSelection)   // Track mousewheel events and add velocity. Changes are reflected in the frame loop. Performance impact negligible
        useDragToSpin(wheelHoverRef, velocity, setScrollSinceSelection)                                     // Allows wheel to be dragged. Performance impact low
        useHoverOverWheel(wheelHoverRef, setIsHovered)                                                      // Sets the wheels to their current xOffset. Performance impact negligible

        return wheelHoverRef
    }

function useBoldSelected(itemRefs: React.RefObject<HTMLDivElement>[], selected: Project | Tool | null | undefined) {
    useEffect(() => {
        itemRefs.forEach((item) => {
            const element = item.current.children[0].children[0] as HTMLButtonElement

            if (selected?.key_name == element.textContent) {
                element.style.setProperty('text-decoration', 'underline')
                element.style.setProperty('font-weight', 'bold')
            } else {
                element.style.setProperty('text-decoration', 'none')
                element.style.setProperty('font-weight', 'normal')
            }
        })
    }, [itemRefs, selected])
}

function useDragToSpin(
    wheelHoverRef: React.RefObject<HTMLDivElement | null>,
    velocity: React.RefObject<number>,
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const isDragging = useRef(false)
    const lastDragY = useRef(0)

    useEffect(() => {
        const element = wheelHoverRef.current
        if (!element) return

        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            isDragging.current = true
            lastDragY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
        }

        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
            const deltaY = clientY - lastDragY.current
            lastDragY.current = clientY
            if (!isDragging.current) return

            velocity.current -= deltaY * scrollVelocityFactor * 0.4 // Adjust multiplier for sensitivity
            setScrollSinceSelection(true)
        }

        const onMouseUp = () => {
            isDragging.current = false
        }

        element.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)

        element.addEventListener('touchstart', onMouseDown)
        window.addEventListener('touchmove', onMouseMove)
        window.addEventListener('touchend', onMouseUp)
        window.addEventListener('touchcancel', onMouseUp)

        return () => {
            element.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [wheelHoverRef, velocity, setScrollSinceSelection])
}

function useShiftOnProjectSelect(isSelected: boolean, setxOffset: React.Dispatch<React.SetStateAction<number>>) {
    useEffect(() => {
        const handleProjectSelected = () => {
            setxOffset(550)
        }
        const handleProjectDeselected = () => {
            setxOffset(700)
        }
        if (isSelected) {
            handleProjectSelected()
        } else {
            handleProjectDeselected()
        }
    }, [isSelected, setxOffset])
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
    deltaTime: React.RefObject<number>,
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
) {
    useEffect(() => {
        console.log('hoveringers my name, and hoveringings the game')
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            velocity.current += +e.deltaY * scrollVelocityFactor * (deltaTime.current / 33)
            setScrollSinceSelection(true)
        }

        const element = wheelHoverRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => {
            element?.removeEventListener('wheel', wheelHandler)
        }
    }, [wheelHoverRef, isHovered, velocity, setScrollSinceSelection, deltaTime])
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
    delta_time: React.RefObject<number>,
    lastRendertime: React.RefObject<number>,
    totalTime: React.RefObject<number>,
) {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        let animationId: number | null = null
        let running = true // Track if animation is active

        const updateFrame = (timestamp: number) => {
            if (!running) return

            delta_time.current = timestamp - lastRendertime.current
            lastRendertime.current = timestamp
            totalTime.current = totalTime.current + delta_time.current

            setFrame((prev) => prev + 1)

            animationId = requestAnimationFrame(updateFrame)
        }

        const tabOutHandler = () => {
            if (document.hidden) {
                running = false
                if (animationId) cancelAnimationFrame(animationId)
            } else {
                running = true
                lastRendertime.current = performance.now() // Reset timestamp to avoid time jumps
                requestAnimationFrame(updateFrame)
            }
        }

        lastRendertime.current = performance.now()
        animationId = requestAnimationFrame(updateFrame)
        document.addEventListener('visibilitychange', tabOutHandler)

        return () => {
            if (animationId) cancelAnimationFrame(animationId)
            document.removeEventListener('visibilitychange', tabOutHandler)
        }
    }, [delta_time, lastRendertime, setFrame, totalTime])

    return frame
}

function useWheelPhysics(
    frame: number,
    velocity: React.RefObject<number>,
    deltaTime: React.RefObject<number>,
    setPosition: React.Dispatch<React.SetStateAction<number>>,
) {
    useEffect(() => {
        const friction = 0.8
        velocity.current -= (velocity.current - friction * velocity.current) * (deltaTime.current / 33)
        setPosition((p) => p + velocity.current)
    }, [deltaTime, frame, setPosition, velocity])
}

function useModifyAnimationsWhileLoading(
    frame: number,
    totalTime: React.RefObject<number>,
    itemRefs: React.RefObject<HTMLDivElement>[],
    circleRef: React.RefObject<HTMLDivElement | null>,
    parentRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        if (totalTime.current > 1200) {
            itemRefs.forEach((item) => {
                item.current?.style.setProperty('transition', 'none')
            })
            circleRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
            parentRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        }
    }, [itemRefs, circleRef, parentRef, frame, totalTime])
}

function usePushWheelToSelectedProject(
    position: number,
    velocity: React.RefObject<number>,
    project: Project | Tool | null | undefined,
    scrollSinceSelection: boolean,
    deltaTime: React.RefObject<number>,
) {
    useEffect(() => {
        if (!project) return
        if (scrollSinceSelection) return

        const project_index = raw_items.indexOf(project.name.split(':')[0])
        const current_angle = circular_rotate(project_index, position)
        const target_angle = circular_rotate(0, 0)

        const delta_angle = current_angle - target_angle - 20 // 20 is target phase
        velocity.current = velocity.current + Math.pow(Math.tanh(delta_angle), 3) * 0.0004 * (deltaTime.current / 4)
    }, [position, project, scrollSinceSelection, velocity, deltaTime])
}

function useMoveWheelToXOffset(
    xOffset: number,
    circleRef: React.RefObject<HTMLDivElement | null>,
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
