import { lexendExa, lexendGiga, lexendPeta } from '../typescript/css_constants'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import React, { ReactElement, useCallback, useContext, useEffect, useRef } from 'react'
import { Project, Tool, PortfolioData, getIndexOfProjectInSection, raw_items, all_items } from '@/typescript/wheel_info'
import { ProjectContext } from '@/contexts'
import { all_items_with_gaps } from '../typescript/wheel_info';

type ProjectCardProps = {
    current: Project | Tool | null | undefined
    isPrevious: boolean
}

function DemoLink({ link }: Readonly<{ link?: string }>) {
    if (!link) return null
    return (
        <>
            <a className="flex text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href={link}>
                View Live Project
            </a>
            <span className="mx-4">|</span>
        </>
    )
}

function GithubLink({ link }: Readonly<{ link?: string }>) {
    if (!link) return null
    return (
        <a className="flex text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href={link}>
            GitHub
        </a>
    )
}

function DateText({ date }: Readonly<{ date?: string }>) {
    if (!date) return null
    return <p className="justify-end text-right grow">{date}</p>
}

function Gallery({ images }: Readonly<{ images?: ReactImageGalleryItem[] }>) {
    const galleryRef = useRef<ImageGallery>(null)
    if (!images) return null
    return (
        <ImageGallery
            ref={galleryRef}
            showPlayButton={false}
            onMouseOver={() => galleryRef.current?.pause()}
            onMouseLeave={() => galleryRef.current?.play()}
            autoPlay={true}
            slideInterval={4000}
            items={images}
        />
    )
}

function TechStackButton({ technology, onClick }: Readonly<{ technology: string; onClick: () => void }>) {
    return (
        <button
            key={technology + 'container'}
            className="flex items-center bg-orange-200/40 hover:bg-orange-200 m-2 p-2 rounded-xl w-full text-2xl text-right duration-200"
            onClick={onClick}
        >
            <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    key={technology + ' logo'}
                    alt={technology}
                    src={'/logos/' + technology.replace('.', '').toLowerCase() + '.png'}
                    className={'h-13 aspect-auto'}
                />
            </div>
            <li className="grow" key={technology}>
                {technology} ↗
            </li>
        </button>
    )
}

function TechStackList({
    technologies,
    onTechClick,
}: Readonly<{
    technologies: string[]
    onTechClick: (technology: string) => void
}>) {
    return (
        <ul className="bg-orange-100 mt-4 ml-2 p-4 pr-8 rounded-xl grow">
            <p className="p-2 text-[var(--foreground)] text-3xl">Tech Stack</p>
            {technologies.map((technology) => {
                // Try to find the tool in PortfolioData.Tools (search all categories)
                let foundTool: Tool | undefined
                for (const group of Object.values(PortfolioData)) {
                    if (typeof group === 'object' && group !== null) {
                        if (technology in group) {
                            foundTool = (group as Record<string, Tool>)[technology]
                            break
                        }
                    }
                }
                if (foundTool) {
                    return (
                        <TechStackButton
                            key={technology}
                            technology={technology}
                            onClick={() => onTechClick(technology)}
                        />
                    )
                }
                // fallback: just show the technology name
                return (
                    <button
                        key={technology + ' container'}
                        className="flex items-center p-4 rounded-xl w-full text-2xl text-right duration-200"
                        tabIndex={-1}
                        disabled
                    >
                        <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={technology + ' logo'}
                                alt={technology}
                                src={'/logos/' + technology.replace('.', '').toLowerCase() + '.png'}
                                className={'h-13 aspect-auto'}
                            />
                        </div>
                        <li className="grow" key={technology}>
                            {technology}
                        </li>
                    </button>
                )
            })}
        </ul>
    )
}

function UsedInProjectsList({
    projects,
    onProjectClick,
}: Readonly<{
    projects: string[]
    onProjectClick: (project: string) => void
}>) {
    return (
        <div>
            {projects.length > 0 && <p className="m-4 text-3xl"> Used in: </p>}
            <div>
                {projects.map((project) =>
                    PortfolioData.Projects[project] ? (
                        <button
                            className="block bg-orange-200/40 hover:bg-orange-200 m-2 p-4 rounded-xl text-xl hover:underline duration-200"
                            key={project}
                            onClick={() => onProjectClick(project)}
                        >
                            <span className="text-2xl">↗</span> {PortfolioData.Projects[project].name}
                        </button>
                    ) : (
                        <button className="block m-2 p-4 rounded-xl text-xl duration-200" key={project} disabled>
                            - {project}
                        </button>
                    ),
                )}
            </div>
        </div>
    )
}

export function ProjectCard({
    isPrevious,
    current,
}: ProjectCardProps) {

    const {
        selected,
        isProject,
        setSelected,
        setIsProject,
        setSelectedIndex,
        setPreviousSelected,
        setIsPreviousProject,
        setScrollSinceSelection,
        groupVisibilities,
        setGroupVisibilities,
    } = useContext(ProjectContext)

    const cardRef = useRef<HTMLDivElement>(null)

    const handleTechClick = useCallback((technology: string) => {
        setScrollSinceSelection(false)
        setPreviousSelected(selected)
        setIsPreviousProject(isProject)
        // Find the tool in PortfolioData.Tools
        let foundTool: Tool | undefined
        let groupIndex = 0
        for (const group of Object.values(PortfolioData)) {
            let leave = 0
            Object.keys(group).forEach(element => {
                if (technology in group) {
                    foundTool = (group as Record<string, Tool>)[technology]
                    leave = 1
                } 
            })
            if (leave === 1) break
            groupIndex += 1
        };
        if (foundTool) {
            const index = all_items_with_gaps.findIndex(item => item === foundTool.key_name);
            setSelectedIndex(index) 
            console.log(index)
            setGroupVisibilities(prev => [
                ...prev.slice(0, groupIndex).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
                { visible: true, timeSet: performance.now() },
                ...prev.slice(groupIndex + 1).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
            ]);
            setSelected(foundTool)
            setIsProject(false)
        }
    }, [isProject, selected, setGroupVisibilities, setIsPreviousProject, setIsProject, setPreviousSelected, setScrollSinceSelection, setSelected, setSelectedIndex])

    const handleProjectClick = useCallback((project: string) => {
        setScrollSinceSelection(false)
        setPreviousSelected(selected)
        setIsPreviousProject(isProject)
        if (PortfolioData.Projects[project]) {
            setSelected(PortfolioData.Projects[project])
            setIsProject(true)
            const index = getIndexOfProjectInSection(
                PortfolioData.Projects[project].key_name,
                "Projects"
            )
            setSelectedIndex(index)
            const groupIndex = 0
            setGroupVisibilities(prev => [
                ...prev.slice(0, groupIndex).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
                { visible: true, timeSet: performance.now() },
                ...prev.slice(groupIndex + 1).map(prev => ({ visible: prev.visible, timeSet: performance.now() })),
            ]);
        }
    }, [isProject, selected, setGroupVisibilities, setIsPreviousProject, setIsProject, setPreviousSelected, setScrollSinceSelection, setSelected, setSelectedIndex])

    let card: ReactElement | null = null
    if (selected && isProject) {
        const project = selected as Project
        card = (
            <div ref={cardRef} className="absolute z-2 top-40 left-1/30 h-3/4 w-2/3">
                <div className="flex">
                    <DemoLink link={project.demo} />
                    <GithubLink link={project.github} />
                    <DateText date={project.date} />
                </div>
                <p style={lexendGiga.style} className="pb-1 border-b-3 text-4xl">
                    {project.name}
                </p>
                <div className="h-1/1 overflow-y-auto">
                    <div className="bg-orange-100 p-4 rounded-b-xl w-1/1">
                        {project.description.map((description) => (
                            <p className="m-4" key={description}>
                                {description}
                            </p>
                        ))}
                        <p className="m-4 text-xl"> Features </p>
                        <div>
                            {project.features?.map((feature) => (
                                <p className="m-2" key={feature}>
                                    {' '}
                                    - {feature}{' '}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-1/1">
                        <div className="bg-orange-100 mt-4 mr-2 p-4 rounded-xl w-2/3">
                            <Gallery images={project.image} />
                        </div>
                        <TechStackList technologies={project.technologies} onTechClick={handleTechClick} />
                    </div>
                </div>
            </div>
        )
    }
    if (selected && !isProject) {
        const tool = selected as Tool
        card = (
            <div ref={cardRef} className="absolute z-2 top-40 left-1/30 h-3/4 w-2/3">
                <div className="flex items-end gap-10 border-b-3">
                    <p style={lexendGiga.style} className="pb-1 text-4xl">
                        {tool.name}
                    </p>
                    <div className="flex flex-col-reverse justify-evenly items-center h-12">
                        <p> Proficiency: {tool.proficiency} </p>
                        {tool.usedOften ? (
                            <p className="self-start bg-amber-200 pr-1 pl-1 rounded-md bold">Used Often!</p>
                        ) : null}
                    </div>
                </div>
                <div className="h-1/1 overflow-y-auto">
                    <div className="bg-orange-100 p-4 rounded-b-xl w-1/1">
                        {tool.notes.map((note) => (
                            <p className="p-2 pt-4 pb-4" key={note}>
                                {note}
                            </p>
                        ))}
                        <UsedInProjectsList projects={tool.projects} onProjectClick={handleProjectClick} />
                    </div>
                </div>
            </div>
        )
    }

    if (!selected) {
        card = (
            <div ref={cardRef} className="top-1/3 left-1/7 absolute">
                <p style={lexendPeta.style} className="mb-4 text-5xl">
                    Welcome <span className="text-2xl">to</span>
                </p>
                <p style={lexendGiga.style} className="mb-4 text-2xl">
                    Scott Happy&apos;s Portfolio
                </p>
                <p style={lexendExa.style} className="mb-2 text-l">
                    Yes, that&apos;s my name [:
                </p>
            </div>
        )
    }

    useEffect(() => {
        cardRef.current?.getAnimations().forEach((anim) => anim.cancel())

        let cardMove: Animation | undefined = undefined
        if (!isPrevious)
            cardMove = cardRef.current?.animate(
                [
                    { transform: 'translate(-25%, 0%)', opacity: 0 },
                    { transform: 'translate(0%, 0%)', opacity: 1 },
                ],
                {
                    duration: 700,
                    delay: 500,
                    easing: 'ease-in-out',
                    fill: 'both',
                },
            )
        else
            cardMove = cardRef.current?.animate(
                [
                    { transform: 'translate(0%, 0%)', opacity: 1 },
                    { transform: 'translate(0%, 75%)', opacity: 0 },
                ],
                {
                    duration: 1000,
                    easing: 'ease-in-out',
                    fill: 'both',
                },
            )

        if (cardMove) {
            cardMove.play()
        }
    }, [selected, setPreviousSelected, isPrevious])

    //Dont show 2 on initial load
    if (isPrevious && selected === undefined) {
        card = <></>
    }

    return card
}
