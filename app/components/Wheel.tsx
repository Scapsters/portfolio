import React, { createRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { circular_rotate, isVisible } from '../typescript/math_helpers'
import { getItemColor, PortfolioData, Project, Tool} from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'

const SCROLL_VELOCITY_FACTOR = 0.00007
const FRICTION = 0.996
const DEFAULT_FRAME_RATE = 60
const EASING_DURATION = 7000


type Visibility = {
    visible: boolean,
    timeSet: number
}

function Group({
    header, items, groupIndex, startingIndex, itemRefs, setGroupVisibilities
}: Readonly<{ 
        header: string, 
        items: (Tool | Project)[], 
        groupIndex: number
        startingIndex: number, 
        itemRefs: { 
            headerRef: React.RefObject<HTMLDivElement | null>, 
            itemRefs: (React.RefObject<HTMLDivElement | null>)[] 
        }, 
        setGroupVisibilities: React.Dispatch<React.SetStateAction<Visibility[]>>
    }>) {
    return (<>
        <ItemWrapper ref={itemRefs.headerRef} isHeader={true}>
            <Header text={header} toggleSection={() => {
                setGroupVisibilities(prev => [
                    ...prev.slice(0, groupIndex).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
                    { visible: !prev[groupIndex].visible, timeSet: performance.now() },
                    ...prev.slice(groupIndex + 1).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
                ]);
            }}/>
        </ItemWrapper>
        {items.map((item, index) => {
            return (
                <ItemWrapper ref={itemRefs.itemRefs[index]} key={item.key_name + index}>
                    <Item tool={item} index={startingIndex + index + 1}></Item>
                </ItemWrapper>
            )
        })}
    </>)
}

function Header({
    text, toggleSection
}: Readonly<{ text: string, toggleSection: () => void }>) {
    return (
        <button
            className="font-light text-[var(--light-text)] text-right transition-[padding-right] duration-200 ease-out wheel-item wheel-text"
            onClick={toggleSection}
        >{text}</button>
    )
}

function Item({
    tool, index
}: Readonly<{ tool: Tool | Project, index: number }> ) {
    const { 
        selected,
        setSelected,
        setSelectedIndex,
        isProject,
        setIsProject,
        setScrollSinceSelection, 
        setPreviousSelected, 
        setIsPreviousProject,
    } = useContext(ProjectContext)

    const handleItemHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        (target as HTMLElement).style.setProperty('padding-right', '50px')
    }
    const handleItemUnhover = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        (target as HTMLElement).style.setProperty('padding-right', '0px')
    }

    const buttonRef = useRef<HTMLButtonElement>(null)
    useBoldSelected(buttonRef, selected)

    const itemMemo = useMemo(() => 
        <button
            ref={buttonRef}
            style={{color: getItemColor(tool.key_name)}}
            className="left-0 p-3 w-max h-max text-[var(--dark-text)] text-right transition-[padding-right, color] duration-200 ease-out"
            onClick={() => {
                setScrollSinceSelection(false)

                setPreviousSelected(selected)
                setIsPreviousProject(isProject)

                // If clicking on the same thing twice, deselect
                if (selected?.key_name === tool.key_name) {
                    setSelected(null)
                    setSelectedIndex(null)
                    return
                }

                // Depends on whether the selected item is a project or not
                if (Object.keys(PortfolioData.Projects).includes(tool.key_name)) {
                    setSelected(tool)
                    setSelectedIndex(index)
                    setIsProject(true)
                } else {
                    setSelected(tool)
                    setSelectedIndex(index)
                    setIsProject(false)
                }
            }}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemUnhover}
        >{tool.key_name}</button>
        ,
        [tool, setScrollSinceSelection, setPreviousSelected, selected, setIsPreviousProject, isProject, setSelected, setSelectedIndex, index, setIsProject]
    )

    return itemMemo
}

function ItemWrapper({ ref, children, isHeader }: Readonly<{ ref: React.RefObject<HTMLDivElement | null>, children: React.ReactNode, isHeader?: boolean }>) {
    return <div
        ref={ref}
        style={isHeader ? { 'zIndex': 100 } : {}}
        className={`relative w-[var(--item-width)] h-0 text-3xl`}
    >
        <div className="flex w-[600px] -rotate-2 select-none justify-end transition-[padding-right] duration-200 ease-out">
            {children}
        </div>
    </div>
}

export default function Wheel() {

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
    
    const { selected, selectedIndex, scrollSinceSelection, setScrollSinceSelection } = useContext(ProjectContext)

    useEffect(() => setxOffset(selected ? 550: 700), [selected])

    // Accumulate dragging to affect physics
    const deltaDrag = useRef(0)
    useAccumulateDragging(parentRef, deltaDrag, setScrollSinceSelection)
    
    // Track hover
    const wheelHoverRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    useHoverOverWheel(wheelHoverRef, setIsHovered)
    
    // Set scroll since selection
    useEffect(() => {
        const ref = wheelHoverRef.current
        const scrollHandler = () => setScrollSinceSelection(true)
        ref?.addEventListener("wheel", scrollHandler)
        return () => ref?.removeEventListener("wheel", scrollHandler)
    })
    
    // Count scroll per frame
    const deltaScroll = useRef(0)
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            if (isHovered) deltaScroll.current += e.deltaY
        }
        const element = wheelHoverRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => element?.removeEventListener('wheel', wheelHandler)
    }, [isHovered])
    
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

    const [groupVisibilities, setGroupVisibilities] = useState<Visibility[]>(
        new Array(itemRefs.current.length).fill({ visible: false, timeSet: performance.now() })
    )

    const currentOffsets = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))
    const currentOpacities = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))
    const currentXOffsets = useRef<(number)[]>(new Array(flatItemRefs.length).fill(0))

    let groupIndexOut = 0
    let extraItems = 0
    let absoluteIndex = 0

    function rotate(ref: HTMLDivElement, angle: number) { ref.style.setProperty('transform', `rotate(${angle}deg)`)}
    function opacity(ref: HTMLDivElement, value: number) { ref.style.setProperty('opacity', value.toString()) }
    function width(ref: HTMLDivElement, value: number) { ref.children[0].style.setProperty('width', `${600 + value}px`) }
    const lerp = (start: number, end: number, t: number) => t * end + (1 - t) * start 
    const lerpSquared = (start: number, end: number, t: number) => t ** 2 * end + (1 - t ** 2) * start
    const lerpRoot = (start: number, end: number, t: number) => Math.sqrt(t) * end + (1 - Math.sqrt(t)) * start

    // Frame data
    const framePeriod = useRef(1000 / DEFAULT_FRAME_RATE)
    const lag = useRef(0)
    const velocity = useRef(0)
    const deltaTime = useRef(framePeriod.current)
    const position = useRef(0)

    const effectiveSelectedIndex = useRef(0)
    function updateRotation(
        ref: HTMLDivElement, 
        timeSinceChange: number,
        isHeader: boolean = false
    ) {

        const isSelectedIndex = selectedIndex === absoluteIndex
        if (isSelectedIndex) effectiveSelectedIndex.current = extraItems

        // Opacity
        const nextOpacity = lerpRoot(
            currentOpacities.current[absoluteIndex], 
            groupVisibilities[groupIndexOut].visible || isHeader ? 1 : 0, 
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
        const angle = -circular_rotate(groupIndexOut + offset, position.current)
        rotate(ref, angle)

        // X Offset
        const nextXOffset = lerp(
            currentXOffsets.current[absoluteIndex],
            groupVisibilities[groupIndexOut].visible || isHeader ? 0 : 400,
            Math.min(timeSinceChange / EASING_DURATION, 1)
        )
        currentXOffsets.current[absoluteIndex] = nextXOffset
        width(ref, nextXOffset)

        // Visibility
        if (isVisible(groupIndexOut + offset, position.current)) {
        } else {
            opacity(ref, .1)
        }

        // Indices
        if (groupVisibilities[groupIndexOut].visible) 
            extraItems++
        absoluteIndex++
    }
    
    itemRefs.current.forEach((group, groupIndex) => {
        const timeSet = groupVisibilities[groupIndex].timeSet
        const timeSinceSet = performance.now() - timeSet

        if (group.headerRef.current) updateRotation(group.headerRef.current, timeSinceSet, true)
        
        group.itemRefs.forEach(item => {
            if (item.current) updateRotation(item.current, timeSinceSet)
        })
        groupIndexOut++
    })

    // Physics loop
    if (!scrollSinceSelection && effectiveSelectedIndex) { // Move wheel to selected item
        const current_angle = circular_rotate(effectiveSelectedIndex.current ?? 0, position.current)
        const target_angle = circular_rotate(0, 0)
        const delta_angle = current_angle - target_angle - 20 // 20 is the magic number, 
        velocity.current = velocity.current 
            + Math.pow(Math.tanh(delta_angle), 3) // Main function
            * 0.0004 // Scale for funsies 
            * ((deltaTime.current + lag.current)/ 6) // Scale for scaries
    }
    velocity.current *= FRICTION ** (deltaTime.current + lag.current) // Friction
    velocity.current += deltaScroll.current * SCROLL_VELOCITY_FACTOR // Scrolling
    deltaScroll.current = 0

    // Dragging
    const isDragging = useRef(false)
    if (isDragging.current) {
        if (deltaDrag.current === 0) isDragging.current = false
        velocity.current += deltaDrag.current * SCROLL_VELOCITY_FACTOR 
    } else if (Math.abs(deltaDrag.current) > 1) isDragging.current = true // Only start dragging if the user drags fast enough

    deltaDrag.current = 0

    position.current += velocity.current * (deltaTime.current + lag.current) / 16

    const [frame, setFrame] = useState(0)
    const lastRender = useRef<number>(performance.now())
    useEffect(() => {
        let animationId: number | null = null
        let running = true

        let accumulator = 0
        let timeSinceAnimationFrame = 0
        let timeOfLastAnimationFrame = 0

        const frameLoop = (timestamp: number) => {
            timeSinceAnimationFrame = timestamp - timeOfLastAnimationFrame
            if (!running) return

            accumulator += timeSinceAnimationFrame
            if (accumulator > framePeriod.current) {
                setFrame(f => f + 1)
                totalTime.current += framePeriod.current
                lag.current = timestamp - lastRender.current - deltaTime.current 
                lastRender.current = timestamp
                accumulator -= framePeriod.current
            }
            timeOfLastAnimationFrame = timestamp
            animationId = requestAnimationFrame(frameLoop)
        }

        const tabOutHandler = () => {
            if (document.hidden) {
                running = false
                if (animationId) cancelAnimationFrame(animationId)
            } else {
                running = true
                lastRender.current = performance.now() // Reset timestamp to avoid time jumps
                requestAnimationFrame(frameLoop)
            }
        }

        animationId = requestAnimationFrame(frameLoop)
        document.addEventListener('visibilitychange', tabOutHandler)

        return () => {
            if (animationId) cancelAnimationFrame(animationId)
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
                    groupVisibilities={groupVisibilities}
                    setGroupVisibilities={setGroupVisibilities}
                    >
                </Group>
            )
            
            globalIndex += sectionLength
            return section
        })
    }, [itemRefs, groupVisibilities])

    return (<>
        <div
            ref={circleRef}
            className="z-1 top-1/2 right-0 absolute bg-[var(--foreground)] rounded-[50%] w-[var(--wheel-size)] h-[var(--wheel-size)] transition-transform -translate-y-1/2 translate-x-350 duration-1000 ease-in-out"
        ></div>
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

function useBoldSelected(itemRef: React.RefObject<HTMLButtonElement | null>, selected: Project | Tool | null | undefined) {
    useEffect(() => {
        const element = itemRef?.current
        if (!element)
            return

        if (selected?.key_name == element.textContent) {
            element.style.setProperty('text-decoration', 'underline')
            element.style.setProperty('font-weight', 'bold')
        } else {
            element.style.setProperty('text-decoration', 'none')
            element.style.setProperty('font-weight', 'normal')
        }
    }, [itemRef, selected])
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
    wheelHoverRef: React.RefObject<HTMLDivElement | null>,
    deltaDrag: React.RefObject<number>,
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
            
            if (isDragging.current) {   
                deltaDrag.current -= deltaY
                setScrollSinceSelection(true)
            }
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
    }, [deltaDrag, setScrollSinceSelection, wheelHoverRef])
}
