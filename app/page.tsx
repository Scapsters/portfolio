'use client'

import React, { useRef, useState } from 'react'
import Wheel from './components/Wheel'
import { ProjectCard } from './components/ProjectCard'
import Infocard from './components/Infocard'
import { PortfolioData, Project, Tool } from './typescript/wheel_info'
import { ProjectContext, Visibility } from './contexts'

export default function Home() {
    const [selected, setSelected] = useState<Project | Tool | null | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
    const scrollSinceSelection = useRef(false)

    const [previousSelected, setPreviousSelected] = useState<Project | Tool | null | undefined>(undefined)

    const groupVisibilities = useRef<Visibility[]>(
        new Array(Object.keys(PortfolioData).length).fill(null).map(
            (_, index) => {
                return { visible: index === 0, timeSet: performance.now() }
            }
        )
    )

    const projectContext = {
        selected, setSelected,
        selectedIndex, setSelectedIndex,
        scrollSinceSelection,
        previousSelected, setPreviousSelected,
        groupVisibilities
    }

    return (<>
        <Infocard></Infocard>
        <div className="flex">
            <ProjectContext value={projectContext}>
                <ProjectCard isPrevious={false} current={selected}/>
                <ProjectCard isPrevious={true} current={previousSelected}/>
                <Wheel/>
            </ProjectContext>
        </div>
    </>)
}
