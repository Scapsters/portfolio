import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { circular_rotate, isVisible } from '../typescript/math_helpers'
import { getItemColor, PortfolioData, Project, raw_headers, Tool} from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'

const SCROLL_VELOCITY_FACTOR = 0.0002

function Group({
    header, items, position, totalTime, velocity, deltaTime, startingIndex
}: Readonly<{ header: string, items: (Tool | Project)[], position: number, totalTime: React.RefObject<number>, velocity: React.RefObject<number>, deltaTime: React.RefObject<number>, startingIndex: number }>) {
    const [visible, setVisible] = useState(false)

    return (<>
        <ItemWrapper position={position} totalTime={totalTime} velocity={velocity} deltaTime={deltaTime} index={startingIndex}>
            <Header text={header} toggleSection={() => setVisible(!visible)}/>
        </ItemWrapper>
        {items.map((item, index) => {
            return (
                <ItemWrapper position={position} totalTime={totalTime} velocity={velocity} deltaTime={deltaTime} index={startingIndex + index + 1} key={item.key_name + index}>
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
        >{tool.key_name}</button>
        ,
        [tool, setScrollSinceSelection, setPreviousSelected, selected, setIsPreviousProject, isProject, setSelected, setSelectedIndex, index, setIsProject]
    )


    return itemMemo
}

function ItemWrapper({ 
    position, totalTime, velocity, deltaTime, index, children
}: Readonly<{ position: number, totalTime: React.RefObject<number>, velocity: React.RefObject<number>, deltaTime: React.RefObject<number>, index: number, children: React.ReactNode }>) {

    const ref = useRef<HTMLDivElement>(null)
    useHoverEffectOnItems(ref)
    useUpdateItemRotations(ref, position, index)
    useModifyItemAnimationsWhileLoading(position, totalTime, ref)
    useUpdateVisibility(ref, index, position)

    const { selectedIndex, scrollSinceSelection } = useContext(ProjectContext)

    usePushWheelToSelectedProject(position, index, selectedIndex, scrollSinceSelection, velocity, deltaTime)

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
    
    const { selected, setScrollSinceSelection } = useContext(ProjectContext)

    const [frame, totalTime, velocity, deltaTime, wheelHoverRef] = usePhysics(setScrollSinceSelection, circleRef,  parentRef)
    
    useShiftOnProjectSelect(selected, setxOffset) // Move wheel on project selection toggle. Performance effect negligible
    
    const [position, setPosition] = useState(0)
    useWheelPhysics(frame, setPosition, deltaTime, velocity)

    const items = useMemo(() => {
        let globalIndex = 0
        return Object.entries(PortfolioData).map(entry => {

            const items = Object.values(entry[1])
            const sectionLength = items.length + 2 // One for header, one for gap between sections
            
            const section = (
                <Group 
                    key={entry[0]} 
                    header={entry[0]} 
                    items={Object.values(entry[1])}
                    position={position}
                    totalTime={totalTime}
                    velocity={velocity}
                    deltaTime={deltaTime}
                    startingIndex={globalIndex}
                    >
                </Group>
            )
            
            globalIndex += sectionLength
            return section
        })
    }, [deltaTime, position, totalTime, velocity])

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

        const frame = useAnimationFrames(deltaTime, lastRenderTime, totalTime)              // Re-render every frame (for physics) and limit to 60 FPS. Performance impact high
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

function useUpdateVisibility(ref: React.RefObject<HTMLDivElement | null>, index: number, position: number) {
    useEffect(() => {
        if (!isVisible(index, position)){
            ref.current?.style.setProperty('z-index', '-1')
            ref.current?.style.setProperty('opacity', '0')
        }
        else {
            ref.current?.style.setProperty('z-index', '1')
            ref.current?.style.setProperty('opacity', '1')
        }
    }, [index, position, ref])
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

function useUpdateItemRotations(itemRef: React.RefObject<HTMLDivElement | null>, position: number, index: number) {
    useEffect(() => {
        itemRef.current?.style.setProperty('transform', `rotate(${-circular_rotate(index, position)}deg)`)
    }, [itemRef, index, position])
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

function useHoverEffectOnItems(itemRef: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const handleItemHover = (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement
            (target as HTMLElement).style.setProperty('padding-right', '50px')
        }
        const handleItemUnhover = (e: MouseEvent) => {
            const target = e.target as HTMLButtonElement
            (target as HTMLElement).style.setProperty('padding-right', '0px')
        }

        if (Object.keys(raw_headers).includes(itemRef.current?.textContent ?? ''))
            return
        
        const target = itemRef.current?.children[0].children[0] as HTMLButtonElement | null
        if (!target) {
            console.log('target is null')
            return
        }

        target.addEventListener('mouseenter', handleItemHover)
        target.addEventListener('mouseleave', handleItemUnhover)
        return () => {
            target.removeEventListener('mouseenter', handleItemHover)
            target.removeEventListener('mouseleave', handleItemUnhover)
        }
    }, [itemRef])
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
    position: number,
    totalTime?: React.RefObject<number>,
    itemRef?: React.RefObject<HTMLDivElement | null>
) {
    useEffect(() => {
        if (totalTime?.current ?? 0 > 1200) 
            itemRef?.current?.style.setProperty('transition', 'none')
    }, [itemRef, position, totalTime])
}

function usePushWheelToSelectedProject(
    position: number,
    project_index: number,
    selected_index: number | null,
    scrollSinceSelection: boolean,
    velocity?: React.RefObject<number>,
    deltaTime?: React.RefObject<number>,
) {
    useEffect(() => {
        if (!selected_index || !velocity || !deltaTime) return
        if (scrollSinceSelection) return
        if (project_index !== selected_index) return

        const current_angle = circular_rotate(selected_index, position)
        const target_angle = circular_rotate(0, 0)

        const delta_angle = current_angle - target_angle - 20 // 20 is the magic number, 
        velocity.current = velocity.current + Math.pow(Math.tanh(delta_angle), 3) * 0.0004 * (deltaTime.current / 4)
    }, [position, selected_index, project_index, scrollSinceSelection, velocity, deltaTime])
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
