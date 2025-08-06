'use client'

import React, { useMemo, useState } from 'react'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'
import { PortfolioData, ProjectData, ToolData } from './typescript/wheel_info'
import { ProjectContext, Visibility } from './contexts'

export default function Home() {
    const [selected, setSelected] = useState<ProjectData | ToolData | null | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    const [isProject, setIsProject] = useState(true)
    const [scrollSinceSelection, setScrollSinceSelection] = useState(false)

    const [previousSelected, setPreviousSelected] = useState<ProjectData | ToolData | null | undefined>(undefined)
    const [isPreviousProject, setIsPreviousProject] = useState(true)

    const [groupVisibilities, setGroupVisibilities] = useState<Visibility[]>(
        new Array(Object.keys(PortfolioData).length).fill(null).map(
            (_, index) => {
                return { visible: index === 0, timeSet: performance.now() }
            }
        )
    )
    console.log(groupVisibilities)

    const projectContext = {
        selected, setSelected,
        selectedIndex, setSelectedIndex,
        isProject, setIsProject,
        scrollSinceSelection, setScrollSinceSelection,
        previousSelected, setPreviousSelected,
        isPreviousProject, setIsPreviousProject,
        groupVisibilities, setGroupVisibilities
    }

    return (
        <>
            <Infocard></Infocard>
            <div className="flex">
                <ProjectContext value={projectContext}>
                    <ProjectCard isPrevious={false} current={selected}/>
                    <ProjectCard isPrevious={true} current={previousSelected}/>
                    <Wheel/>
                </ProjectContext>
            </div>
        </>
    )
}
