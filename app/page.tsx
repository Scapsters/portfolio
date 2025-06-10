'use client'

import React, { useState } from 'react'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'
import { Project, Tool } from './typescript/wheel_info'
import { ProjectContext } from './contexts'

export default function Home() {
    const [selected, setSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    const [isProject, setIsProject] = useState(true)
    const [scrollSinceSelection, setScrollSinceSelection] = useState(false)

    const [previousSelected, setPreviousSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [isPreviousProject, setIsPreviousProject] = useState(true)

    const projectContext = {
        selected, setSelected,
        selectedIndex, setSelectedIndex,
        isProject, setIsProject,
        scrollSinceSelection, setScrollSinceSelection,
        previousSelected, setPreviousSelected,
        isPreviousProject, setIsPreviousProject
    }

    return (
        <>
            <Infocard></Infocard>
            <div className="flex">
                <ProjectContext value={projectContext}>
                    {/* <ProjectCard isPrevious={false}/>
                    <ProjectCard isPrevious={true} /> */}
                    <Wheel/>
                </ProjectContext>
            </div>
        </>
    )
}
