'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'
import { PortfolioData } from './typescript/wheel_info'
import { ProjectContext, Visibility, CursorContext } from './contexts';
import { Item } from './typescript/data'

export type ApplyForceFunction = (() => { id: number}) | null

export default function Home() {

    const [selected, setSelected] = useState<Item | null | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [previousSelected, setPreviousSelected] = useState<Item | null | undefined>(undefined)
    
    const scrollSinceSelection = useRef(false)

    const groupVisibilities = useRef<Visibility[]>(
        new Array(Object.keys(PortfolioData).length).fill(null).map(
            (_, index) => ({ visible: index === 0, timeSet: performance.now() })
        )
    )

    const projectContext = {
        selected, setSelected,
        selectedIndex, setSelectedIndex,
        scrollSinceSelection,
        previousSelected, setPreviousSelected,
        groupVisibilities
    }

    const applyForceToWheel = useRef<ApplyForceFunction>(null)

    const isBrowser = typeof window !== "undefined"
    const [bypassMobile, setBypassMobile] = useState(false)
    if (isBrowser) { // Avoid messing up SSR (even if there is likely no effect)
        const isViewportWideEnough = window.innerWidth > 1100
        if (!isViewportWideEnough && !bypassMobile) return (
            <div className="flex flex-col w-screen h-screen px-12 items-center justify-center gap-10">
                <div className="flex">
                    This portfolio does not support mobile. Please use a larger screen.
                </div>
                <div onClick={() => setBypassMobile(true)} className="bg-foreground text-background p-2">
                    View Site Anyways
                </div>
            </div>
        )
    }
        
    return (<>
        <div className="relative">
            <Infocard />
        </div>
        <ProjectContext value={projectContext}>
            <div className={`flex flex-row-reverse items-center h-screen ${bypassMobile ? "overflow-x-auto" : ""}`}>
                    <Wheel applyForceToWheel={applyForceToWheel} />
                    <ProjectCards applyForceToWheel={applyForceToWheel} />
            </div>
        </ProjectContext>
    </>)
}

function ProjectCards({ applyForceToWheel }: { applyForceToWheel: React.RefObject<ApplyForceFunction> }) {
    const cursorPosition = useRef<[number, number]>([0, 0])
    useEffect(() => {
        const handleMove = (e: PointerEvent) => void (cursorPosition.current = [e.pageX, e.pageY])
        window.addEventListener("pointermove", handleMove)
        return () => window.removeEventListener("pointermove", handleMove)
    }, [])

    const currentTransforms = useRef({})

    const { selected, previousSelected } = useContext(ProjectContext)
    return (
        <CursorContext value={{ cursorPosition, currentTransforms }}>
            <div className="relative grow ml-10 sm:ml-1/10 -mr-50">
                <ProjectCard isPrevious={false} current={selected} previous={previousSelected} applyForceToWheel={applyForceToWheel}/>
            </div>
        </CursorContext>
    )
}