import React, { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { circular_rotate, isVisible } from '../typescript/math_helpers'
import { getItemColor, PortfolioData, Project, Tool} from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'

const SCROLL_VELOCITY_FACTOR = 0.0002

function Group({
    header, items, startingIndex, itemRefs
}: Readonly<{ header: string, items: (Tool | Project)[], startingIndex: number, itemRefs: { headerRef: React.RefObject<HTMLDivElement | null>, itemRefs: (React.RefObject<HTMLDivElement | null>)[] } }>) {
    const [visible, setVisible] = useState(false)

    return (<>
        <ItemWrapper ref={itemRefs.headerRef}>
            <Header text={header} toggleSection={() => setVisible(!visible)}/>
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

function ItemWrapper({ ref, children }: Readonly<{ ref: React.RefObject<HTMLDivElement | null>, children: React.ReactNode }>) {
    return <div
        ref={ref}
        className={`w-[var(--item-width)] h-0 text-3xl transition duration-1000 ease-in-out `}
    >
        <div className="flex w-[600px] select-none justify-end transition-[padding-right] duration-200 ease-out">
            {children}
        </div>
    </div>
}

export default function Wheel() {

    // Changed by events. Performance impact low
    const [xOffset, setxOffset] = useState(700)
    const parentRef = useRef<HTMLDivElement>(null)
    const circleRef = React.createRef<HTMLDivElement>()
    useMoveWheelToXOffset(xOffset, circleRef, parentRef) // Ensure correct offsets, especially on page load. Performance impact negligible
    
    const { selected, selectedIndex, scrollSinceSelection, setScrollSinceSelection } = useContext(ProjectContext)

    const [frame, totalTime, velocity, deltaTime, wheelHoverRef] = usePhysics(setScrollSinceSelection, circleRef,  parentRef)
    
    useShiftOnProjectSelect(selected, setxOffset) // Move wheel on project selection toggle. Performance effect negligible
    
    const [position, setPosition] = useState(0)
    useWheelPhysics(frame, setPosition, deltaTime, velocity)

    const itemRefs = useRef(
        Object.entries(PortfolioData).map((entry) => {
            const numItems = Object.values(entry[1]).length
            return {
                headerRef: createRef<HTMLDivElement>(),
                itemRefs: Array.from({ length: numItems }, () => createRef<HTMLDivElement>()),
                blankRef: createRef<HTMLDivElement>()
            }
        })
    )

    const flatItemRefs = useMemo(() => 
        itemRefs.current.flatMap(item => [item.headerRef, ...item.itemRefs, item.blankRef]), 
        [itemRefs]
    )

    useUpdateItemRotations(flatItemRefs, position)
    useModifyItemAnimationsWhileLoading(flatItemRefs, position, totalTime)
    useUpdateVisibility(flatItemRefs, position)

    usePushWheelToSelectedProject(position, selectedIndex, scrollSinceSelection, velocity, deltaTime)

    const items = useMemo(() => {
        let globalIndex = 0
        return Object.entries(PortfolioData).map((entry, index) => {

            const items = Object.values(entry[1])
            const sectionLength = items.length + 2 // One for header, one for gap between sections
            
            const section = (
                <Group 
                    key={entry[0]} 
                    header={entry[0]} 
                    items={Object.values(entry[1])}
                    startingIndex={globalIndex}
                    itemRefs={itemRefs.current[index]}
                    >
                </Group>
            )
            
            globalIndex += sectionLength
            return section
        })
    }, [itemRefs])

    return (<>
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
    </>)
}

function usePhysics(
        setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
        circleRef: React.RefObject<HTMLDivElement | null>,
        parentRef: React.RefObject<HTMLDivElement | null>,
    ): [number, React.RefObject<number>, React.RefObject<number>, React.RefObject<number>, React.RefObject<HTMLDivElement | null>] {
        
        const velocity = useRef(0)
        const deltaTime = useRef(0)
        const wheelHoverRef = useWheelInteraction(velocity, deltaTime, setScrollSinceSelection)         // Handles wheel-specific interaction. Performance impact low
        
        const totalTime = useRef(0)
        const lastRenderTime = useRef(0)

        const frame = useAnimationFrames(deltaTime, lastRenderTime, totalTime)    // Re-render every frame (for physics) and limit to 60 FPS. Performance impact high
        useModifyAnimationsWhileLoading(frame, totalTime, circleRef, parentRef)   // Change transitions after loading. Performance impact minimal

        return [frame, totalTime, velocity, deltaTime, wheelHoverRef]
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

function useUpdateVisibility(itemRefs: React.RefObject<HTMLDivElement | null>[], position: number) {
    useEffect(() => {
        itemRefs.forEach((itemRef, index) => {
            if (!isVisible(index, position)){
                itemRef.current?.style.setProperty('z-index', '-1')
                itemRef.current?.style.setProperty('opacity', '0')
            }
            else {
                itemRef.current?.style.setProperty('z-index', '1')
                itemRef.current?.style.setProperty('opacity', '1')
            }
        })
    }, [itemRefs, position])
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

            velocity.current -= deltaY * SCROLL_VELOCITY_FACTOR * 0.4 // Adjust multiplier for sensitivity
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

function useShiftOnProjectSelect(selected: Project | Tool | null | undefined, setxOffset: React.Dispatch<React.SetStateAction<number>>) {
    useEffect(() => {
        const handleProjectSelected = () => setxOffset(550)
        const handleProjectDeselected = () => setxOffset(700)
        if (selected) handleProjectSelected()
        else handleProjectDeselected()
    }, [selected, setxOffset])
}

function useUpdateItemRotations(itemRefs: React.RefObject<HTMLDivElement>[], position: number) {
    useEffect(() => {
        for (let i = 0; i < itemRefs.length; i++) {
            const item = itemRefs[i].current
            if (!item) continue
            item.style.transform = `rotate(
                 ${-circular_rotate(i, position)}deg
            )`
        }
    }, [itemRefs, position])
}

function useImpartVelocityOnScroll(
    wheelHoverRef: React.RefObject<HTMLDivElement | null>,
    isHovered: boolean,
    velocity: React.RefObject<number>,
    deltaTime: React.RefObject<number>,
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>,
) {
    useEffect(() => {
        
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) 
                return

            velocity.current += +e.deltaY * SCROLL_VELOCITY_FACTOR * (deltaTime.current / 33)
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
    setPosition: React.Dispatch<React.SetStateAction<number>>,
    deltaTime?: React.RefObject<number>,
    velocity?: React.RefObject<number>,
) {
    useEffect(() => {
        if(!deltaTime || !velocity) return
        const friction = 0.8
        velocity.current -= (velocity.current - friction * velocity.current) * (deltaTime.current / 33)
        setPosition((p) => p + velocity.current)
    }, [deltaTime, frame, setPosition, velocity])
}

function useModifyAnimationsWhileLoading(
    frame: number,
    totalTime: React.RefObject<number>,
    circleRef: React.RefObject<HTMLDivElement | null>,
    parentRef: React.RefObject<HTMLDivElement | null>,
) {
    useEffect(() => {
        if (totalTime.current > 1200) {
            circleRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
            parentRef.current?.style.setProperty('transition', 'transform .5s ease-in-out')
        }
    }, [circleRef, parentRef, frame, totalTime])
}

function useModifyItemAnimationsWhileLoading(
    itemRefs: React.RefObject<HTMLDivElement | null>[],
    position: number,
    totalTime: React.RefObject<number>
) {
    useEffect(() => {
        if (totalTime?.current ?? 0 > 1200) 
            itemRefs.forEach(itemRef => itemRef?.current?.style.setProperty('transition', 'none')
    )}, [itemRefs, position, totalTime])
}

function usePushWheelToSelectedProject(
    position: number,
    selected_index: number | null,
    scrollSinceSelection: boolean,
    velocity?: React.RefObject<number>,
    deltaTime?: React.RefObject<number>,
) {
    useEffect(() => {
        if (!selected_index || !velocity || !deltaTime) return
        if (scrollSinceSelection) return

        const current_angle = circular_rotate(selected_index, position)
        const target_angle = circular_rotate(0, 0)

        const delta_angle = current_angle - target_angle - 20 // 20 is the magic number, 
        velocity.current = velocity.current + Math.pow(Math.tanh(delta_angle), 3) * 0.0004 * (deltaTime.current / 4)
    }, [position, selected_index, scrollSinceSelection, velocity, deltaTime])
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
