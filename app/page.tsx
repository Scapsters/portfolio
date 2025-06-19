'use client'

import React, { useState } from 'react'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'
import { PortfolioData, Project, Tool } from './typescript/wheel_info'
import { ProjectContext, Visibility } from './contexts'

export default function Home() {
    const [selected, setSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    const [isProject, setIsProject] = useState(true)
    const [scrollSinceSelection, setScrollSinceSelection] = useState(false)

    const [previousSelected, setPreviousSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [isPreviousProject, setIsPreviousProject] = useState(true)

    const [groupVisibilities, setGroupVisibilities] = useState<Visibility[]>(
        new Array(Object.keys(PortfolioData).length).fill({ visible: false, timeSet: performance.now() })
    )

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
