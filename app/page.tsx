'use client'

import React, { useState } from 'react'
import { Project, Tool } from './typescript/project_card_info'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'

export default function Home() {
    const [selected, setSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [isProject, setIsProject] = useState(true)
    const [scrollSinceSelection, setScrollSinceSelection] = useState(false)

    const [previousSelected, setPreviousSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [isPreviousProject, setIsPreviousProject] = useState(true)

    return (
        <>
            <Infocard></Infocard>
            <div className="flex">
                <ProjectCard
                    selected={selected}
                    isProject={isProject}
                    setSelected={setSelected}
                    setIsProject={setIsProject}
                    previousSelected={previousSelected}
                    setPreviousSelected={setPreviousSelected}
                    setIsPreviousProject={setIsPreviousProject}
                    setScrollSinceSelection={setScrollSinceSelection}
                    isPrevious={false}
                ></ProjectCard>
                <ProjectCard
                    selected={previousSelected}
                    isProject={isPreviousProject}
                    setSelected={() => {}}
                    setIsProject={() => {}}
                    previousSelected={null}
                    setPreviousSelected={() => {}}
                    setIsPreviousProject={() => {}}
                    setScrollSinceSelection={() => {}}
                    isPrevious={true}
                ></ProjectCard>
                <Wheel
                    setSelected={setSelected}
                    isSelected={!!selected}
                    selected={selected}
                    setIsProject={setIsProject}
                    isProject={isProject}
                    scrollSinceSelection={scrollSinceSelection}
                    setScrollSinceSelection={setScrollSinceSelection}
                    setPreviousSelected={setPreviousSelected}
                    setIsPreviousProject={setIsPreviousProject}
                ></Wheel>
            </div>
        </>
    )
}
