import { Project, projects, Tool, tools } from '../typescript/project_card_info'
import { lexendExa, lexendGiga, lexendPeta } from '../typescript/css_constants'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { SetStateAction, useRef } from 'react'

/**
 * Also serves as intro card (When no projects are selected)
 */
export function ProjectCard({
    selected,
    setSelected,
    setIsProject,
    isProject,
    setScrollSinceSelection,
}: Readonly<{
    selected: Project | Tool | null
    setSelected: React.Dispatch<SetStateAction<Project | Tool | null>>
    setIsProject: React.Dispatch<SetStateAction<boolean>>
    isProject: boolean
    setScrollSinceSelection: React.Dispatch<SetStateAction<boolean>>
}>) {
    const galleryRef = useRef<ImageGallery>(null)

    if (selected) {
        if (isProject) {
            const project = selected as Project
            return (
                <div className={`absolute z-2 top-40 left-1/30 h-3/4 w-2/3 `}>
                    <div className="flex">
                        {project.demo ? (
                            <>
                                <a
                                    className="flex text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.demo}
                                >
                                    View Live Project
                                </a>{' '}
                                <span className="mx-4">|</span>
                            </>
                        ) : (
                            <></>
                        )}
                        {project.github ? (
                            <>
                                <a
                                    className="flex text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.github}
                                >
                                    GitHub
                                </a>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                        {project.date ? (
                            <>
                                <p className="justify-end text-right grow">{project.date}</p>{' '}
                            </>
                        ) : (
                            <></>
                        )}
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
                                {project.image ? (
                                    <ImageGallery
                                        ref={galleryRef}
                                        showPlayButton={false}
                                        onMouseOver={() => galleryRef.current?.pause()}
                                        onMouseLeave={() => galleryRef.current?.play()}
                                        autoPlay={true}
                                        slideInterval={4000}
                                        items={project.image}
                                    />
                                ) : null}
                            </div>
                            <ul className="bg-orange-100 mt-4 ml-2 p-4 pr-8 rounded-xl grow">
                                <p className="p-2 text-[var(--foreground)] text-3xl">Tech Stack</p>
                                {project.technologies.map((technology) =>
                                    tools[technology] ? (
                                        <button
                                            key={technology + 'container'}
                                            className="flex items-center bg-orange-200/40 hover:bg-orange-200 m-2 p-2 rounded-xl w-full text-2xl text-right duration-200"
                                            onClick={() => {
                                                setIsProject(false)
                                                setSelected(tools[technology])
                                                setScrollSinceSelection(false)
                                            }}
                                        >
                                            <div className="flex justify-center">
                                                {/*TODO: remove */
                                                /* eslint-disable-next-line @next/next/no-img-element */}
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
                                    ) : (
                                        <button
                                            key={technology + ' container'}
                                            className="flex items-center p-4 rounded-xl w-full text-2xl text-right duration-200"
                                        >
                                            <div className="flex justify-center">
                                                {/*TODO: remove */
                                                /* eslint-disable-next-line @next/next/no-img-element */}
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
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            const tool = selected as Tool
            return (
                <div className={`absolute z-2 top-40 left-1/30 h-3/4 w-2/3 `}>
                    <div className="flex items-end gap-10 border-b-3">
                        <p style={lexendGiga.style} className="pb-1 text-4xl">
                            {tool.name}
                        </p>
                        <div className="flex flex-col-reverse justify-evenly items-center h-12">
                            <p> Proficiency: {tool.proficiency} </p>
                            {tool.usedOften ? (
                                <p className="self-start bg-amber-200 pr-1 pl-1 rounded-md bold">Used Often!</p>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className="h-1/1 overflow-y-auto">
                        <div className="bg-orange-100 p-4 rounded-b-xl w-1/1">
                            {tool.notes.map((note) => (
                                <p className="p-2 pt-4 pb-4" key={note}>{note}</p>
                            ))}
                            {tool.projects.length > 0 ? <p className="m-4 text-3xl"> Used in: </p> : <></>}
                            <div className="">
                                {tool.projects?.map((project) =>
                                    projects[project] ? (
                                        <button
                                            className="block bg-orange-200/40 hover:bg-orange-200 m-2 p-4 rounded-xl text-xl hover:underline duration-200"
                                            key={project}
                                            onClick={() => {
                                                setIsProject(true)
                                                setSelected(projects[project])
                                                setScrollSinceSelection(false)
                                            }}
                                        >
                                            <span className="text-2xl">↗</span> {projects[project].name}
                                        </button>
                                    ) : (
                                        <button
                                            className="block m-2 p-4 rounded-xl text-xl duration-200"
                                            key={project}
                                        >
                                            - {project}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={`top-1/3 left-1/7 absolute`}>
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
}
