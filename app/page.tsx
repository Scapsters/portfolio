'use client'

import React, { useEffect, useMemo, useState } from 'react'

type Project = {
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
        description: 'nooo charlie its a magical leoploradon',
        technologies: ['React', 'TypeScript'],
    },
    'Project 222222222222222': {
        name: 'flint and steel',
        description: 'flint and steel',
        technologies: ['React', 'TypeScript'],
    },
    'Project 3': {
        name: 'Project 3',
        description: 'charlie oh nooooo not the poisonous fugu fish',
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

// Helper functions
const raw_items = ['Ewe', 'Project 1', 'Project 2222222222222222', 'Project 3', 'porjerot', 'preeject', 'fwefpjext', 'Project 8', 'Project 9', 'Project 10']
const headers = ['Ewe']

const numItems = raw_items.length
const itemHeight = 50
const delta_t = 6
const radius = 1500
const phase = 180
const maxScroll = numItems * itemHeight // TODO: Verify
const scrollFactor = 0.3
const xOffset = 1200

// Helper functions
function degree_to_radian(degree: number): number {
    return (degree * Math.PI) / 180
}

/**
 * Restricts value to [min, max]
 */
function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
}

/**
 * Maps value from [low1, high1] to [low2, high2]
 */
function map_range(value: number, low1: number, high1: number, low2: number, high2: number): number {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

// Circular equations based off of https://www.desmos.com/calculator/cvaldk77ud, created by me
const circular_transform_x = (index: number, scroll: number): number =>
    radius * Math.cos(degree_to_radian(index * delta_t - 90 * scroll + phase))

const circular_transform_y = (index: number, scroll: number): number =>
    radius * Math.sin(degree_to_radian(index * delta_t - 90 * scroll + phase))

const circular_rotate = (index: number, scroll: number): number => delta_t * index - 90 * scroll

/**
 * Hooks each element of the wheel to a scroll event, which changes css properties to emulate a wheel.
 */
function Wheel({ setProject }: Readonly<{ setProject: (project: Project) => void }>) {
    // Range from [-1, 1]
    const [scroll, setScroll] = useState(0)
    const [rawScroll, setRawScroll] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // To allow for style manipulation for circular transform and rotate
    const itemRefs = raw_items.map(() => React.createRef<HTMLDivElement>())
    useEffect(() => {
        for (let i = 0; i < raw_items.length; i++) {
            const item = itemRefs[i].current
            if (!item) continue
            item.style.transform = `translate(
				${circular_transform_x(i, scroll) + xOffset}px, 
				${circular_transform_y(i, scroll)}px
			) rotate(
			 	${circular_rotate(i, scroll)}deg
			)`
        }
    }, [itemRefs, scroll])

    // To allow for tracking of the parent div
    const parentRef = React.createRef<HTMLDivElement>()

    // Track mousewheel events. Scale down delta y, Clamp to maxScroll and map to [-1, 1]
    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            if (!isHovered || !element) return
            setRawScroll(rawScroll + e.deltaY * scrollFactor) // Set raw scroll and only change the factor
            setScroll(
                // Do the clamping and mapping here. Neccesarily based off of raw scroll
                map_range(
                    clamp(rawScroll + e.deltaY * scrollFactor, -maxScroll, maxScroll),
                    -maxScroll,
                    maxScroll,
                    -1,
                    1,
                ),
            )
        }

        // Mount/unmount event listener
        const element = parentRef.current
        element?.addEventListener('wheel', wheelHandler)
        return () => {
            element?.removeEventListener('wheel', wheelHandler)
        }
    })

    // Track hovering over the wheel
    useEffect(() => {
        const element = parentRef.current
        const mouseEnterHandler = () => setIsHovered(true)
        const mouseLeaveHandler = () => setIsHovered(false)

        element?.addEventListener('mouseenter', mouseEnterHandler)
        element?.addEventListener('mouseleave', mouseLeaveHandler)
        return () => {
            element?.removeEventListener('mouseenter', mouseEnterHandler)
            element?.removeEventListener('mouseleave', mouseLeaveHandler)
        }
    })

    /**
     * MAGIC NUMBER ALTERT.... tailwind w-100
     * is to ensure that all list items are the same width to ensure consistent circular transformations
     */
    const items = raw_items.map((item, index) => (
        <div ref={itemRefs[index]} key={item} className={`w-100 absolute text-right top-1/2 right-0 bg-orange-600`}>
            {headers.includes(item) ? (
                // If item is a header, render with different styling
                <p key={`wheel ${item}`} className="text-red">
                    {item}
                </p>
            ) : (
                // Else, render with different styling and as a button
                <button key={`wheel ${item}`} className="text-blue" onClick={() => setProject(projects[item])}>
                    {item}
                </button>
            )}
        </div>
    ))

    return (
        <div ref={parentRef} className="w-1/2 h-1/1 absolute right-0 flex bg-red-500 flex-col">
            {items}
        </div>
    )
}

/**
 * Also serves as intro card (When no projects are selected)
 */
function ProjectCard({ project }: Readonly<{ project: Project | null }>) {
    const common_css = 'absolute border-2 border-red-600'
    return project ? (
        <div className={`top-1/2 left-1/4 ${common_css}`}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <ul>
                {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                ))}
            </ul>
        </div>
    ) : (
        <div className={`top-1/4 left-1/4 ${common_css}`}>eweewewe</div>
    )
}
