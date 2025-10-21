import React, { createRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { circular_rotate, isVisible } from '../typescript/math_helpers'
import { PortfolioData } from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'
import { Group } from './WheelItems'

const SCROLL_VELOCITY_FACTOR = 0.00008
const DRAG_VELOCITY_FACTOR = 0.00015
const FRICTION = 0.992
const FRAME_RATE = 60
const EASING_DURATION = 7000

function rotate(ref: HTMLDivElement, angle: number) { ref.style.setProperty('transform', `rotate(${angle}deg)`) }
function opacity(ref: HTMLDivElement, value: number) { ref.style.setProperty('opacity', value.toString()) }
function width(ref: HTMLDivElement, value: number) { (ref.children[0] as HTMLDivElement).style.setProperty('width', `${600 + value}px`) }

const lerp = (start: number, end: number, t: number) => t * end + (1 - t) * start
const lerpRoot = (start: number, end: number, t: number) => lerp(start, end, Math.sqrt(t))
const lerpOvershoot = (start: number, end: number, t: number) => {
    if (t < 0.5) return lerp(start, end * 2, t * 2)
    return lerp(end * 2, end, t * 2 - 1)
}

export default function Wheel() {

    const parentRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef<HTMLDivElement>(null)

    const projectContext = useContext(ProjectContext)
    const { scrollSinceSelection, groupVisibilities } = projectContext

    const selectedIndexRef = useRef(projectContext.selectedIndex)
    useEffect(() => {
        selectedIndexRef.current = projectContext.selectedIndex
    }, [projectContext.selectedIndex])

    useEffect(() => {
        const mainRefs = [circleRef, hoverRef]
        mainRefs.forEach(ref => {
            if (!ref.current) return
            ref.current.style.setProperty('transform', `translateX(-${projectContext.selected ? 500 : 750}px)`)
        })
    }, [projectContext.selected])

    // Track hover
    const wheelHoverRef = useRef<HTMLDivElement>(null)

    // Set scroll since selection
    useEffect(() => {
        if (!scrollSinceSelection) return
        const ref = wheelHoverRef.current
        const circleScrollRef = circleRef.current
        const scrollHandler = () => scrollSinceSelection.current = true
        ref?.addEventListener("wheel", scrollHandler)
        circleScrollRef?.addEventListener("wheel", scrollHandler)
        return () => {
            ref?.removeEventListener("wheel", scrollHandler)
            circleScrollRef?.removeEventListener("wheel", scrollHandler)
        }
    }, [scrollSinceSelection])

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

    // Frame data
    const lag = useRef(0)
    const velocity = useRef(0)
    const deltaTime = useRef(1000 / FRAME_RATE)
    deltaTime.current = 1000 / FRAME_RATE
    const position = useRef(-.7)

    const effectiveSelectedIndex = useRef(0)

    const tabRef1 = useRef<HTMLDivElement>(null)
    const tabRef2 = useRef<HTMLDivElement>(null)
    const tabRef3 = useRef<HTMLDivElement>(null)

    // Scrolling
    const deltaScroll = useRef(0)
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            deltaScroll.current += e.deltaY
            if (scrollSinceSelection) scrollSinceSelection.current = true
        }
        const wheelHover = wheelHoverRef.current
        const circle = circleRef.current
        const hoverElement = hoverRef.current
        wheelHover?.addEventListener('wheel', wheelHandler)
        circle?.addEventListener('wheel', wheelHandler)
        hoverElement?.addEventListener('wheel', wheelHandler)
        return () => {
            wheelHover?.removeEventListener('wheel', wheelHandler)
            circle?.removeEventListener('wheel', wheelHandler)
            hoverElement?.addEventListener('wheel', wheelHandler)
        }
    }, [])
    const doScrolling = useCallback(() => {
        velocity.current += deltaScroll.current * SCROLL_VELOCITY_FACTOR
        deltaScroll.current = 0
    }, [])

    // Dragging
    const deltaDrag = useRef(0)
    useAccumulateDragging([parentRef, circleRef], deltaDrag, scrollSinceSelection)
    const isDragging = useRef(false)
    const doDragging = useCallback(() => {
        if (isDragging.current) {
            if (deltaDrag.current === 0) isDragging.current = false
            velocity.current += deltaDrag.current * DRAG_VELOCITY_FACTOR
            deltaDrag.current = 0
        } else if (Math.abs(deltaDrag.current) > 1) isDragging.current = true // Only start dragging if the user drags fast enough

        position.current += velocity.current * (deltaTime.current + lag.current) / 16
    }, [])

    const lastRender = useRef<number>(performance.now())
    const animationId = useRef<number | null>(null)
    useEffect(() => {
        if (!scrollSinceSelection) return
        if (!groupVisibilities) return

        let running = true

        let accumulator = 0
        let timeSinceAnimationFrame = 0
        let timeOfLastAnimationFrame = 0

        const frameLoop = (timestamp: number) => {
            timeSinceAnimationFrame = timestamp - timeOfLastAnimationFrame
            if (!running) return

            accumulator += timeSinceAnimationFrame
            if (accumulator > deltaTime.current) {
                // Manage rendering metadata
                totalTime.current += deltaTime.current
                lag.current = timestamp - lastRender.current - deltaTime.current
                lastRender.current = timestamp
                accumulator -= deltaTime.current

                // Do physics
                if (!scrollSinceSelection.current && effectiveSelectedIndex) { // Move wheel to selected item
                    const current_angle = circular_rotate(effectiveSelectedIndex.current ?? 0, position.current)
                    const target_angle = circular_rotate(0, 0)
                    const delta_angle = current_angle - target_angle - 20 // 20 is the magic number, 
                    velocity.current = velocity.current
                        + Math.pow(Math.tanh(delta_angle), 3) // Main function
                        * .001 // Scale for funsies 
                        * ((deltaTime.current + lag.current) / 6) // Scale for scaries
                }
                velocity.current *= FRICTION ** (deltaTime.current + lag.current) // Friction

                doDragging()
                doScrolling()

                // Move things
                let extraItems = 0
                let absoluteIndex = 0
                const updateEverything = (
                    ref: HTMLDivElement,
                    timeSinceChange: number,
                    groupIndex: number,
                    isHeader: boolean = false
                ) => {
                    const isSelectedIndex = selectedIndexRef.current === absoluteIndex
                    if (isSelectedIndex) effectiveSelectedIndex.current = extraItems + groupIndex

                    // Opacity
                    const nextOpacity = lerpRoot(
                        currentOpacities.current[absoluteIndex],
                        groupVisibilities.current[groupIndex].visible || isHeader ? 1 : 0,
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
                        groupVisibilities.current[groupIndex].visible || isHeader ? 0 : 400,
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
                    if (groupVisibilities.current[groupIndex].visible)
                        extraItems++

                    absoluteIndex++
                }

                if (tabRef1.current && tabRef2.current && tabRef3.current) {
                    rotate(tabRef1.current, -circular_rotate(0, position.current))
                    rotate(tabRef2.current, -circular_rotate(0, position.current))
                    rotate(tabRef3.current, -circular_rotate(0, position.current))
                }

                itemRefs.current.forEach((group, groupIndex) => {
                    const timeSet = groupVisibilities.current[groupIndex].timeSet
                    const timeSinceSet = performance.now() - timeSet

                    if (group.headerRef.current) updateEverything(group.headerRef.current, timeSinceSet, groupIndex, true)

                    group.itemRefs.forEach(item => {
                        if (item.current) updateEverything(item.current, timeSinceSet, groupIndex)
                    })
                    absoluteIndex++ // idk why
                    if (group.blankRef.current) updateEverything(group.blankRef.current, timeSinceSet, groupIndex)
                })
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

    }, [doDragging, doScrolling, groupVisibilities, scrollSinceSelection])

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
                    groupVisibilities={groupVisibilities}
                >
                </Group>
            )

            globalIndex += sectionLength
            return section
        })
    }, [groupVisibilities])

    return (<div className="flex relative">

        <div
            ref={circleRef}
            className="z-3 align-middle cursor-grab relative active:cursor-grabbing -ml-30 -right-300 min-w-[var(--wheel-size)] h-[var(--wheel-size)] transition-transform duration-1000 ease-in-out"
        >
            <div className="z-10 absolute w-full h-full bg-foreground rounded-full"></div>
            <div ref={tabRef1} className='z-11 text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 -rotate-2 left-3 text-[var(--background)]'>
                -
            </div>
            <div ref={tabRef2} className='z-11 text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 left-3 text-[var(--background)]'>
                -
            </div>
            <div ref={tabRef3} className='z-11 text-xl select-none absolute top-[calc(50%)] w-[var(--wheel-size)] -translate-y-1/2 rotate-2 left-3 text-[var(--background)]'>
                -
            </div>
            <div
                ref={wheelHoverRef}
                className="-z-1 absolute pointer-events-none -translate-x-[calc(0.75*var(--wheel-size)+40px)] translate-y-[calc(0.5*var(--wheel-size))] w-500 h-screen transition-transform duration-1000 ease-in-out align-end"
            >
                <div
                    ref={parentRef}
                    className="transition-transform duration-1000 ease-in-out"
                >
                    {items}
                </div>
            </div>
        </div>
        <div ref={hoverRef} className="absolute w-100 h-200 -right-120">

        </div>
    </div>)
}

function useAccumulateDragging(
    refs: React.RefObject<HTMLDivElement | null>[],
    deltaDrag: React.RefObject<number>,
    scrollSinceSelection?: React.RefObject<boolean>,
) {
    const isDragging = useRef(false)
    const lastDragY = useRef(0)

    useEffect(() => {
        if (!scrollSinceSelection) return

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
                scrollSinceSelection.current = true
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
    }, [deltaDrag, scrollSinceSelection, refs])
}
