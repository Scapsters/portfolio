'use client'

import React, { useState } from 'react'
import { Project } from './typescript/project_card_info'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'

export default function Home() {
    const [project, setProject] = useState<Project | null>(null)
    return (
        <>
            <Wheel setProject={setProject}></Wheel>
            <ProjectCard project={project}></ProjectCard>
        </>
    )
}





