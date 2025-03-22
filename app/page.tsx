'use client'

import { useState } from 'react'

export type Project = {
    name: string
    description: string
    technologies: string[]
    image?: URL
    github?: URL
    demo?: URL
}

const projects: { [index: string]: Project } = {
    'Project 1': {
        name: 'Project 1',
        description: 'This is the first project',
        technologies: ['React', 'TypeScript'],
    },
    'Project 2': {
        name: 'Project 2',
        description: 'This is the second project',
        technologies: ['React', 'TypeScript'],
    },
    'Project 3': {
        name: 'Project 3',
        description: 'This is the third project',
        technologies: ['React', 'TypeScript'],
    },
}

export default function Home() {
    const [project, setProject] = useState<Project | null>(null)
    return (
        <>
            <Wheel setProject={setProject}></Wheel>
            <ProjectCard project={project}></ProjectCard>
        </>
    )
}

function Wheel({
    setProject,
}: Readonly<{ setProject: (project: Project) => void }>) {
    const raw_items = ['Ewe', 'Project 1', 'Project 2', 'Project 3']

    const headers = ['Ewe']

    const items = raw_items.map((item) => {
        return (
            <div key={item} className="absolute top-1/2 right-0 bg-orange-600">
                {headers.includes(item) ? (
                    <p key={`${item}text`} className="text-red">
                        {item}
                    </p>
                ) : (
                    <button
                        key={`${item}button`}
                        className="text-blue"
                        onClick={() => setProject(projects[item])}
                    >
                        {item}
                    </button>
                )}
            </div>
        )
    })

    return (
        <div className="flex flex-col overflow-auto">
            {items}
        </div>
    )
}

function ProjectCard({ project }: Readonly<{ project: Project | null }>) {
    return (
        <div className="absolute top-1/3 left-1/4 border-2 border-red-600">
            {project ? (
                <>
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                    <ul>
                        {project.technologies.map((technology) => (
                            <li key={technology}>{technology}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <>eweewewe</>
            )}
        </div>
    )
}
