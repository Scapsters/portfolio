'use client'

import React, { useState } from 'react'
import { Project, Tool } from './typescript/project_card_info'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'

export default function Home() {
    const [selected, setSelected] = useState<Project | Tool | null>(null)
    const [isProject, setIsProject] = useState(true)

    return (
        <>
            <Wheel setSelected={setSelected} isSelected={!!selected} selected={selected} setIsProject={setIsProject}></Wheel>
            <ProjectCard selected={selected} setSelected={setSelected} setIsProject={setIsProject} isProject={isProject}></ProjectCard>
            <Infocard></Infocard>
        </>
    )
}
