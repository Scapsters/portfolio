'use client'

import React, { useState } from 'react'
import { Project } from './typescript/project_card_info'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'

export default function Home() {
    const [project, setProject] = useState<Project | null>(null)
    return (
        <>
            <Wheel setProject={setProject} isProjectSelected={!!project}></Wheel>
            <ProjectCard project={project}></ProjectCard>
			<Infocard></Infocard>
        </>
    )
}





