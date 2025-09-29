import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { circular_rotate, isVisible } from '../typescript/math_helpers'
import { PortfolioData } from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'
import { Group } from './WheelItems'

const SCROLL_VELOCITY_FACTOR = 0.00008
const DRAG_VELOCITY_FACTOR = 0.00015
const FRICTION = 0.992
const DEFAULT_FRAME_RATE = 60
const EASING_DURATION = 7000

export default function Wheel() {

    //eslint-disable-next-line
    const [frameRate, setFrameRate] = useState(DEFAULT_FRAME_RATE)

    const [xOffset, setxOffset] = useState(700)
    const parentRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    
    // Shift items to xOffset
    useEffect(() => {
        const mainRefs = [parentRef, circleRef]
        mainRefs.forEach(ref => {
            if (!ref.current) return
            ref.current.style.setProperty('transform', `translateX(-${xOffset}px)`)
        })
    }, [xOffset])
    
    const { selected, selectedIndex, scrollSinceSelection, setScrollSinceSelection , groupVisibilities, setGroupVisibilities} = useContext(ProjectContext)

    useEffect(() => setxOffset(selected ? 550: 700), [selected])

    // Track hover
    const wheelHoverRef = useRef<HTMLDivElement>(null)
    //eslint-disable-next-line
    const [isHovered, setIsHovered] = useState(false)
    useHoverOverWheel(wheelHoverRef, setIsHovered)
    
    // Set scroll since selection
    useEffect(() => {
        const ref = wheelHoverRef.current
        const circleScrollRef = circleRef.current
        const scrollHandler = () => setScrollSinceSelection(true)
        ref?.addEventListener("wheel", scrollHandler)
        circleScrollRef?.addEventListener("wheel", scrollHandler)
        return () => {
            ref?.removeEventListener("wheel", scrollHandler)
            circleScrollRef?.removeEventListener("wheel", scrollHandler)
        }
    })
    
    // Store item refs for central handling of rotation
    const itemRefs = useRef( // Organized per section with header, main items, and a gap between
        Object.entries(PortfolioData).map((entry) => {
            const numItems = Object.values(entry[1]).length
            return {
                headerRef: createRef<HTMLDivElement>(),
                itemRefs: Array.from({ length: numItems }, () => createRef<HTMLDivElement>()),
                blankRef: createRef<HTMLDivElement>()
            }
        })
    )
    const flatItemRefs = useMemo(() => // Just flattened the original array
        itemRefs.current.flatMap(item => [item.headerRef, ...item.itemRefs, item.blankRef]), 
        [itemRefs]
    )

    const totalTime = useRef(0) 

    const hasSetTransition = useRef(false)
    if (!hasSetTransition.current && totalTime.current > 1200) { // For some reason
        circleRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        parentRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        hasSetTransition.current = true
    }

    const currentOffsets = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))
    const currentOpacities = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))
    const currentXOffsets = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))

    function rotate(ref: HTMLDivElement, angle: number) { ref.style.setProperty('transform', `rotate(${angle}deg)`)}
    function opacity(ref: HTMLDivElement, value: number) { ref.style.setProperty('opacity', value.toString()) }
    function width(ref: HTMLDivElement, value: number) { (ref.children[0] as HTMLDivElement).style.setProperty('width', `${600 + value}px`) }
    
    const lerp = (start: number, end: number, t: number) => t * end + (1 - t) * start 
    const lerpRoot = (start: number, end: number, t: number) => lerp(start, end, Math.sqrt(t))
    const lerpOvershoot = (start: number, end: number, t: number) => {
        if (t < 0.5) return lerp(start, end * 2, t * 2)
        return lerp(end * 2, end, t * 2 - 1)
    }

    // Frame data
    const lag = useRef(0)
    const velocity = useRef(0)
    const deltaTime = useRef(1000 / frameRate)
    deltaTime.current = 1000 / frameRate
    const position = useRef(-.7)

    const effectiveSelectedIndex = useRef(0)

    let extraItems = 0
    let absoluteIndex = 0
    function updateEverything(
        ref: HTMLDivElement, 
        timeSinceChange: number,
        groupIndex: number,
        isHeader: boolean = false
    ) {
        const isSelectedIndex = selectedIndex === absoluteIndex
        if (isSelectedIndex) effectiveSelectedIndex.current = extraItems + groupIndex

        // Opacity
        const nextOpacity = lerpRoot(
            currentOpacities.current[absoluteIndex], 
            groupVisibilities[groupIndex].visible || isHeader ? 1 : 0, 
            Math.min(timeSinceChange / EASING_DURATION, 1)
        )
        currentOpacities.current[absoluteIndex] = nextOpacity
        opacity(ref, nextOpacity)
        
        // Rotation
        const offset = lerpRoot(
            currentOffsets.current[absoluteIndex], 
            extraItems, 
            Math.min(timeSinceChange / EASING_DURATION, 1)
        )
        currentOffsets.current[absoluteIndex] = offset
        const angle = -circular_rotate(groupIndex + offset, position.current)
        rotate(ref, angle)

        // X Offset
        const nextXOffset = lerpOvershoot(
            currentXOffsets.current[absoluteIndex],
            groupVisibilities[groupIndex].visible || isHeader ? 0 : 400,
            Math.min(timeSinceChange / EASING_DURATION, 1)
        )
        currentXOffsets.current[absoluteIndex] = nextXOffset
        width(ref, nextXOffset)

        // Visibility
        if (isVisible(groupIndex + offset, position.current)) {
        } else {
            opacity(ref, .1)
        }

        // Indices
        if (groupVisibilities[groupIndex].visible) 
            extraItems++

        absoluteIndex++
    }
    
    itemRefs.current.forEach((group, groupIndex) => {
        const timeSet = groupVisibilities[groupIndex].timeSet
        const timeSinceSet = performance.now() - timeSet

        if (group.headerRef.current) updateEverything(group.headerRef.current, timeSinceSet, groupIndex, true)
        
        group.itemRefs.forEach(item => {
            if (item.current) updateEverything(item.current, timeSinceSet, groupIndex)
        })
        absoluteIndex++ // idk why
        if (group.blankRef.current) updateEverything(group.blankRef.current, timeSinceSet, groupIndex)
    })

    const tabRef1 = useRef<HTMLDivElement>(null)
    const tabRef2 = useRef<HTMLDivElement>(null)
    const tabRef3 = useRef<HTMLDivElement>(null)
    if (tabRef1.current && tabRef2.current && tabRef3.current) {
        rotate(tabRef1.current, -circular_rotate(0, position.current))
        rotate(tabRef2.current, -circular_rotate(0, position.current))
        rotate(tabRef3.current, -circular_rotate(0, position.current))
    }

    // Physics loop
    if (!scrollSinceSelection && effectiveSelectedIndex) { // Move wheel to selected item
        const current_angle = circular_rotate(effectiveSelectedIndex.current ?? 0, position.current)
        const target_angle = circular_rotate(0, 0)
        const delta_angle = current_angle - target_angle - 20 // 20 is the magic number, 
        velocity.current = velocity.current 
            + Math.pow(Math.tanh(delta_angle), 3) // Main function
            * .001 // Scale for funsies 
            * ((deltaTime.current + lag.current)/ 6) // Scale for scaries
    }
    velocity.current *= FRICTION ** (deltaTime.current + lag.current) // Friction

    // Scrolling
    const deltaScroll = useRef(0)
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            deltaScroll.current += e.deltaY
        }
        const wheelHover = wheelHoverRef.current
        const circle =  circleRef.current
        wheelHover?.addEventListener('wheel', wheelHandler)
        circle?.addEventListener('wheel', wheelHandler)
        return () => {
            wheelHover?.removeEventListener('wheel', wheelHandler)
            circle?.removeEventListener('wheel', wheelHandler)
        }
    })
    velocity.current += deltaScroll.current * SCROLL_VELOCITY_FACTOR 
    deltaScroll.current = 0

    // Dragging
    const deltaDrag = useRef(0)
    useAccumulateDragging([parentRef, circleRef], deltaDrag, setScrollSinceSelection)
    const isDragging = useRef(false)
    if (isDragging.current) {
        if (deltaDrag.current === 0) isDragging.current = false
        velocity.current += deltaDrag.current * DRAG_VELOCITY_FACTOR 
        deltaDrag.current = 0
    } else if (Math.abs(deltaDrag.current) > 1) isDragging.current = true // Only start dragging if the user drags fast enough

    position.current += velocity.current * (deltaTime.current + lag.current) / 16

    const [, setFrame] = useState(0)
    const lastRender = useRef<number>(performance.now())
    const animationId = useRef<number | null>(null)
    useEffect(() => {
        let running = true

        let accumulator = 0
        let timeSinceAnimationFrame = 0
        let timeOfLastAnimationFrame = 0

        const frameLoop = (timestamp: number) => {
            timeSinceAnimationFrame = timestamp - timeOfLastAnimationFrame
            if (!running) return

            accumulator += timeSinceAnimationFrame
            if (accumulator > deltaTime.current) {
                setFrame(f => f + 1)
                totalTime.current += deltaTime.current
                lag.current = timestamp - lastRender.current - deltaTime.current 
                lastRender.current = timestamp
                accumulator -= deltaTime.current
            }
            timeOfLastAnimationFrame = timestamp
            animationId.current = requestAnimationFrame(frameLoop)
        }

        const tabOutHandler = () => {
            if (document.hidden) {
                running = false
                if (animationId.current) cancelAnimationFrame(animationId.current)
            } else {
                running = true
                lastRender.current = performance.now() // Reset timestamp to avoid time jumps
                requestAnimationFrame(frameLoop)
            }
        }

        animationId.current = requestAnimationFrame(frameLoop)
        document.addEventListener('visibilitychange', tabOutHandler)

        return () => {
            if (animationId.current) cancelAnimationFrame(animationId.current)
            document.removeEventListener('visibilitychange', tabOutHandler)
        }

    }, [])

    const items = useMemo(() => {
        let globalIndex = 0
        return Object.entries(PortfolioData).map((entry, index) => {

            const items = Object.values(entry[1])
            const sectionLength = items.length + 2 // One for header, one for gap between sections
            
            const section = (
                <Group 
                    key={entry[0]} 
                    header={entry[0]} 
                    groupIndex={index}
                    items={Object.values(entry[1])}
                    startingIndex={globalIndex}
                    itemRefs={itemRefs.current[index]}
                    setGroupVisibilities={setGroupVisibilities}
                    >
                </Group>
            )
            
            globalIndex += sectionLength
            return section
        })
    }, [setGroupVisibilities])

    return (<>
        <div
            ref={circleRef}
            className="z-3 cursor-grab active:cursor-grabbing top-1/2 right-0 absolute bg-[var(--foreground)] rounded-[50%] w-[var(--wheel-size)] h-[var(--wheel-size)] transition-transform -translate-y-1/2 translate-x-300 duration-1000 ease-in-out"
        >
            <div ref={tabRef1} className='text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 -rotate-2 left-3 text-[var(--background)]'>
                -
            </div>
            <div ref={tabRef2} className='text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 left-3 text-[var(--background)]'>
                -
            </div>
            <div ref={tabRef3} className='text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 rotate-2 left-3 text-[var(--background)]'>
                -
            </div>
        </div>
        {/* <FrameRateSelector frameRate={frameRate} setFrameRate={setFrameRate}></FrameRateSelector> */}
        <div
            ref={wheelHoverRef}
            className="-z-1 -right-300 absolute w-500 h-screen transition-transform duration-1000 ease-in-out align-end"
        >
            <div
                ref={parentRef}
                className="top-1/2 absolute transition-transform translate-x-140 duration-1000 ease-in-out"
            >
                {items} 
            </div>
        </div>
    </>)
}

//eslint-disable-next-line
function FrameRateSelector({
    frameRate,
    setFrameRate,
}: Readonly<{
    frameRate: number
    setFrameRate: React.Dispatch<React.SetStateAction<number>>
}>) {
    const options = [15, 30, 60, 120]
    return (
        <div className="absolute top-3 left-240 flex gap-4 items-center bg-[var(--background)] px-4 py-2 rounded shadow">
            <span className="ml-2 text-sm text-[var(--foreground)]">FPS</span>
            {options.map(option => {
                const isSelected = frameRate === option
                const baseStyle = {
                    background: isSelected ? 'var(--foreground)' : 'transparent',
                    color: isSelected ? 'white' : 'var(--foreground)',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.75rem',
                    transition: 'background 0.2s, color 0.2s',
                    cursor: 'pointer',
                }
                return (
                    <button
                        key={option}
                        onClick={() => setFrameRate(option)}
                        style={baseStyle}
                        onMouseEnter={e => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.08)'
                            }
                        }}
                        onMouseLeave={e => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'transparent'
                            }
                        }}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
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

function useAccumulateDragging(
    refs: React.RefObject<HTMLDivElement | null>[],
    deltaDrag: React.RefObject<number>,
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const isDragging = useRef(false)
    const lastDragY = useRef(0)

    useEffect(() => {
        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            isDragging.current = true
            lastDragY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
        }

        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
            const deltaY = clientY - lastDragY.current
            lastDragY.current = clientY

            if (isDragging.current) {
                deltaDrag.current -= deltaY
                setScrollSinceSelection(true)
            }
        }

        const onMouseUp = () => {
            isDragging.current = false
        }

        refs.forEach(ref => {
            const element = ref.current
            if (!element) return

            element.addEventListener('mousedown', onMouseDown)
            element.addEventListener('touchstart', onMouseDown)
        })

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('touchmove', onMouseMove)
        window.addEventListener('touchend', onMouseUp)
        window.addEventListener('touchcancel', onMouseUp)

        return () => {
            refs.forEach(ref => {
                const element = ref.current
                if (!element) return

                element.removeEventListener('mousedown', onMouseDown)
                element.removeEventListener('touchstart', onMouseDown)
            })

            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('touchmove', onMouseMove)
            window.removeEventListener('touchend', onMouseUp)
            window.removeEventListener('touchcancel', onMouseUp)
        }
    }, [deltaDrag, setScrollSinceSelection, refs])
}
